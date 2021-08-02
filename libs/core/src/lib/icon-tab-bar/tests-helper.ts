import { TabConfig } from './types';

export function getGetCenterCoordsOfElement(el: HTMLElement | null): { clientX: number, clientY: number } {
    const rect = el?.getBoundingClientRect();
    return {
        clientX: (rect?.left || 0) + window?.scrollX + el.offsetWidth / 2,
        clientY: (rect?.top || 0) + window?.scrollY + el.offsetHeight / 2
    };
}


export function generateTestItems(length: number, subTabs: boolean = false): TabConfig[] {
    const items = [];
    for (let i = 0; i < length; i++) {
        items.push({
            icon: 'cart',
            label: `Item ${i}`,
            counter: Math.floor(Math.random() * 100),
            subItems: (subTabs && i === 5) ? generateTestItems(3) : null
        });
    }
    return items;
}
