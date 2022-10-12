import { IconTabBarPO } from './icon-tab-bar.po';
import {
    click,
    clickAndMoveElement,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    getTextArr,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { paddingsSizes } from './icon-tab-bar-contents';

describe('Icon Tab Bar component test suite', () => {
    const iconTabBarPage = new IconTabBarPO();
    const {
        iconExample,
        textExample,
        filterExample,
        columnsExample,
        processExample,
        iconOnlyExample,
        nestedTabsExample,
        reorderingExample,
        overflowingExample,
        configuratablePaddingsExample,
        tabBarItem,
        tabBar,
        label,
        counter,
        icon,
        processIcon,
        expandedList,
        overflowButton,
        listItem,
        tabBarTab,
        span,
        popoverTab
    } = new IconTabBarPO();

    beforeAll(async () => {
        await iconTabBarPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(iconTabBarPage.root);
        await waitForElDisplayed(iconTabBarPage.title);
    }, 2);

    describe('Text example', () => {
        it('should check selecting tabs in text example', async () => {
            await checkSelectingTabs(textExample);
        });
    });

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

    describe('Process example', () => {
        xit('should check selecting tabs in process example', async () => {
            await checkSelectingTabs(processExample);
        });

        it('should check process example', async () => {
            await expect(await isElementDisplayed(processExample + processIcon)).toBe(
                true,
                'process icon is not displayed'
            );
        });

        xit('should check quantity of communicators in process example', async () => {
            const itemsQuantity = await getElementArrayLength(processExample + tabBarItem);
            await expect(await getElementArrayLength(processExample + processIcon)).toBe(
                itemsQuantity - 1,
                'wrong quantity of process icons and tabs'
            );
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

    describe('Reordering example', () => {
        it('should check selecting tabs in columns example', async () => {
            await checkSelectingTabs(reorderingExample);
        });

        // test runner drag and drop methods not working, need to investigate further
        xit('should check drag and drop tabs ', async () => {
            await scrollIntoView(reorderingExample);
            const originalTab = await getText(reorderingExample + tabBarTab + span);
            await click(reorderingExample + tabBarTab);
            await clickAndMoveElement(reorderingExample + tabBarTab + ' span', 50, 0);
            await expect(await getText(reorderingExample + tabBarTab + span)).not.toBe(originalTab);
        });

        // test runner drag and drop methods not working, need to investigate further
        xit('should check drag and drop tabs into tab', async () => {
            await scrollIntoView(reorderingExample);
            await clickAndMoveElement(reorderingExample + tabBarTab, 75, 0);
            await click(reorderingExample + tabBarTab);
            const textArr = ['Item 0', '(55)'];
            await expect(await getTextArr(popoverTab)).toEqual(textArr);
        });
    });

    describe('Overflowing example', () => {
        it('should check selecting tabs in overflowing example', async () => {
            await refreshPage();
            await checkSelectingTabs(overflowingExample);
        });

        it('should check overflowing', async () => {
            await click(overflowButton);
            await expect(await isElementDisplayed(expandedList)).toBe(true, 'expanded list is not displayed');
            const iconName = await getElementClass(listItem + icon);
            const quantityOfDisplayedTabs = await getElementArrayLength(
                overflowingExample + tabBarItem + '[aria-hidden=false]'
            );
            await click(listItem);
            await expect(
                await getElementClass(overflowingExample + tabBarItem + icon, quantityOfDisplayedTabs - 1)
            ).toBe(iconName, 'tabs are not replaced');
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
        let itemsQuantity;
        section === overflowingExample
            ? (itemsQuantity = await getElementArrayLength(overflowingExample + tabBarItem + '[aria-hidden=false]'))
            : (itemsQuantity = await getElementArrayLength(section + tabBarItem));
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
