import {
    click,
    doesItExist,
    getAttributeByName,
    getCurrentUrl,
    getElementArrayLength,
    getElementClass,
    goBack,
    isElementDisplayed,
    pause,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';
import { DynamicPagePo } from '../pages/dynamic-page.po';

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

    beforeAll(() => {
        dynamicPagePage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(dynamicPagePage.root);
        waitForElDisplayed(dynamicPagePage.title);
    }, 1);

    describe('Tests for column layout example', () => {
        it('should check navigate by link', () => {
            openPage(columnLayoutExample);
            checkUrlNavigation();
        });

        it('should check close page by clicking exit button', () => {
            openPage(columnLayoutExample);
            checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', () => {
            openPage(columnLayoutExample);
            checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', () => {
            openPage(columnLayoutExample);
            checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', () => {
            openPage(columnLayoutExample);
            checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', () => {
            openPage(columnLayoutExample);
            checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', () => {
            openPage(columnLayoutExample);
            checkPageClosed(closeButton);
        });

        it('should check links clickable', () => {
            openPage(columnLayoutExample);
            checkElArrIsClickable(columnLayoutExample + breadcrumbLink);
        });

        it('should check collapsing area', () => {
            openPage(columnLayoutExample);
            checkCollapsingArea();
        });

        it('should check 📍 button working', () => {
            openPage(columnLayoutExample);
            checkPiningArea();
        });

        it('should check open-close flexible columns', () => {
            openPage(columnLayoutExample);
            // click to open 2nd column
            click(dynamicPageBtn, 7);
            // pause animation to complete
            pause(1000);
            expect(isElementDisplayed(flexibleColumn, 1)).toBe(true, 'flexible column is not visible - first column');
            // click to open 3rd column
            click(flexibleColumn + button, 10);
            pause(1000);
            expect(isElementDisplayed(flexibleColumn, 2)).toBe(true, 'flexible column is not visible - 2nd column');
            // click to expand 3rd column
            click(flexibleColumn + button, 11);
            pause(1000);
            expect(isElementDisplayed(flexibleColumn, 0)).toBe(false, 'flexible column is not hidden - 1st column');
            expect(isElementDisplayed(flexibleColumn, 1)).toBe(false, 'flexible column is not hidden - 2nd column');
            expect(isElementDisplayed(flexibleColumn, 2)).toBe(true, 'flexible column is not visible - 3rd column');
            // click to exit from full screen mode
            click(flexibleColumn + button, 11);
            pause(1000);
            expect(isElementDisplayed(flexibleColumn, 0)).toBe(true, 'flexible column is not visible - 1st column');
            expect(isElementDisplayed(flexibleColumn, 1)).toBe(true, 'flexible column is not visible - 2nd column');
            expect(isElementDisplayed(flexibleColumn, 2)).toBe(true, 'flexible column is not visible - 3rd column');
            // click to close 3rd column
            click(flexibleColumn + button, 12);
            pause(1000);
            expect(isElementDisplayed(flexibleColumn, 2)).toBe(false, 'flexible column is not hidden - 3rd column');
        });
    });

    describe('Tests for responsive example', () => {
        it('should check close page by clicking exit button', () => {
            openPage(responsiveExample);
            checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', () => {
            openPage(responsiveExample);
            checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', () => {
            openPage(responsiveExample);
            checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', () => {
            openPage(responsiveExample);
            checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', () => {
            openPage(responsiveExample);
            checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', () => {
            openPage(responsiveExample);
            checkPageClosed(closeButton);
        });

        it('should check collapsing area', () => {
            openPage(responsiveExample);
            checkCollapsingArea();
        });

        it('should check 📍 button working', () => {
            openPage(responsiveExample);
            checkPiningArea();
        });

        it('should check changing size of buttons size', () => {
            openPage(responsiveExample);
            click(dynamicPageBtn, 7);
            const buttonsLength = getElementArrayLength(dynamicPage + button);
            for (let i = 0; i < buttonsLength; i++) {
                if (i !== 5 && i !== 6) {
                    expect(getElementClass(dynamicPageBtn, i)).not.toContain(
                        'compact',
                        'size of the button still compact'
                    );
                }
            }
            click(dynamicPage + button, 7);
            for (let i = 0; i < buttonsLength; i++) {
                if (i !== 5 && i !== 6) {
                    expect(getElementClass(dynamicPageBtn, i)).toContain(
                        'compact',
                        'size of the button did not change to cozy'
                    );
                }
            }
        });

        it('should check links clickable', () => {
            openPage(responsiveExample);
            checkElArrIsClickable(responsiveExample + breadcrumbLink);
        });

        it('should check navigate by link', () => {
            openPage(responsiveExample);
            checkUrlNavigation();
        });
    });

    describe('Tests for tabs example', () => {
        it('should check close page by clicking exit button', () => {
            openPage(tabsExample);
            checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', () => {
            openPage(tabsExample);
            checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', () => {
            openPage(tabsExample);
            checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', () => {
            openPage(tabsExample);
            checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', () => {
            openPage(tabsExample);
            checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', () => {
            openPage(tabsExample);
            checkPageClosed(closeButton);
        });

        it('should check pining area', () => {
            openPage(tabsExample);
            checkPiningArea();
        });

        it('should check collapsing area', () => {
            openPage(tabsExample);
            checkCollapsingArea();
        });

        it('should check selecting tabs', () => {
            openPage(tabsExample, 1);
            scrollIntoView(tabsContent, 1);
            pause(1500);
            expect(getElementClass(tab)).toContain(
                'is-selected',
                'tab is not highlited as selected after scroll to content'
            );
            expect(getElementClass(tab, 1)).not.toContain('is-selected', 'tab is selected, but should not');
            expect(getElementClass(tab, 2)).not.toContain('is-selected', 'tab is selected, but should not');
        });

        it('should check links clickable', () => {
            openPage(tabsExample);
            checkElArrIsClickable(tabsExample + breadcrumbLink);
        });

        it('should check navigate by link', () => {
            openPage(tabsExample);
            checkUrlNavigation();
        });
    });

    describe('Tests for default example', () => {
        it('should check close page by clicking exit button', () => {
            openPage(defaultExample);
            checkPageClosed(exitButton);
        });

        it('should check close page by clicking cancel button', () => {
            openPage(defaultExample);
            checkPageClosed(cancelButton);
        });

        it('should check close page by clicking reject button', () => {
            openPage(defaultExample);
            checkPageClosed(rejectButton);
        });

        it('should check close page by clicking accept button', () => {
            openPage(defaultExample);
            checkPageClosed(acceptButton);
        });

        it('should check close page by clicking save button', () => {
            openPage(defaultExample);
            checkPageClosed(saveButton);
        });

        it('should check close page by clicking close button', () => {
            openPage(defaultExample);
            checkPageClosed(closeButton);
        });

        it('should check links clickable', () => {
            openPage(defaultExample);
            checkElArrIsClickable(defaultExample + breadcrumbLink);
        });

        it('should check navigate by link', () => {
            openPage(defaultExample);
            checkUrlNavigation();
        });
    });

    it('should check RTL and LTR orientation', () => {
        dynamicPagePage.checkRtlSwitch();
    });

    function checkPageClosed(btn: string): void {
        click(btn);
        expect(doesItExist(dynamicPageContent)).toBe(false, 'dynamic page is not closed');
    }

    function openPage(section: string, index: number = 0): void {
        click(section + button, index);
        waitForElDisplayed(dynamicPageContent);
    }

    function checkPiningArea(): void {
        click(pinButton);
        expect(getAttributeByName(pinButton, 'aria-selected')).toBe('true', 'area is not pinned');
        const articlesLength = getElementArrayLength(article);
        scrollIntoView(article, articlesLength - 1);
        expect(isElementDisplayed(collapsibleHeader)).toBe(
            true,
            'collapsible area is not visible, pinning works incorrect'
        );
        click(exitButton);
    }

    function checkCollapsingArea(): void {
        click(collapseButton);
        expect(isElementDisplayed(collapsibleHeader)).toBe(false, 'collapsible area is not hidden');
        click(collapseButton);
        expect(isElementDisplayed(collapsibleHeader)).toBe(true, 'collapsible area is not displayed');
        click(exitButton);
    }

    function checkUrlNavigation(): void {
        const currentUrl = getCurrentUrl();
        click(currentBreadcrumbLink);
        // check that link is clickable and does not navigate
        expect(getCurrentUrl()).toEqual(currentUrl);
        click(breadcrumbLink);
        // check that url works correct and directs to page
        expect(getCurrentUrl()).not.toEqual(currentUrl);
        goBack();
    }
});
