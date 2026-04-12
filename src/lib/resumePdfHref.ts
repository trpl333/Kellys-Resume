import resume from "@data/kelly_resume_source.json";

/**
 * Public resume PDF (`public/resume.pdf`), with a cache-busting query tied to
 * `meta.last_updated` in `data/kelly_resume_source.json`. Bump that date after
 * running `python tools/generate_resume_outputs.py` so browsers fetch the new file.
 */
export function resumePdfHref(): string {
  const lastUpdated = (resume.meta as { last_updated?: string }).last_updated ?? "1";
  const base = import.meta.env.BASE_URL;
  const prefix = base.endsWith("/") ? base : `${base}/`;
  return `${prefix}resume.pdf?v=${encodeURIComponent(lastUpdated)}`;
}
