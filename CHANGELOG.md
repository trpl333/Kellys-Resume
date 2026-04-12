# Changelog — Kellys-Resume

## 2026-04-12 — Resume v3 (impact pass, repo as source of truth)

- **`data/kelly_resume_source.json`**: eight punchy **Signature Impact** bullets (Chapman evaluator authority + CalTPA/13 TPEs + approval/non-approval; Orange USD SDC+RSP/Inclusion + MTSS/UDL; Mission Hills reluctant reader; Anna Borba two-student story; Riley volunteer leadership; plus two scope bullets). OUSD experience tightened to **six** outcome-oriented bullets. Riley dates set to **Jun 2013 – Mar 2016**; Chapman note **caseload-based**. Credentials aligned to confirmed renewal language.
- **`resume/kelly_resume_v2.md`** and **`resume/kelly_resume_v3.md`**: markdown exports generated from JSON.
- **`public/resume.pdf`**: copied from generator output for site download (`/resume.pdf` with Vite `BASE_URL`).
- **`tools/generate_resume_outputs.py`**: writes markdown + PDF/DOCX under `outputs/` and publishes `public/resume.pdf` **inside this repo only** (no external app folder sync).
- **Site**: `SignatureImpact`, `ExperienceTimeline`, and `EducationBlock` now read from `@data/kelly_resume_source.json`; resume page PDF download points at `resume.pdf`; Orange **Unified** (not Oakland) called out explicitly.
- **Impact stories** page now renders `impact_stories[].star_web` from the same JSON (privacy-safe; no fabricated metrics or “cousins” identifiers).

---

## Sources used

- `Kelly Peterson Updated Resume 2020 (1).docx` (employment history, education, credentials, references list)
- `Kelly_Peterson_Resume_Portfolio.docx` (curated headline/signature language, Chapman evaluator authority language, Riley volunteer details, privacy-safe STAR stories, leadership list)
- `Chapman Field Supervisor Description for Resume'.docx` (role responsibilities language for supervision/evaluation/coaching)

## Not available in this workspace

- `/mnt/data/Kelly_Peterson_Resume_AddChapmanSupervisor_v3_Evaluator.docx` (not found)
- `/mnt/data/Kelly 5th grad cousin stories_original.txt` (not found)
- `/mnt/data/Kelly mark desmond story_original.txt` (not found)

Story content on the website and resume is therefore aligned to the **portfolio DOCX STAR cards**, not the missing raw transcripts.

## What was added

- `data/kelly_resume_source.json`: structured, resume-aligned content (including `story_bullets` tags inside experience entries where applicable).
- `outputs/resume_v1.docx` and `outputs/resume_v1.pdf`: ATS-oriented formatting (single-column paragraphs; no tables/columns/text boxes in the generator output).
- `outputs/executive_snapshot.docx` and `outputs/executive_snapshot.pdf`: one-page snapshot aligned to the JSON.
- `bullet_bank.md`: 20 swap-in bullets grouped by employer/role bucket.
- `tools/generate_resume_outputs.py`: regenerates DOCX/PDF under `outputs/` and publishes `public/resume.pdf` for this Vite site.

## Content decisions (grounded, not invented)

- **Chapman authority language** is included explicitly (coaching + evaluation; CalTPA aligned to **13 TPEs**; **approval/non-approval** completion recommendation), matching the portfolio DOCX and the Chapman supervisor description file.
- **Reluctant reader story** appears under **Mission Hills** experience, in **Signature Impact**, and as a STAR card on the website.
- **Two-student / high-need partnership story** appears under **Chino USD (Anna Borba)** experience, in **Signature Impact**, and as a STAR card on the website (privacy-safe wording only).
- **Riley Elementary volunteer** dates are recorded as **Jun 2013 – Mar 2016** per confirmed placement timeline for this package.
- **Email** is flagged **[NEEDS CONFIRMATION]** throughout until you provide a confirmed address.

## QA checks performed

- Run `python tools/generate_resume_outputs.py` after JSON edits to refresh `outputs/*`, `public/resume.pdf`, and `resume/kelly_resume_v*.md`.
- Vite: run `npm install` and `npm run build` in **Kellys-Resume** when validating the React site.
