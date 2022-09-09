import { VerticalNavigationPo } from './vertical-navigation.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Vertical navigation component tests', function () {
    const verticalNavigationPage = new VerticalNavigationPo();
    const {
        defaultExample,
        condensedExample,
        textOnlyExample,
        groupingExample,
        itemIcon,
        itemText,
        listItem,
        expandArrow,
        expandableItem,
        hiddenItem,
        expandableItemText,
        groupHeader
    } = verticalNavigationPage;

    beforeAll(() => {
        verticalNavigationPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(verticalNavigationPage.root);
        waitForElDisplayed(verticalNavigationPage.title);
    }, 2);

    describe('Default example', () => {
        it('should check open by clicking arrow', () => {
            checkOpenByClickArrow(defaultExample);
        });

        it('should check open by clicking item', () => {
            checkOpenByClickItem(defaultExample);
        });

        it('should check that items in expanded lists are clickable', () => {
            checkSubItemsClickable(defaultExample);
        });
    });

    describe('Condensed example', () => {
        it('should check expanding list', () => {
            scrollIntoView(condensedExample + listItem);
            click(condensedExample + listItem, 1);
            expect(isElementDisplayed(condensedExample + hiddenItem)).toBe(
                true,
                'item of expanded list is not displayed'
            );
            click(condensedExample + listItem, 2);
            expect(isElementDisplayed(condensedExample + hiddenItem)).toBe(false, 'item of expanded list is displayed');
        });

        it('should check that no text in list items', () => {
            const itemLength = getElementArrayLength(condensedExample + listItem);
            for (let i = 0; i < itemLength; i++) {
                expect(isElementDisplayed(condensedExample + itemText, i)).toBe(
                    false,
                    `text is displayed for item with index ${i} but should not`
                );
            }
            click(condensedExample + listItem, 1);
            expect(isElementDisplayed(condensedExample + itemText, 1)).toBe(
                true,
                `text is not appeared for item with index 1`
            );
        });

        it('should check that items in expanded lists are clickable', () => {
            checkSubItemsClickable(condensedExample);
        });
    });

    describe('Text only example', () => {
        it('should check that no icons in list items', () => {
            expect(doesItExist(textOnlyExample + itemIcon)).toBe(false, 'icons exist in only text example');
        });

        it('should check open by clicking arrow', () => {
            checkOpenByClickArrow(textOnlyExample);
        });

        it('should check open by clicking item', () => {
            checkOpenByClickItem(textOnlyExample);
        });

        it('should check that items in expanded lists are clickable', () => {
            checkSubItemsClickable(textOnlyExample);
        });
    });

    describe('Grouping example', () => {
        it('should check open by clicking arrow', () => {
            checkOpenByClickArrow(groupingExample);
        });

        it('should check open by clicking item', () => {
            checkOpenByClickItem(groupingExample);
        });

        it('should check that group header is displayed', () => {
            expect(isElementDisplayed(groupingExample + groupHeader)).toBe(true, 'group header is not displayed');
        });

        it('should check that items in expanded lists are clickable', () => {
            checkSubItemsClickable(groupingExample);
        });
    });

    it('should check orientations', () => {
        verticalNavigationPage.checkRtlSwitch();
    });

    function checkSubItemsClickable(section: string): void {
        const arrowsLength = getElementArrayLength(section + expandArrow);
        const hiddenItemsLength = getElementArrayLength(section + hiddenItem);
        for (let i = 0; i < arrowsLength; i++) {
            click(section + expandArrow, i);
        }
        for (let i = 0; i < hiddenItemsLength; i++) {
            expect(isElementClickable(section + hiddenItem, i)).toBe(
                true,
                `item of expanded list with index ${i} is not clickable`
            );
        }
    }

    function checkOpenByClickArrow(section: string): void {
        click(section + expandArrow);
        expect(isElementDisplayed(section + hiddenItem)).toBe(true, 'list is not expanded by clicking on arrow');
        click(section + expandArrow);
        expect(isElementDisplayed(section + hiddenItem)).toBe(false, 'list is not closed by clicking on arrow');
    }

    function checkOpenByClickItem(section: string): void {
        scrollIntoView(section + expandableItem);
        click(section + expandableItemText);
        expect(isElementDisplayed(section + hiddenItem)).toBe(
            true,
            'list is not expanded by clicking on expandable item'
        );
        click(section + expandableItemText);
        expect(isElementDisplayed(section + hiddenItem)).toBe(
            false,
            'list is not closed by clicking on expandable item'
        );
    }
});
