import { FlexibleColumnLayoutPo } from '../pages/flexible-column-layout.po';
import {
    click,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    isElementDisplayed,
    pause,
    refreshPage,
    waitForElDisplayed,
} from '../../driver/wdio';

describe('Flexible column layout component test', function () {
    const flexibleColumnLayoutPage = new FlexibleColumnLayoutPo();
    const {
        defaultExample,
        dynamicExample,
        button,
        exitExampleBtn,
        column,
        separateButton,
        collapsButton,
        collapsibleHeader,
        pinButton,
        columnButton
    } = flexibleColumnLayoutPage;

    beforeAll(() => {
        flexibleColumnLayoutPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForElDisplayed(flexibleColumnLayoutPage.title);
    }, 2);

    it('should check open-close example for default example', () => {
        checkOpenClose(defaultExample);
    });

    it('should check open-close example for dynamic example', () => {
        checkOpenClose(dynamicExample);
    });

    it('should check width of the colums for default example', () => {
        checkColumnWidth(defaultExample);
    });

    it('should check width of the columns for dynamic example', () => {
        checkColumnWidth(dynamicExample);
    });

    it('should check opening columns for default example', () => {
        checkColumnsOpening(defaultExample);
    });

    it('should check opening columns for dynamic example', () => {
        checkColumnsOpening(dynamicExample);
    });

    it('should check collapsible area', () => {
        click(dynamicExample + button);
        click(columnButton);
        click(collapsButton);
        expect(isElementDisplayed(collapsibleHeader, 0)).toBe(false, 'collapsible area is not visible');
        click(collapsButton);
        expect(isElementDisplayed(collapsibleHeader, 0)).toBe(true, 'collapsible area is visible');
    });

    it('should check pin in dynamic example', () => {
        click(dynamicExample + button);
        click(columnButton);
        expect(getAttributeByName(pinButton, 'aria-selected')).toBe('false', 'pin is selected, but should not be');
        expect(getAttributeByName(pinButton, 'aria-label')).toBe('Pin Header');
        expect(getAttributeByName(pinButton, 'title')).toBe('Pin Header');
        pause(1000);
        click(pinButton);
        expect(getAttributeByName(pinButton, 'aria-selected')).toBe('true', 'pin is not selected');
        expect(getAttributeByName(pinButton, 'aria-label')).toBe('Unpin Header');
        expect(getAttributeByName(pinButton, 'title')).toBe('Unpin Header');
    });

    it('should check separator for default example', () => {
        checkSeparator(defaultExample);
    });

    it('should check separator for dynamic example', () => {
        checkSeparator(dynamicExample);
    });

    it('should check orientation', () => {
        flexibleColumnLayoutPage.checkRtlSwitch();
    });

    it('should check examples visual regression', () => {
        flexibleColumnLayoutPage.saveExampleBaselineScreenshot();
        expect(flexibleColumnLayoutPage.compareWithBaseline()).toBeLessThan(5);
    });

    function checkColumnWidth(section: string): void {
        click(section + button);
        expect(getAttributeByName(column, 'style', 0)).toContain('width: 100%');
        click(columnButton);
        pause(1000);

        if (section === defaultExample) {
            expect(getAttributeByName(column, 'style', 0)).toContain('width: 67%');
            expect(getAttributeByName(column, 'style', 1)).toContain('width: 33%');
            click(columnButton, 1);
        }

        if (section === dynamicExample) {
            expect(getAttributeByName(column, 'style', 0)).toContain('width: 33%');
            expect(getAttributeByName(column, 'style', 1)).toContain('width: 67%');
            click(columnButton, 5);
        }

        pause(1000);
        expect(getAttributeByName(column, 'style', 0)).toContain('width: 25%');
        expect(getAttributeByName(column, 'style', 1)).toContain('width: 50%');
        expect(getAttributeByName(column, 'style', 2)).toContain('width: 25%');
        section === defaultExample ? click(columnButton, 3) : click(columnButton, 5);
        pause(1000);
        expect(isElementDisplayed(column, 2)).toBe(false, 'column is visible');
        expect(getAttributeByName(column, 'style', 0)).toContain('width: 33%');
        expect(getAttributeByName(column, 'style', 1)).toContain('width: 67%');
        section === defaultExample ? click(columnButton, 1) : click(columnButton, 5);
        section === defaultExample ? click(columnButton, 2) : click(columnButton, 4);
        pause(1000);
        expect(isElementDisplayed(column, 0)).toBe(false, 'column is visible');
        expect(isElementDisplayed(column, 1)).toBe(false, 'column is visible');
        expect(getAttributeByName(column, 'style', 2)).toContain('width: 100%');
    }

    function checkSeparator(section: string): void {
        click(section + button);
        click(columnButton);
        pause(1000);
        const startFirstColumnWidth = getAttributeByName(column, 'style', 0);
        click(separateButton);
        pause(1000);
        expect(getAttributeByName(column, 'style', 0)).not.toContain(startFirstColumnWidth);
        section === dynamicExample ? click(columnButton, 5) : click(columnButton, 1);
        pause(1000);
        expect(getElementArrayLength(separateButton)).toEqual(2);
        const startMidColumnWidth = getAttributeByName(column, 'style', 1);
        click(separateButton, 1);
        pause(1000);
        expect(getAttributeByName(column, 'style', 1)).not.toContain(startMidColumnWidth);
        expect(getElementArrayLength(separateButton)).toEqual(1);
        click(separateButton);
        pause(1000);
        expect(getAttributeByName(column, 'style', 1)).toContain(startMidColumnWidth);
        expect(getElementArrayLength(separateButton)).toEqual(2);
        click(separateButton);
        pause(1000);
        expect(isElementDisplayed(column, 2)).toBe(false, 'column is visible');
        click(separateButton);
        expect(getElementArrayLength(separateButton)).toEqual(1);
    }

    function checkColumnsOpening(section: string): void {
        click(section + button);
        click(columnButton);
        pause(1000);
        expect(isElementDisplayed(column, 1)).toBe(true, 'column is not visible');
        section === dynamicExample ? click(columnButton, 5) : click(columnButton, 1);

        pause(1000);
        expect(isElementDisplayed(column, 2)).toBe(true, 'column is not visible');
        section === dynamicExample ? click(columnButton, 5) : click(columnButton, 3);
        pause(1000);
        expect(isElementDisplayed(column, 2)).toBe(false, 'column is visible');
    }

    function checkOpenClose(section: string): void {
        click(section + button);
        expect(isElementDisplayed(column)).toBe(true, 'column is not displayed');
        click(exitExampleBtn);
        expect(doesItExist(column)).toBe(false);
    }

});
