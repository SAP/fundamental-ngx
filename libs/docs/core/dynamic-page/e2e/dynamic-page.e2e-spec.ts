import {
    checkElArrIsClickable,
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '../../../../../e2e';
import { DynamicPagePo } from './dynamic-page.po';

describe('dynamic side content test suite', () => {
    const dynamicPagePage = new DynamicPagePo();
    const {
        button,
        pinButton,
        exitButton,
        saveButton,
        closeButton,
        cancelButton,
        rejectButton,
        acceptButton,
        collapseButton,
        collapsibleHeader,
        columnLayoutExample,
        tabsExample,
        defaultExample,
        responsiveExample,
        tab,
        dynamicPageContent,
        tabsContent,
        dynamicPage,
        flexibleColumn,
        dynamicPageBtn,
        breadcrumbLink,
        article,
        currentBreadcrumbLink
    } = dynamicPagePage;

    beforeAll(async () => {
        await dynamicPagePage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await dynamicPagePage.waitForRoot();
        await waitForElDisplayed(dynamicPagePage.title);
    }, 1);

    describe('Tests for column layout example', () => {
        it('should check close page by clicking exit button', async () => {
            await openPage(columnLayoutExample);
            await checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', async () => {
            await openPage(columnLayoutExample);
            await checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', async () => {
            await openPage(columnLayoutExample);
            await checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', async () => {
            await openPage(columnLayoutExample);
            await checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', async () => {
            await openPage(columnLayoutExample);
            await checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', async () => {
            await openPage(columnLayoutExample);
            await checkPageClosed(closeButton);
        });

        it('should check links clickable', async () => {
            await openPage(columnLayoutExample);
            await checkElArrIsClickable(columnLayoutExample + breadcrumbLink);
        });

        it('should check collapsing area', async () => {
            await openPage(columnLayoutExample);
            await checkCollapsingArea();
        });

        it('should check 📍 button working', async () => {
            await openPage(columnLayoutExample);
            await checkPiningArea();
        });

        it('should check open-close flexible columns', async () => {
            await openPage(columnLayoutExample);
            // click to open 2nd column
            await click(dynamicPageBtn, 7);
            // pause animation to complete
            await pause(1000);
            await expect(await isElementDisplayed(flexibleColumn, 1)).toBe(
                true,
                'flexible column is not visible - first column'
            );
            // click to open 3rd column
            await click(flexibleColumn + button, 10);
            await pause(1000);
            await expect(await isElementDisplayed(flexibleColumn, 2)).toBe(
                true,
                'flexible column is not visible - 2nd column'
            );
            // click to expand 3rd column
            await click(flexibleColumn + button, 11);
            await pause(1000);
            await expect(await isElementDisplayed(flexibleColumn, 0)).toBe(
                false,
                'flexible column is not hidden - 1st column'
            );
            await expect(await isElementDisplayed(flexibleColumn, 1)).toBe(
                false,
                'flexible column is not hidden - 2nd column'
            );
            await expect(await isElementDisplayed(flexibleColumn, 2)).toBe(
                true,
                'flexible column is not visible - 3rd column'
            );
            // click to exit from full screen mode
            await click(flexibleColumn + button, 11);
            await pause(1000);
            await expect(await isElementDisplayed(flexibleColumn, 0)).toBe(
                true,
                'flexible column is not visible - 1st column'
            );
            await expect(await isElementDisplayed(flexibleColumn, 1)).toBe(
                true,
                'flexible column is not visible - 2nd column'
            );
            await expect(await isElementDisplayed(flexibleColumn, 2)).toBe(
                true,
                'flexible column is not visible - 3rd column'
            );
            // click to close 3rd column
            await click(flexibleColumn + button, 12);
            await pause(1000);
            await expect(await isElementDisplayed(flexibleColumn, 2)).toBe(
                false,
                'flexible column is not hidden - 3rd column'
            );
        });
    });

    describe('Tests for responsive example', () => {
        it('should check close page by clicking exit button', async () => {
            await openPage(responsiveExample);
            await checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', async () => {
            await openPage(responsiveExample);
            await checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', async () => {
            await openPage(responsiveExample);
            await checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', async () => {
            await openPage(responsiveExample);
            await checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', async () => {
            await openPage(responsiveExample);
            await checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', async () => {
            await openPage(responsiveExample);
            await checkPageClosed(closeButton);
        });

        it('should check collapsing area', async () => {
            await openPage(responsiveExample);
            await checkCollapsingArea();
        });

        it('should check 📍 button working', async () => {
            await openPage(responsiveExample);
            await checkPiningArea();
        });

        it('should check changing size of buttons size', async () => {
            await openPage(responsiveExample);
            await click(dynamicPageBtn, 7);
            await expect(await getElementClass(`${dynamicPage} fd-toolbar`)).not.toContain(
                'is-compact',
                'size of the button still compact'
            );

            await click(dynamicPage + button, 7);
            await expect(await getElementClass(`${dynamicPage} fd-toolbar`)).toContain(
                'is-compact',
                'size of the button did not change to cozy'
            );
        });

        it('should check links clickable', async () => {
            await openPage(responsiveExample);
            await checkElArrIsClickable(responsiveExample + breadcrumbLink);
        });
    });

    describe('Tests for tabs example', () => {
        it('should check close page by clicking exit button', async () => {
            await openPage(tabsExample);
            await checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', async () => {
            await openPage(tabsExample);
            await checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', async () => {
            await openPage(tabsExample);
            await checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', async () => {
            await openPage(tabsExample);
            await checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', async () => {
            await openPage(tabsExample);
            await checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', async () => {
            await openPage(tabsExample);
            await checkPageClosed(closeButton);
        });

        it('should check pining area', async () => {
            await openPage(tabsExample);
            await checkPiningArea();
        });

        it('should check collapsing area', async () => {
            await openPage(tabsExample);
            await checkCollapsingArea();
        });

        it('should check selecting tabs', async () => {
            await openPage(tabsExample, 1);
            await scrollIntoView(tabsContent, 0);
            await expect(await getAttributeByName(tab, 'aria-selected', 0)).toContain(
                'true',
                'tab is not highlited as selected after scroll to content'
            );
            await expect(await getAttributeByName(tab, 'aria-selected', 1)).not.toContain(
                'true',
                'tab is selected, but should not'
            );
            await expect(await getAttributeByName(tab, 'aria-selected', 2)).not.toContain(
                'true',
                'tab is selected, but should not'
            );
        });

        it('should check links clickable', async () => {
            await openPage(tabsExample);
            await checkElArrIsClickable(tabsExample + breadcrumbLink);
        });
    });

    describe('Tests for default example', () => {
        it('should check close page by clicking exit button', async () => {
            await openPage(defaultExample);
            await checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', async () => {
            await openPage(defaultExample);
            await checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', async () => {
            await openPage(defaultExample);
            await checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', async () => {
            await openPage(defaultExample);
            await checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', async () => {
            await openPage(defaultExample);
            await checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', async () => {
            await openPage(defaultExample);
            await checkPageClosed(closeButton);
        });

        it('should check links clickable', async () => {
            await openPage(defaultExample);
            await checkElArrIsClickable(defaultExample + breadcrumbLink);
        });
    });

    it('should check RTL and LTR orientation', async () => {
        await dynamicPagePage.checkRtlSwitch();
    });

    async function checkPageClosed(btn: string): Promise<void> {
        await click(btn);
        await expect(await doesItExist(dynamicPageContent)).toBe(false, 'dynamic page is not closed');
    }

    async function openPage(section: string, index: number = 0): Promise<void> {
        await click(section + button, index);
        await waitForElDisplayed(dynamicPageContent);
    }

    async function checkPiningArea(): Promise<void> {
        await click(pinButton);
        await expect(await getAttributeByName(pinButton, 'aria-pressed')).toBe('true', 'area is not pinned');
        const articlesLength = await getElementArrayLength(article);
        await scrollIntoView(article, articlesLength - 1);
        await expect(await isElementDisplayed(collapsibleHeader)).toBe(
            true,
            'collapsible area is not visible, pinning works incorrect'
        );
        await click(exitButton);
    }

    async function checkCollapsingArea(): Promise<void> {
        await click(collapseButton);
        await expect(await isElementDisplayed(collapsibleHeader)).toBe(false, 'collapsible area is not hidden');
        await click(collapseButton);
        await expect(await isElementDisplayed(collapsibleHeader)).toBe(true, 'collapsible area is not displayed');
        await click(exitButton);
    }
});
