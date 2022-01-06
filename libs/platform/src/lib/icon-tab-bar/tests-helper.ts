import { IconTabBarItem } from './interfaces/icon-tab-bar-item.interface';
import { TabConfig } from './interfaces/tab-config.interface';
import { UNIQUE_KEY_SEPARATOR } from './constants';

export function getGetCenterCoordsOfElement(el: HTMLElement | null): { clientX: number; clientY: number } {
    const rect = el?.getBoundingClientRect();
    return {
        clientX: (rect?.left || 0) + window?.scrollX + el.offsetWidth / 2,
        clientY: (rect?.top || 0) + window?.scrollY + el.offsetHeight / 2
    };
}

export function generateTestConfig(length: number, subTabs: boolean = false): TabConfig[] {
    const items = [];
    for (let i = 0; i < length; i++) {
        items.push({
            icon: 'cart',
            label: `Item ${i}`,
            counter: Math.floor(Math.random() * 100),
            subItems: subTabs && i === 5 ? generateTestConfig(3) : null
        });
    }
    return items;
}

export function generateTabBarItems(config: TabConfig[], flatIndexRef = { value: 0 }): IconTabBarItem[] {
    return config.map((item, index) => {
        const result: IconTabBarItem = {
            ...item,
            index,
            cssClasses: [],
            uId: index.toString(),
            hidden: false,
            subItems: null,
            flatIndex: flatIndexRef.value++
        };
        if (item.color) {
            result.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
        }
        result.subItems = item.subItems?.length ? generateTestSubItems(item.subItems, result, flatIndexRef) : null;
        return result;
    });
}

function generateTestSubItems(
    subItems: TabConfig[],
    parent: IconTabBarItem,
    flatIndexRef: { value: number }
): IconTabBarItem[] {
    return subItems?.map((item, index) => {
        const result: IconTabBarItem = {
            ...item,
            index,
            uId: `${parent.uId}${UNIQUE_KEY_SEPARATOR}${index}`,
            cssClasses: [],
            subItems: null,
            flatIndex: flatIndexRef.value++
        };
        if (Array.isArray(item.subItems) && item.subItems.length) {
            result.subItems = generateTestSubItems(item.subItems, result, flatIndexRef);
        }
        return result;
    });
}
