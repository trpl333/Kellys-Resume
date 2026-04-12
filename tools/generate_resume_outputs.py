"""
Generate ATS-oriented DOCX + PDF resumes from data/kelly_resume_source.json.

Requirements: python-docx, reportlab (see pip install in project notes).
"""

from __future__ import annotations

import json
import shutil
from pathlib import Path
from typing import Any

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.shared import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "kelly_resume_source.json"
OUT_DIR = ROOT / "outputs"
RESUME_DIR = ROOT / "resume"
PUBLIC_DIR = ROOT / "public"

# Resume PDF + resume_v1 DOCX: fewer signature bullets for executive whitespace (JSON keeps full list for web).
# Five strongest signature bullets on resume_v1 PDF/DOCX (JSON keeps full list for markdown/web).
RESUME_SIGNATURE_RENDER_LIMIT = 5

BODY_FONT_PT = 10.5
SECTION_HEADING_PT = 11
# Tight layout to keep resume_v1 on two pages (PDF + DOCX).
BODY_LINE_SPACING = 1.10
PARA_SPACE_AFTER_PT = 3
ROLE_SPACE_BEFORE_PT = 5
BULLET_SPACE_AFTER_PT = 3


def _core_competency_lines(items: list[str], *, max_lines: int = 2) -> list[str]:
    """Split competencies into at most two lines (no single long pipe-delimited row)."""
    if not items:
        return []
    if len(items) == 1:
        return [items[0]]
    mid = (len(items) + 1) // 2
    sep = " · "
    lines = [sep.join(items[:mid]), sep.join(items[mid:])]
    return lines[:max_lines]


def _strip_markup_tags(text: str) -> str:
    return (
        text.replace("<b>", "")
        .replace("</b>", "")
        .replace("<B>", "")
        .replace("</B>", "")
    )


def _escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("—", "-")
    )


def _text_for_output(text: str) -> str:
    """XML-safe text for ReportLab; never pass through literal <b> tags."""
    return _escape(_strip_markup_tags(text))


def load_data() -> dict[str, Any]:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def write_kelly_resume_markdown(data: dict[str, Any], path: Path, label: str) -> None:
    """Single-file resume for version control (Kellys-Resume source of truth)."""
    c = data["contact"]
    name = data["meta"]["candidate_name"]
    lines: list[str] = [
        f"# {name} — Resume ({label})",
        "",
        "> Source: `data/kelly_resume_source.json` in this repo. Facts only; student stories are privacy-safe.",
        "",
        "## Header",
        "",
        f"- **{name}**",
        f"- {c['city_state_zip']} | {c['phone']} | {c['email']}",
        "",
        "## Summary",
        "",
    ]
    for p in data["summary"]:
        lines.append(p)
        lines.append("")
    lines.extend(["## Signature Impact", ""])
    for b in data["signature_impact"]:
        lines.append(f"- {b}")
    lines.extend(["", "## Core Competencies", ""])
    for cc_line in _core_competency_lines(data["core_competencies"]):
        lines.append(cc_line)
    lines.extend(["", "## Certifications & Credentials", ""])
    for item in data["certifications"]:
        lines.append(f"- **{item['name']}** — {item['date']}")
    lines.extend(["", "## Professional Experience", ""])
    for role in data["experience"]:
        lines.append(f"### {role['title']}")
        lines.append("")
        sub = role["employer"]
        if role.get("school_site"):
            sub += f", {role['school_site']}"
        sub += f" · {role['location']} · {role['start']}–{role['end']}"
        if role.get("employment_note"):
            sub += f" · *{role['employment_note']}*"
        if role.get("date_note"):
            sub += f" · *{role['date_note']}*"
        lines.append(sub)
        lines.append("")
        for b in role["bullets"]:
            lines.append(f"- {b}")
        lines.append("")
    lines.extend(["## Education", ""])
    for edu in data["education"]:
        lines.append(f"- **{edu['degree']}**")
        lines.append(f"  - {edu['school']}, {edu['location']}")
        lines.append(f"  - {edu['date']}")
    lines.append("")
    refs = data.get("references_available") or []
    if refs:
        lines.extend(["## References (available upon request)", ""])
        for r in refs:
            lines.append(f"- **{r['name']}** — {r['title']}; {r.get('email', '')}; {r.get('phone', '')}")
        lines.append("")
    path.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")


