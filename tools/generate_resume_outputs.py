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
from docx.enum.text import WD_ALIGN_PARAGRAPH
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
        f"- {c['city_state_zip']} · {c['phone']} · {c['email']}",
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
    lines.append("; ".join(data["core_competencies"]))
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
        lines.append(f"- **{edu['degree']}** — {edu['school']}, {edu['location']} — {edu['date']}")
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
    font.size = Pt(11)
    paragraph_format = style.paragraph_format
    paragraph_format.space_after = Pt(3)


def add_heading(document: Document, text: str) -> None:
    p = document.add_paragraph()
    run = p.add_run(text.upper())
    run.bold = True
    run.font.name = "Calibri"
    run.font.size = Pt(11)
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(4)


def add_bullet(document: Document, text: str) -> None:
    p = document.add_paragraph(style="List Bullet")
    for part in _split_bold_segments(text):
        if part.startswith("**") and part.endswith("**") and len(part) >= 4:
            r = p.add_run(part[2:-2])
            r.bold = True
            r.font.name = "Calibri"
            r.font.size = Pt(11)
        else:
            r = p.add_run(part)
            r.font.name = "Calibri"
            r.font.size = Pt(11)


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

    line2 = f"{c['city_state_zip']} | {c['phone']} | {c['email']}"
    p2 = document.add_paragraph(line2)
    p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for run in p2.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(10)


