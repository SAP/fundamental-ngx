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

    beforeAll(async () => {
        await verticalNavigationPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(verticalNavigationPage.root);
        await waitForElDisplayed(verticalNavigationPage.title);
    }, 2);

    describe('Default example', () => {
        it('should check open by clicking arrow', async () => {
            await checkOpenByClickArrow(defaultExample);
        });

        it('should check open by clicking item', async () => {
            await checkOpenByClickItem(defaultExample);
        });

        it('should check that items in expanded lists are clickable', async () => {
            await checkSubItemsClickable(defaultExample);
        });
    });

    describe('Condensed example', () => {
        it('should check expanding list', async () => {
            await scrollIntoView(condensedExample + listItem);
            await click(condensedExample + listItem, 1);
            await expect(await isElementDisplayed(condensedExample + hiddenItem)).toBe(
                true,
                'item of expanded list is not displayed'
            );
            await click(condensedExample + listItem, 2);
            await expect(await isElementDisplayed(condensedExample + hiddenItem)).toBe(
                false,
                'item of expanded list is displayed'
            );
        });

        it('should check that no text in list items', async () => {
            const itemLength = await getElementArrayLength(condensedExample + listItem);
            for (let i = 0; i < itemLength; i++) {
                await expect(await isElementDisplayed(condensedExample + itemText, i)).toBe(
                    false,
                    `text is displayed for item with index ${i} but should not`
                );
            }
            await click(condensedExample + listItem, 1);
            await expect(await isElementDisplayed(condensedExample + itemText, 1)).toBe(
                true,
                `text is not appeared for item with index 1`
            );
        });

        it('should check that items in expanded lists are clickable', async () => {
            await checkSubItemsClickable(condensedExample);
        });
    });

    describe('Text only example', () => {
        it('should check that no icons in list items', async () => {
            await expect(await doesItExist(textOnlyExample + itemIcon)).toBe(false, 'icons exist in only text example');
        });

        it('should check open by clicking arrow', async () => {
            await checkOpenByClickArrow(textOnlyExample);
        });

        it('should check open by clicking item', async () => {
            await checkOpenByClickItem(textOnlyExample);
        });

        it('should check that items in expanded lists are clickable', async () => {
            await checkSubItemsClickable(textOnlyExample);
        });
    });

    describe('Grouping example', () => {
        it('should check open by clicking arrow', async () => {
            await checkOpenByClickArrow(groupingExample);
        });

        it('should check open by clicking item', async () => {
            await checkOpenByClickItem(groupingExample);
        });

        it('should check that group header is displayed', async () => {
            await expect(await isElementDisplayed(groupingExample + groupHeader)).toBe(
                true,
                'group header is not displayed'
            );
        });

        it('should check that items in expanded lists are clickable', async () => {
            await checkSubItemsClickable(groupingExample);
        });
    });

    it('should check orientations', async () => {
        await verticalNavigationPage.checkRtlSwitch();
    });

    async function checkSubItemsClickable(section: string): Promise<void> {
        const arrowsLength = await getElementArrayLength(section + expandArrow);
        const hiddenItemsLength = await getElementArrayLength(section + hiddenItem);
        for (let i = 0; i < arrowsLength; i++) {
            await click(section + expandArrow, i);
        }
        for (let i = 0; i < hiddenItemsLength; i++) {
            await expect(await isElementClickable(section + hiddenItem, i)).toBe(
                true,
                `item of expanded list with index ${i} is not clickable`
            );
        }
    }

    async function checkOpenByClickArrow(section: string): Promise<void> {
        await click(section + expandArrow);
        await expect(await isElementDisplayed(section + hiddenItem)).toBe(
            true,
            'list is not expanded by clicking on arrow'
        );
        await click(section + expandArrow);
        await expect(await isElementDisplayed(section + hiddenItem)).toBe(
            false,
            'list is not closed by clicking on arrow'
        );
    }

    async function checkOpenByClickItem(section: string): Promise<void> {
        await scrollIntoView(section + expandableItem);
        await click(section + expandableItemText);
        await expect(await isElementDisplayed(section + hiddenItem)).toBe(
            true,
            'list is not expanded by clicking on expandable item'
        );
        await click(section + expandableItemText);
        await expect(await isElementDisplayed(section + hiddenItem)).toBe(
            false,
            'list is not closed by clicking on expandable item'
        );
    }
});
