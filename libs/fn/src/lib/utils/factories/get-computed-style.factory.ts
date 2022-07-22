export function getComputedStyleFactory(document: Document): (element: HTMLElement) => CSSStyleDeclaration {
    const window = document.defaultView;
    return (element: HTMLElement): CSSStyleDeclaration => window?.getComputedStyle(element) as CSSStyleDeclaration;
}
