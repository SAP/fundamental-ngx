import { PanelPo } from './panel.po';
import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementSize,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Panel test suite', () => {
    const panelPage = new PanelPo();
    const { toggleButton, panelExpandableButton, panelParagraphs, expandableButton, compactPanelButton, panelTitle } =
        panelPage;

    beforeAll(() => {
        panelPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(panelPage.root);
        waitForElDisplayed(panelPage.title);
    }, 1);

    it('should check orientation', () => {
        panelPage.checkRtlSwitch();
    });

    it('should check Expandable Panel example', () => {
        scrollIntoView(toggleButton);
        click(toggleButton);
        expect(getAttributeByName(expandableButton, 'aria-expanded')).toBe('false');

        click(panelExpandableButton);
        expect(isElementDisplayed(panelParagraphs)).toBe(true, `paragraph not displayed`);
    });

    it('should check Fixed Panel example', () => {
        scrollIntoView(panelParagraphs, 1);
        expect(isElementDisplayed(panelParagraphs, 1)).toBe(true, `paragraph not displayed`);
    });

    it('should check Compact Panel example', () => {
        scrollIntoView(compactPanelButton);
        click(compactPanelButton);
        expect(isElementDisplayed(panelParagraphs, 2)).toBe(true, `paragraph not displayed`);
    });

    it('should check Fixed Height Content Panel', () => {
        scrollIntoView(panelParagraphs, 2);
        expect(isElementDisplayed(panelParagraphs, 2)).toBe(true, `paragraph not displayed`);
    });

    it('should check compact button be smaller than basic button', () => {
        const expandableBtnSize = getElementSize(panelExpandableButton);
        const compactBtnSize = getElementSize(compactPanelButton);

        expect(expandableBtnSize.width).toBeGreaterThan(compactBtnSize.width);
        expect(expandableBtnSize.height).toBeGreaterThan(compactBtnSize.height);
    });

    it('should check component have titles', () => {
        const titleLength = getElementArrayLength(panelTitle);
        const testTitleText = 'Panel Header';
        for (let i = 0; i < titleLength; i++) {
            scrollIntoView(panelTitle, i);
            expect(getText(panelTitle, i)).toBe(testTitleText);
        }
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            panelPage.saveExampleBaselineScreenshot();
            expect(panelPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
