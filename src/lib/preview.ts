/**
 * Card `preview` field supports either:
 * - Tailwind gradient classes (e.g. `"from-blue-600/40 via-indigo-600/30 ..."`)
 * - A static image path from `/public` (must start with `/`, e.g. `"/images/foo.png"`)
 */
export function previewIsImageUrl(preview: string): boolean {
  return preview.startsWith("/");
}
