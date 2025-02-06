import {
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed
} from '../../../../../e2e';
import { IconTabBarPO } from './icon-tab-bar.po';

import { paddingsSizes } from './icon-tab-bar-contents';

describe('Icon Tab Bar component test suite', () => {
    const iconTabBarPage = new IconTabBarPO();
    const {
        iconExample,
        filterExample,
        columnsExample,
        iconOnlyExample,
        nestedTabsExample,
        overflowingExample,
        configuratablePaddingsExample,
        tabBarItem,
        tabBar,
        label,
        counter,
        icon,
        expandedList,
        overflowButton,
        listItem,
        tabBarTab
    } = new IconTabBarPO();

    beforeAll(async () => {
        await iconTabBarPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await iconTabBarPage.waitForRoot();
        await waitForElDisplayed(iconTabBarPage.title);
    }, 2);

    describe('Icon example', () => {
        it('should check selecting tabs in icon example', async () => {
            await checkSelectingTabs(iconExample);
        });

        it('should check that iconName are present in iconName example', async () => {
            await expect(await isElementDisplayed(iconExample + icon)).toBe(true, 'icon is not displayed');
        });
    });

    describe('Filter example', () => {
        it('should check selecting tabs in filter example', async () => {
            await checkSelectingTabs(filterExample);
        });

        it('should check that tabs have filter mode', async () => {
            await expect(await getElementClass(filterExample + tabBar)).toContain(
                'filter',
                'tab is not of filter mode'
            );
        });
    });

    describe('Columns example', () => {
        it('should check selecting tabs in columns example', async () => {
            await checkSelectingTabs(columnsExample);
        });
    });

    describe('Icon only example', () => {
        it('should check selecting tabs in iconName only example', async () => {
            await checkSelectingTabs(iconOnlyExample);
        });

        it('should check that no labels in only iconName example', async () => {
            await expect(await doesItExist(iconOnlyExample + label)).toBe(false, 'label exists but should not');
            await expect(await doesItExist(iconOnlyExample + counter)).toBe(false, 'counter exists but should not');
        });
    });

    describe('Nested tabs example', () => {
        it('should check selecting tabs in nested example', async () => {
            await checkSelectingTabs(nestedTabsExample);
        });

        it('should check tab with expanded list', async () => {
            await click(nestedTabsExample + tabBarItem, 3);
            await expect(await isElementDisplayed(expandedList)).toBe(true, 'expanded list is not displayed');
            await click(listItem, 1);
            await expect(await getAttributeByName(nestedTabsExample + tabBarTab, 'aria-selected', 3)).toBe(
                'true',
                'tab is not selected'
            );
        });
    });

    describe('Overflowing example', () => {
        it('should check selecting tabs in overflowing example', async () => {
            await refreshPage();
            const itemsQuantity = await getElementArrayLength(overflowingExample + tabBarItem + '[aria-hidden=false]');
            for (let i = 0; i < itemsQuantity - 1; i++) {
                await click(overflowingExample + tabBarItem, i);
                await expect(await getAttributeByName(overflowingExample + tabBarTab, 'aria-selected', i)).toBe(
                    'true',
                    `tab with index ${i} is not selected`
                );
            }
        });

        it('should check overflowing', async () => {
            await click(overflowButton);
            await expect(await isElementDisplayed(expandedList)).toBe(true, 'expanded list is not displayed');
            const iconName = await getElementClass(listItem + icon);
            const quantityOfDisplayedTabs = await getElementArrayLength(
                overflowingExample + tabBarItem + '[aria-hidden=false]'
            );
            await click(listItem);
            await expect(await getElementClass(overflowingExample + tabBarItem + icon, quantityOfDisplayedTabs)).toBe(
                iconName,
                'tabs are not replaced'
            );
        });
    });

    describe('Configurations paddings example', () => {
        it('should check selecting tabs in configuratable paddings example', async () => {
            await checkSelectingTabs(configuratablePaddingsExample);
        });

        it('should check paddings between tabs', async () => {
            for (let i = 0; i < 4; i++) {
                await expect(await getElementClass(configuratablePaddingsExample + tabBar, i)).toContain(
                    paddingsSizes[i],
                    `padding is not of ${paddingsSizes[i]} size`
                );
            }
        });
    });

    it('should check LTR and RTL orientation', async () => {
        await iconTabBarPage.checkRtlSwitch();
    });

    async function checkSelectingTabs(section: string): Promise<void> {
        const itemsQuantity = await getElementArrayLength(section + tabBarItem);
        for (let i = 0; i < itemsQuantity; i++) {
            if (section !== nestedTabsExample && i !== 3) {
                await click(section + tabBarItem, i);
                await expect(await getAttributeByName(section + tabBarTab, 'aria-selected', i)).toBe(
                    'true',
                    `tab with index ${i} is not selected`
                );
            }
        }
    }
});