def set_doc_defaults(document: Document) -> None:
    style = document.styles["Normal"]
    font = style.font
    font.name = "Calibri"
    font.size = Pt(BODY_FONT_PT)
    paragraph_format = style.paragraph_format
    paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
    paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    paragraph_format.line_spacing = BODY_LINE_SPACING


def add_heading(document: Document, text: str) -> None:
    p = document.add_paragraph()
    run = p.add_run(text.upper())
    run.bold = True
    run.font.name = "Calibri"
    run.font.size = Pt(SECTION_HEADING_PT)
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    p.paragraph_format.line_spacing = BODY_LINE_SPACING


def add_bullet(document: Document, text: str) -> None:
    """Hanging bullet (custom) with whitespace between bullets."""
    p = document.add_paragraph()
    pf = p.paragraph_format
    pf.left_indent = Inches(0.22)
    pf.first_line_indent = Inches(-0.14)
    pf.space_after = Pt(BULLET_SPACE_AFTER_PT)
    pf.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    pf.line_spacing = BODY_LINE_SPACING

    bullet_run = p.add_run("\u2022 ")
    bullet_run.font.name = "Calibri"
    bullet_run.font.size = Pt(BODY_FONT_PT)

    for part in _split_bold_segments(_strip_markup_tags(text)):
        if part.startswith("**") and part.endswith("**") and len(part) >= 4:
            r = p.add_run(part[2:-2])
            r.bold = True
            r.font.name = "Calibri"
            r.font.size = Pt(BODY_FONT_PT)
        else:
            r = p.add_run(part)
            r.font.name = "Calibri"
            r.font.size = Pt(BODY_FONT_PT)


def _split_bold_segments(text: str) -> list[str]:
    """Very small helper: supports **bold** segments."""
    parts: list[str] = []
    buf = ""
    i = 0
    while i < len(text):
        if text.startswith("**", i):
            if buf:
                parts.append(buf)
                buf = ""
            j = text.find("**", i + 2)
            if j == -1:
                buf += text[i]
                i += 1
                continue
            parts.append(text[i : j + 2])
            i = j + 2
        else:
            buf += text[i]
            i += 1
    if buf:
        parts.append(buf)
    return parts


def build_header(document: Document, data: dict[str, Any]) -> None:
    c = data["contact"]
    name = data["meta"]["candidate_name"]
    p = document.add_paragraph()
    r = p.add_run(name.upper())
    r.bold = True
    r.font.size = Pt(14)
    r.font.name = "Calibri"
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(4)

    line2 = f"{c['city_state_zip']} | {c['phone']} | {c['email']}"
    p2 = document.add_paragraph(line2)
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p2.paragraph_format.space_after = Pt(6)
    p2.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    p2.paragraph_format.line_spacing = BODY_LINE_SPACING
    for run in p2.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(BODY_FONT_PT)


def _riley_volunteer_glance_line(data: dict[str, Any]) -> str:
    for role in data["experience"]:
        if role.get("school_site") == "Riley Elementary":
            return (
                f"{role['title']} | {role['employer']}, {role['school_site']} | "
                f"{role['location']} | {role['start']} – {role['end']}"
            )
    return (
        "Volunteer | Riley Elementary, Capistrano Unified School District | "
        "Capistrano Valley, CA | Jun 2013 – Mar 2016"
    )


def add_education_entry_docx(document: Document, edu: dict[str, Any], *, last: bool = False) -> None:
    """One degree block: bold degree, then school/location and date on separate lines (compact paragraph)."""
    gap_after = Pt(3 if last else 5)
    p = document.add_paragraph()
    r1 = p.add_run(_strip_markup_tags(edu["degree"]))
    r1.bold = True
    r1.font.name = "Calibri"
    r1.font.size = Pt(BODY_FONT_PT)
    p.add_run("\n")
    r2 = p.add_run(f"{edu['school']}, {edu['location']}")
    r2.font.name = "Calibri"
    r2.font.size = Pt(BODY_FONT_PT)
    p.add_run("\n")
    r3 = p.add_run(edu["date"])
    r3.font.name = "Calibri"
    r3.font.size = Pt(BODY_FONT_PT)
    p.paragraph_format.space_after = gap_after
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    p.paragraph_format.line_spacing = BODY_LINE_SPACING