def build_resume_v1_docx(data: dict[str, Any], path: Path) -> None:
    document = Document()
    set_doc_defaults(document)
    section = document.sections[0]
    section.top_margin = Inches(0.6)
    section.bottom_margin = Inches(0.6)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

    build_header(document, data)

    add_heading(document, "Summary")
    for line in data["summary"]:
        p = document.add_paragraph(line)
        for run in p.runs:
            run.font.name = "Calibri"
            run.font.size = Pt(11)

    add_heading(document, "Signature Impact")
    for b in data["signature_impact"]:
        add_bullet(document, b)

    add_heading(document, "Core Competencies")
    p = document.add_paragraph(" | ".join(data["core_competencies"]))
    for run in p.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(11)

    add_heading(document, "Certifications & Credentials")
    for item in data["certifications"]:
        add_bullet(document, f"{item['name']} — {item['date']}")

    add_heading(document, "Professional Experience")
    for role in data["experience"]:
        header = f"{role['title']} | {role['employer']}"
        if role.get("school_site"):
            header += f", {role['school_site']}"
        header += f" | {role['location']} | {role['start']} – {role['end']}"
        if role.get("employment_note"):
            header += f" ({role['employment_note']})"
        if role.get("date_note"):
            header += f" [{role['date_note']}]"

        p = document.add_paragraph()
        r = p.add_run(header)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(11)

        for b in role["bullets"]:
            add_bullet(document, b)

    add_heading(document, "Education")
    for edu in data["education"]:
        line = f"{edu['degree']} — {edu['school']}, {edu['location']} ({edu['date']})"
        add_bullet(document, line)

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
    section.top_margin = Inches(0.65)
    section.bottom_margin = Inches(0.65)
    section.left_margin = Inches(0.75)
    section.right_margin = Inches(0.75)

    build_header(document, data)

    p = document.add_paragraph()
    r = p.add_run("Executive Snapshot")
    r.bold = True
    r.font.size = Pt(12)
    r.font.name = "Calibri"
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    add_heading(document, "Headline")
    headline = (
        "Special education teacher and Chapman University field supervisor with 26+ years across "
        "SDC, RSP/Inclusion, and general education (TK–8)."
    )
    p2 = document.add_paragraph(headline)
    for run in p2.runs:
        run.font.name = "Calibri"
        run.font.size = Pt(11)

    add_heading(document, "Signature Impact (selected)")
    for b in data["signature_impact"][:9]:
        add_bullet(document, b)

    add_heading(document, "Roles at a Glance")
    roles = [
        "Education Specialist (SDC + RSP/Inclusion) | Orange USD, Olive Elementary | Aug 2017 – Present",
        "Field Supervisor (SPED & Multiple Subject) | Chapman University | Aug 2020 – Present (caseload-based)",
        "SPED Instructional Aide | Saddleback Valley USD, RSM Intermediate | Mar 2016 – Jun 2017",
        "Volunteer | Riley Elementary, Chino USD | Jun 2013 – Mar 2016",
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
            run.font.size = Pt(10)

    document.save(path)


def _rl_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    styles: dict[str, ParagraphStyle] = {}

    styles["name"] = ParagraphStyle(
        "name",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=15,
        alignment=TA_LEFT,
        spaceAfter=4,
    )
    styles["contact"] = ParagraphStyle(
        "contact",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=11,
        alignment=TA_LEFT,
        spaceAfter=8,
    )
    styles["h1"] = ParagraphStyle(
        "h1",
        parent=base["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=12,
        textColor=colors.HexColor("#111111"),
        spaceBefore=6,
        spaceAfter=4,
    )
    styles["body"] = ParagraphStyle(
        "body",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=10.8,
        alignment=TA_LEFT,
        spaceAfter=4,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        parent=base["Normal"],
        fontName="Helvetica",
        fontSize=9,
        leading=10.8,
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3,
    )
    return styles


def _escape(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("—", "-")
    )


def build_resume_v1_pdf(data: dict[str, Any], path: Path) -> None:
    styles = _rl_styles()
    story: list[Any] = []
    c = data["contact"]
    name = data["meta"]["candidate_name"]

    story.append(Paragraph(_escape(name.upper()), styles["name"]))
    story.append(
        Paragraph(
            _escape(f"{c['city_state_zip']} | {c['phone']} | {c['email']}"),
            styles["contact"],
        )
    )

    story.append(Paragraph(_escape("SUMMARY"), styles["h1"]))
    for line in data["summary"]:
        story.append(Paragraph(_escape(line), styles["body"]))

    story.append(Paragraph(_escape("SIGNATURE IMPACT"), styles["h1"]))
    for b in data["signature_impact"]:
        story.append(Paragraph(_escape(f"- {b}"), styles["bullet"]))

    story.append(Paragraph(_escape("CORE COMPETENCIES"), styles["h1"]))
    story.append(Paragraph(_escape(" | ".join(data["core_competencies"])), styles["body"]))

    story.append(Paragraph(_escape("CERTIFICATIONS & CREDENTIALS"), styles["h1"]))
    cred_compact = " | ".join(f"{item['name']} — {item['date']}" for item in data["certifications"])
    story.append(Paragraph(_escape(cred_compact), styles["body"]))

    story.append(Paragraph(_escape("PROFESSIONAL EXPERIENCE"), styles["h1"]))
    for role in data["experience"]:
        header = f"{role['title']} | {role['employer']}"
        if role.get("school_site"):
            header += f", {role['school_site']}"
        header += f" | {role['location']} | {role['start']} – {role['end']}"
        if role.get("employment_note"):
            header += f" ({role['employment_note']})"
        if role.get("date_note"):
            header += f" [{role['date_note']}]"
        story.append(Paragraph(_escape(f"<b>{header}</b>"), styles["body"]))
        for b in role["bullets"]:
            story.append(Paragraph(_escape(f"- {b}"), styles["bullet"]))

    story.append(Paragraph(_escape("EDUCATION"), styles["h1"]))
    edu_compact = " | ".join(
        f"{edu['degree']} — {edu['school']}, {edu['location']} ({edu['date']})" for edu in data["education"]
    )
    story.append(Paragraph(_escape(edu_compact), styles["body"]))

    leadership = data.get("leadership_committees") or []
    if leadership:
        story.append(Paragraph(_escape("SELECTED LEADERSHIP & COMMITTEES"), styles["h1"]))
        for item in leadership:
            story.append(Paragraph(_escape(f"- {item}"), styles["bullet"]))

    story.append(Spacer(1, 0.05 * inch))

    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.45 * inch,
        bottomMargin=0.45 * inch,
    )
    doc.build(story)


def build_executive_snapshot_pdf(data: dict[str, Any], path: Path) -> None:
    styles = _rl_styles()
    story: list[Any] = []
    c = data["contact"]
    name = data["meta"]["candidate_name"]

    story.append(Paragraph(_escape(name.upper()), styles["name"]))
    story.append(
        Paragraph(
            _escape(f"{c['city_state_zip']} | {c['phone']} | {c['email']}"),
            styles["contact"],
        )
    )

    story.append(Paragraph(_escape("EXECUTIVE SNAPSHOT"), styles["h1"]))
    story.append(
        Paragraph(
            _escape(
                "Special education teacher and Chapman University field supervisor with 26+ years across "
                "SDC, RSP/Inclusion, and general education (TK–8)."
            ),
            styles["body"],
        )
    )

    story.append(Paragraph(_escape("SIGNATURE IMPACT (SELECTED)"), styles["h1"]))
    for b in data["signature_impact"][:9]:
        story.append(Paragraph(_escape(f"- {b}"), styles["bullet"]))

    story.append(Paragraph(_escape("ROLES AT A GLANCE"), styles["h1"]))
    roles = [
        "Education Specialist (SDC + RSP/Inclusion) | Orange USD, Olive Elementary | Aug 2017 – Present",
        "Field Supervisor (SPED & Multiple Subject) | Chapman University | Aug 2020 – Present (caseload-based)",
        "SPED Instructional Aide | Saddleback Valley USD, RSM Intermediate | Mar 2016 – Jun 2017",
        "Volunteer | Riley Elementary, Chino USD | Jun 2013 – Mar 2016",
        "Junior High English Teacher | Mission Hills Christian School | Jun 2008 – Jun 2013",
        "Elementary Teacher | Chino USD, Anna Borba Elementary | Aug 1994 – Jun 2008",
        "Sixth Grade Teacher | Glenmeade Elementary, Chino Hills | Oct 1991 – Aug 1994",
    ]
    for line in roles:
        story.append(Paragraph(_escape(f"- {line}"), styles["bullet"]))

    story.append(Paragraph(_escape("CREDENTIALS (QUICK VIEW)"), styles["h1"]))
    cred = (
        f"{data['education'][0]['degree']}, {data['education'][0]['school']} ({data['education'][0]['date']}) — "
        "Clear Education Specialist Mild/Moderate (June 2019); Multiple Subject Teaching Credential "
        "(Renewal January 1, 2021); IB PYP (March 2007); CLAD (November 2006)"
    )
    story.append(Paragraph(_escape(cred), styles["body"]))

    doc = SimpleDocTemplate(
        str(path),
        pagesize=LETTER,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.65 * inch,
        bottomMargin=0.65 * inch,
    )
    doc.build(story)


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
