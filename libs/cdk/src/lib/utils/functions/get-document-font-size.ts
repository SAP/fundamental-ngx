/** Get document font size in pixels. */
export function getDocumentFontSize(): number {
    const DEFAULT_SIZE = 16;
    const clientFontSize = document?.documentElement
        ? parseFloat(getComputedStyle(document.documentElement).fontSize)
        : DEFAULT_SIZE;
    return isNaN(clientFontSize) ? DEFAULT_SIZE : clientFontSize;
}