def _rl_education_degree_block_markup(edu: dict[str, Any]) -> str:
    """One ReportLab paragraph per degree; bold via mini-html (user text only is escaped)."""
    deg = _escape(_strip_markup_tags(edu["degree"]))
    loc = _escape(_strip_markup_tags(f"{edu['school']}, {edu['location']}"))
    dt = _escape(_strip_markup_tags(edu["date"]))
    return f"<b>{deg}</b><br/>{loc}<br/>{dt}"


def build_resume_v1_docx(data: dict[str, Any], path: Path) -> None:
    document = Document()
    set_doc_defaults(document)
    section = document.sections[0]
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.75)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

    build_header(document, data)

    add_heading(document, "Summary")
    for line in data["summary"]:
        p = document.add_paragraph(_strip_markup_tags(line))
        for run in p.runs:
            run.font.name = "Calibri"
            run.font.size = Pt(BODY_FONT_PT)
        p.paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        p.paragraph_format.line_spacing = BODY_LINE_SPACING

    add_heading(document, "Signature Impact")
    for b in data["signature_impact"][:RESUME_SIGNATURE_RENDER_LIMIT]:
        add_bullet(document, b)

    add_heading(document, "Core Competencies")
    for cc_line in _core_competency_lines(data["core_competencies"]):
        pcc = document.add_paragraph(cc_line)
        for run in pcc.runs:
            run.font.name = "Calibri"
            run.font.size = Pt(BODY_FONT_PT)
        pcc.paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
        pcc.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        pcc.paragraph_format.line_spacing = BODY_LINE_SPACING

    add_heading(document, "Certifications & Credentials")
    for item in data["certifications"]:
        add_bullet(document, f"{item['name']} — {item['date']}")

    add_heading(document, "Professional Experience")
    for idx, role in enumerate(data["experience"]):
        header = _strip_markup_tags(
            f"{role['title']} | {role['employer']}"
            + (f", {role['school_site']}" if role.get("school_site") else "")
            + f" | {role['location']} | {role['start']} – {role['end']}"
            + (f" ({role['employment_note']})" if role.get("employment_note") else "")
            + (f" [{role['date_note']}]" if role.get("date_note") else "")
        )

        p = document.add_paragraph()
        if idx > 0:
            p.paragraph_format.space_before = Pt(ROLE_SPACE_BEFORE_PT)
        r = p.add_run(header)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(BODY_FONT_PT)
        p.paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
        p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        p.paragraph_format.line_spacing = BODY_LINE_SPACING

        for b in role["bullets"]:
            add_bullet(document, b)

    add_heading(document, "Education")
    edu_list = data["education"]
    for i, edu in enumerate(edu_list):
        add_education_entry_docx(document, edu, last=(i == len(edu_list) - 1))

    leadership = data.get("leadership_committees") or []
    if leadership:
        add_heading(document, "Selected Leadership & Committees")
        for item in leadership:
            add_bullet(document, item)

    document.save(path)


