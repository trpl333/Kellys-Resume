# Changelog — Kelly Resume + Portfolio (initial build)

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
- `tools/generate_resume_outputs.py`: regenerates DOCX/PDF outputs and syncs `kelly-web/public/resume.pdf` + `kelly-web/data/kelly_resume_source.json` when `kelly-web/` exists.
- `kelly-web/`: Next.js (App Router) + TypeScript + Tailwind portfolio with Home, Resume, Impact Stories, Testimonials template, and Contact pages.
- `kelly-web/DEPLOYMENT.md`: Vercel-oriented deployment notes.

## Content decisions (grounded, not invented)

- **Chapman authority language** is included explicitly (coaching + evaluation; CalTPA aligned to **13 TPEs**; **approval/non-approval** completion recommendation), matching the portfolio DOCX and the Chapman supervisor description file.
- **Reluctant reader story** appears under **Mission Hills** experience, in **Signature Impact**, and as a STAR card on the website.
- **Two-student / high-need partnership story** appears under **Chino USD (Anna Borba)** experience, in **Signature Impact**, and as a STAR card on the website (privacy-safe wording only).
- **Riley Elementary volunteer** role is included as written in the portfolio DOCX; exact calendar months are flagged **[NEEDS CONFIRMATION]** because they were not present on the 2020 resume file.
- **Email** is flagged **[NEEDS CONFIRMATION]** throughout until you provide a confirmed address.

## QA checks performed

- Next.js `npm run build` succeeds for `kelly-web/`.
- Website STAR “compact” fields are **under 160 words** each (word counts: 89 and 90 across Situation/Task/Action/Result).
