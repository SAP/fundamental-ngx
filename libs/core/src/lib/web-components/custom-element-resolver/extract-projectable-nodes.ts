import { isElement, matchesSelector } from './utils';

export function extractProjectableNodes(host: HTMLElement, ngContentSelectors: string[]): Node[][] {
    const nodes = host.childNodes;
    const projectableNodes: Node[][] = ngContentSelectors.map(() => []);
    let wildcardIndex = -1;

    ngContentSelectors.some((selector, i) => {
        if (selector === '*') {
            wildcardIndex = i;
            return true;
        }
        return false;
    });

    for (let i = 0, ii = nodes.length; i < ii; ++i) {
        const node = nodes[i];
        const ngContentIndex = findMatchingIndex(node, ngContentSelectors, wildcardIndex);

        if (ngContentIndex !== -1) {
            projectableNodes[ngContentIndex].push(node);
        }
    }

    return projectableNodes;
}

function findMatchingIndex(node: Node, selectors: string[], defaultIndex: number): number {
    let matchingIndex = defaultIndex;

    if (isElement(node)) {
        selectors.some((selector, i) => {
            if (selector !== '*' && matchesSelector(node, selector)) {
                matchingIndex = i;
                return true;
            }
            return false;
        });
    }

    return matchingIndex;
}