def build_executive_snapshot_docx(data: dict[str, Any], path: Path) -> None:
    document = Document()
    set_doc_defaults(document)
    section = document.sections[0]
    section.top_margin = Inches(0.75)
    section.bottom_margin = Inches(0.75)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

    build_header(document, data)

    p = document.add_paragraph()
    r = p.add_run("Executive Snapshot")
    r.bold = True
    r.font.size = Pt(12)
    r.font.name = "Calibri"
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_after = Pt(4)

    add_heading(document, "Headline")
    headline = (
        "Special education teacher and Chapman University field supervisor with 26+ years across "
        "Special Day Class (SDC), Resource Specialist Program (RSP)/Inclusion, and general education (TK–8)."
    )
    p2 = document.add_paragraph(headline)
    for run in p2.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(BODY_FONT_PT)
    p2.paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
    p2.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    p2.paragraph_format.line_spacing = BODY_LINE_SPACING

    add_heading(document, "Signature Impact (selected)")
    for b in data["signature_impact"][:RESUME_SIGNATURE_RENDER_LIMIT]:
        add_bullet(document, b)

    add_heading(document, "Roles at a Glance")
    roles = [
        "Education Specialist (SDC + RSP/Inclusion) | Orange USD, Olive Elementary | Aug 2017 – Present",
        "Field Supervisor (SPED & Multiple Subject) | Chapman University | Aug 2020 – Present (caseload-based)",
        "SPED Instructional Aide | Saddleback Valley USD, RSM Intermediate | Mar 2016 – Jun 2017",
        _riley_volunteer_glance_line(data),
        "Junior High English Teacher | Mission Hills Christian School | Jun 2008 – Jun 2013",
        "Elementary Teacher | Chino USD, Anna Borba Elementary | Aug 1994 – Jun 2008",
        "Sixth Grade Teacher | Glenmeade Elementary, Chino Hills | Oct 1991 – Aug 1994",
    ]
    for line in roles:
        add_bullet(document, line)

    add_heading(document, "Credentials (quick view)")
    cred_lines = [
        f"{data['education'][0]['degree']}, {data['education'][0]['school']} ({data['education'][0]['date']})",
        "Clear Education Specialist Mild/Moderate (June 2019) | Multiple Subject Teaching Credential (Renewal January 1, 2021) | IB PYP (March 2007) | CLAD (November 2006)",
    ]
    for line in cred_lines:
        p3 = document.add_paragraph(line)
        for run in p3.runs:
            run.font.name = "Calibri"
            run.font.size = Pt(BODY_FONT_PT)
        p3.paragraph_format.space_after = Pt(PARA_SPACE_AFTER_PT)
        p3.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        p3.paragraph_format.line_spacing = BODY_LINE_SPACING

    document.save(path)


def _rl_styles() -> dict[str, ParagraphStyle]:
    """ReportLab paragraph styles aligned to resume_v1 DOCX (10.5pt body, tight two-page layout)."""
    base = getSampleStyleSheet()
    styles: dict[str, ParagraphStyle] = {}
    fs = float(BODY_FONT_PT)
    leading = round(fs * BODY_LINE_SPACING, 2)

    styles["name"] = ParagraphStyle(
        "name",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=16,
        alignment=TA_LEFT,
        textColor=colors.HexColor("#111111"),
        spaceAfter=4,
    )
    styles["contact"] = ParagraphStyle(
        "contact",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=fs,
        leading=leading,
        alignment=TA_LEFT,
        spaceAfter=4,
    )
    styles["h1"] = ParagraphStyle(
        "h1",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=float(SECTION_HEADING_PT),
        leading=float(SECTION_HEADING_PT) + 1,
        textColor=colors.HexColor("#111111"),
        spaceBefore=8,
        spaceAfter=PARA_SPACE_AFTER_PT,
    )
    styles["body"] = ParagraphStyle(
        "body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=fs,
        leading=leading,
        alignment=TA_LEFT,
        spaceAfter=PARA_SPACE_AFTER_PT,
    )
    styles["role_header"] = ParagraphStyle(
        "role_header",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=fs,
        leading=leading,
        alignment=TA_LEFT,
        spaceAfter=PARA_SPACE_AFTER_PT,
    )
    styles["edu_block"] = ParagraphStyle(
        "edu_block",
        parent=styles["body"],
        spaceAfter=4,
    )
    styles["edu_date_last"] = ParagraphStyle(
        "edu_date_last",
        parent=styles["body"],
        spaceAfter=PARA_SPACE_AFTER_PT,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=fs,
        leading=leading,
        leftIndent=16,
        bulletIndent=6,
        alignment=TA_LEFT,
        spaceAfter=BULLET_SPACE_AFTER_PT,
    )
    return styles


