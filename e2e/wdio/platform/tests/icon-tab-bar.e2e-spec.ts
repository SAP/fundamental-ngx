import { IconTabBarPO } from '../pages/icon-tab-bar.po';
import {
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    refreshPage
} from '../../driver/wdio';

import { paddingsSizes } from '../fixtures/appData/icon-tab-bar-contents';

describe('Info Label component test suite', () => {
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
        tabBarTab
    } = new IconTabBarPO();

    beforeAll(() => {
        iconTabBarPage.open();
    }, 1);

    describe('Text example', () => {
        it('should check selecting tabs in text example', () => {
            checkSelectingTabs(textExample);
        });
    });

    describe('Icon example', () => {
        it('should check selecting tabs in icon example', () => {
            checkSelectingTabs(iconExample);
        });

        it('should check that iconName are present in iconName example', () => {
            expect(isElementDisplayed(iconExample + icon)).toBe(true, 'icon is not displayed');
        });
    });

    describe('Filter example', () => {
        it('should check selecting tabs in filter example', () => {
            checkSelectingTabs(filterExample);
        });

        it('should check that tabs have filter mode', () => {
            expect(getElementClass(filterExample + tabBar)).toContain('filter', 'tab is not of filter mode');
        });
    });

    describe('Columns example', () => {
        it('should check selecting tabs in columns example', () => {
            checkSelectingTabs(columnsExample);
        });
    });

    describe('Process example', () => {
        it('should check selecting tabs in process example', () => {
            checkSelectingTabs(processExample);
        });

        it('should check procces example', () => {
            expect(isElementDisplayed(processExample + processIcon)).toBe(true, 'process icon is not displayed');
        });

        it('should check quantity of communicators in process example', () => {
            const itemsQuantity = getElementArrayLength(processExample + tabBarItem);
            expect(getElementArrayLength(processExample + processIcon)).toBe(
                itemsQuantity - 1,
                'wrong quantity of process icons and tabs'
            );
        });
    });

    describe('Icon only example', () => {
        it('should check selecting tabs in iconName only example', () => {
            checkSelectingTabs(iconOnlyExample);
        });

        it('should check that no labels in only iconName example', () => {
            expect(doesItExist(iconOnlyExample + label)).toBe(false, 'label exists but should not');
            expect(doesItExist(iconOnlyExample + counter)).toBe(false, 'counter exists but should not');
        });
    });

    describe('Nested tabs example', () => {
        it('should check selecting tabs in nested example', () => {
            checkSelectingTabs(nestedTabsExample);
        });

        // skipped due to https://github.com/SAP/fundamental-ngx/issues/6743
        xit('should check tab with expanded list', () => {
            click(nestedTabsExample + tabBarItem, 3);
            expect(isElementDisplayed(expandedList)).toBe(true, 'expanded list is not displayed');
            const itemText = getText(listItem, 1);
            click(listItem, 1);
            expect(getText(nestedTabsExample + tabBarItem)).toEqual(
                itemText,
                'text is not changed according to selected item'
            );
            expect(getAttributeByName(nestedTabsExample + tabBarTab, 'aria-selected', 3)).toBe(
                'true',
                'tab is not selected'
            );
        });
    });

    describe('Reordering example', () => {
        it('should check selecting tabs in columns example', () => {
            checkSelectingTabs(reorderingExample);
        });
    });

    describe('Overflowing example', () => {
        it('should check selecting tabs in overflowing example', () => {
            refreshPage();
            checkSelectingTabs(overflowingExample);
        });

        it('should check overflowing', () => {
            click(overflowButton);
            expect(isElementDisplayed(expandedList)).toBe(true, 'expanded list is not displayed');
            const iconName = getElementClass(listItem + icon);
            const quantityOfDisplayedTabs = getElementArrayLength(
                overflowingExample + tabBarItem + '[aria-hidden=false]'
            );
            click(listItem);
            expect(getElementClass(overflowingExample + tabBarItem + icon, quantityOfDisplayedTabs - 1)).toBe(
                iconName,
                'tabs are not replaced'
            );
        });
    });

    describe('Configurations paddings example', () => {
        it('should check selecting tabs in configuratable paddings example', () => {
            checkSelectingTabs(configuratablePaddingsExample);
        });

        it('should check paddings between tabs', () => {
            for (let i = 0; i < 4; i++) {
                expect(getElementClass(configuratablePaddingsExample + tabBar, i)).toContain(
                    paddingsSizes[i],
                    `padding is not of ${paddingsSizes[i]} size`
                );
            }
        });
    });

    it('should check LTR and RTL orientation', () => {
        iconTabBarPage.checkRtlSwitch();
    });

    function checkSelectingTabs(section: string): void {
        let itemsQuantity;
        section === overflowingExample
            ? (itemsQuantity = getElementArrayLength(overflowingExample + tabBarItem + '[aria-hidden=false]'))
            : (itemsQuantity = getElementArrayLength(section + tabBarItem));
        for (let i = 0; i < itemsQuantity; i++) {
            if (section !== nestedTabsExample && i !== 3) {
                click(section + tabBarItem, i);
                expect(getAttributeByName(section + tabBarTab, 'aria-selected', i)).toBe(
                    'true',
                    `tab with index ${i} is not selected`
                );
            }
        }
    }
});
