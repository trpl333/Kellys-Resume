import resume from "@data/kelly_resume_source.json";

function resumePdfHrefWithFilename(filename: string): string {
  const lastUpdated = (resume.meta as { last_updated?: string }).last_updated ?? "1";
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}${filename}?v=${encodeURIComponent(lastUpdated)}`;
}

/**
 * Quick (2-page) resume PDF. Bump `meta.last_updated` in `data/kelly_resume_source.json`
 * after `python tools/generate_resume_outputs.py` so browsers fetch the new file.
 */
export function resumeQuickPdfHref(): string {
  return resumePdfHrefWithFilename("resume_2page.pdf");
}

/** Full Professional History PDF (expanded content, typically 2–3 pages). */
export function resumeFullPdfHref(): string {
  return resumePdfHrefWithFilename("resume_full.pdf");
}