def _rl_bullet_paragraph(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(_text_for_output(text), style, bulletText="\u2022")


def build_resume_v1_pdf(data: dict[str, Any], path: Path) -> None:
    styles = _rl_styles()
    story: list[Any] = []
    c = data["contact"]
    name = data["meta"]["candidate_name"]

    story.append(Paragraph(_text_for_output(name.upper()), styles["name"]))
    story.append(
        Paragraph(
            _text_for_output(f"{c['city_state_zip']} | {c['phone']} | {c['email']}"),
            styles["contact"],
        )
    )

    story.append(Paragraph(_escape("SUMMARY"), styles["h1"]))
    for line in data["summary"]:
        story.append(Paragraph(_text_for_output(line), styles["body"]))

    story.append(Paragraph(_escape("SIGNATURE IMPACT"), styles["h1"]))
    for b in data["signature_impact"][:RESUME_SIGNATURE_RENDER_LIMIT]:
        story.append(_rl_bullet_paragraph(b, styles["bullet"]))

    story.append(Paragraph(_escape("CORE COMPETENCIES"), styles["h1"]))
    for cc_line in _core_competency_lines(data["core_competencies"]):
        story.append(Paragraph(_text_for_output(cc_line), styles["body"]))

    story.append(Paragraph(_escape("CERTIFICATIONS & CREDENTIALS"), styles["h1"]))
    cred_compact = " | ".join(f"{item['name']} — {item['date']}" for item in data["certifications"])
    story.append(Paragraph(_text_for_output(cred_compact), styles["body"]))

    story.append(Paragraph(_escape("PROFESSIONAL EXPERIENCE"), styles["h1"]))
    for idx, role in enumerate(data["experience"]):
        if idx > 0:
            story.append(Spacer(1, ROLE_SPACE_BEFORE_PT))
        header = _strip_markup_tags(
            f"{role['title']} | {role['employer']}"
            + (f", {role['school_site']}" if role.get("school_site") else "")
            + f" | {role['location']} | {role['start']} – {role['end']}"
            + (f" ({role['employment_note']})" if role.get("employment_note") else "")
            + (f" [{role['date_note']}]" if role.get("date_note") else "")
        )
        story.append(Paragraph(_text_for_output(header), styles["role_header"]))
        for b in role["bullets"]:
            story.append(_rl_bullet_paragraph(b, styles["bullet"]))

    story.append(Paragraph(_escape("EDUCATION"), styles["h1"]))
    edu_rows = data["education"]
    for i, edu in enumerate(edu_rows):
        blk = _rl_education_degree_block_markup(edu)
        estyle = styles["edu_block"] if i < len(edu_rows) - 1 else styles["edu_date_last"]
        story.append(Paragraph(blk, estyle))

    leadership = data.get("leadership_committees") or []
    if leadership:
        story.append(Paragraph(_escape("SELECTED LEADERSHIP & COMMITTEES"), styles["h1"]))
        for item in leadership:
            story.append(_rl_bullet_paragraph(item, styles["bullet"]))

    story.append(Spacer(1, 0.03 * inch))

    margin = 0.75 * inch
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin,
    )
    doc.build(story)


