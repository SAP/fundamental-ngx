/** Get document font size in pixels. */
export function getDocumentFontSize(): number {
    return document?.documentElement ? parseFloat(getComputedStyle(document.documentElement).fontSize) : 16;
}