def build_executive_snapshot_pdf(data: dict[str, Any], path: Path) -> None:
    styles = _rl_styles()
    story: list[Any] = []
    c = data["contact"]
    name = data["meta"]["candidate_name"]

    story.append(Paragraph(_text_for_output(name.upper()), styles["name"]))
    story.append(
        Paragraph(
            _text_for_output(f"{c['city_state_zip']} | {c['phone']} | {c['email']}"),
            styles["contact"],
        )
    )

    story.append(Paragraph(_escape("EXECUTIVE SNAPSHOT"), styles["h1"]))
    story.append(
        Paragraph(
            _text_for_output(
                "Special education teacher and Chapman University field supervisor with 26+ years across "
                "Special Day Class (SDC), Resource Specialist Program (RSP)/Inclusion, and general education (TK–8)."
            ),
            styles["body"],
        )
    )

    story.append(Paragraph(_escape("SIGNATURE IMPACT (SELECTED)"), styles["h1"]))
    for b in data["signature_impact"][:RESUME_SIGNATURE_RENDER_LIMIT]:
        story.append(_rl_bullet_paragraph(b, styles["bullet"]))

    story.append(Paragraph(_escape("ROLES AT A GLANCE"), styles["h1"]))
    roles = [
        "Education Specialist (SDC + RSP/Inclusion) | Orange USD, Olive Elementary | Aug 2017 – Present",
        "Field Supervisor (SPED & Multiple Subject) | Chapman University | Aug 2020 – Present (caseload-based)",
        "SPED Instructional Aide | Saddleback Valley USD, RSM Intermediate | Mar 2016 – Jun 2017",
        _riley_volunteer_glance_line(data),
        "Junior High English Teacher | Mission Hills Christian School | Jun 2008 – Jun 2013",
        "Elementary Teacher | Chino USD, Anna Borba Elementary | Aug 1994 – Jun 2008",
        "Sixth Grade Teacher | Glenmeade Elementary, Chino Hills | Oct 1991 – Aug 1994",
    ]
    for line in roles:
        story.append(_rl_bullet_paragraph(line, styles["bullet"]))

    story.append(Paragraph(_escape("CREDENTIALS (QUICK VIEW)"), styles["h1"]))
    cred = (
        f"{data['education'][0]['degree']}, {data['education'][0]['school']} ({data['education'][0]['date']}) — "
        "Clear Education Specialist Mild/Moderate (June 2019); Multiple Subject Teaching Credential "
        "(Renewal January 1, 2021); IB PYP (March 2007); CLAD (November 2006)"
    )
    story.append(Paragraph(_text_for_output(cred), styles["body"]))

    margin = 0.75 * inch
    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin,
    )
    doc.build(story)


def _validate_resume_pdf(path: Path) -> None:
    """Fail fast if the public resume is not two pages or extracted text shows literal bold tags."""
    try:
        from pypdf import PdfReader  # type: ignore[import-not-found]
    except ImportError:
        from PyPDF2 import PdfReader  # type: ignore[import-not-found]

    reader = PdfReader(str(path))
    page_count = len(reader.pages)
    if page_count != 2:
        raise RuntimeError(f"Expected resume PDF to be 2 pages, got {page_count} at {path}.")

    extracted = "".join((page.extract_text() or "") for page in reader.pages)
    bad_tags = ("<b>", "</b>", "<B>", "</B>", "&lt;b&gt;", "&lt;/b&gt;")
    if any(t in extracted for t in bad_tags):
        raise RuntimeError(f"Resume PDF at {path} appears to contain literal bold markup in extracted text.")


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    RESUME_DIR.mkdir(exist_ok=True)
    PUBLIC_DIR.mkdir(exist_ok=True)
    data = load_data()

    write_kelly_resume_markdown(data, RESUME_DIR / "kelly_resume_v3.md", "v3")
    write_kelly_resume_markdown(data, RESUME_DIR / "kelly_resume_v2.md", "v2")

    build_resume_v1_docx(data, OUT_DIR / "resume_v1.docx")
    build_executive_snapshot_docx(data, OUT_DIR / "executive_snapshot.docx")

    build_resume_v1_pdf(data, OUT_DIR / "resume_v1.pdf")
    build_executive_snapshot_pdf(data, OUT_DIR / "executive_snapshot.pdf")

    shutil.copyfile(OUT_DIR / "resume_v1.pdf", PUBLIC_DIR / "resume.pdf")
    _validate_resume_pdf(PUBLIC_DIR / "resume.pdf")

    print("Wrote:")
    print(" -", RESUME_DIR / "kelly_resume_v2.md")
    print(" -", RESUME_DIR / "kelly_resume_v3.md")
    print(" -", PUBLIC_DIR / "resume.pdf")
    for name in [
        "resume_v1.docx",
        "executive_snapshot.docx",
        "resume_v1.pdf",
        "executive_snapshot.pdf",
    ]:
        print(" -", OUT_DIR / name)


if __name__ == "__main__":
    main()
