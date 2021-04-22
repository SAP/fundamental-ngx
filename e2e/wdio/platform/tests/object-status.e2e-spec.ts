import { ObjectStatusPo } from '../pages/object-status.po';
import {
    acceptAlert,
    click,
    getCSSPropertyByName,
    getElementArrayLength,
    getText,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    backgroundColorAttribute,
    colorAttribute,
    defaultStatusText,
    indicationColors,
    indicationColorText,
    invertedAttribute,
    invertedTextColor,
    largeStatusAttribute,
    semanticColors,
    semanticStatusText
} from '../fixtures/appData/object-status-contents';
import { checkAttributeValueTrue, checkElementDisplayed, checkElementTextValue } from '../../helper/assertion-helper';
import { colorAttr } from '../../core/fixtures/appData/object-number-content';

describe('object status test suite', function() {
    const objectStatusPage = new ObjectStatusPo();
    const {
        defaultExamples,
        textOnlyExamples,
        textAndIconExamples,
        indicationColorExamples,
        clickableExamples,
        invertedExamples,
        invertedIndicationColorExamples,
        largeExamples,
        icons,
        text,
        status
    } = objectStatusPage;

    beforeAll(() => {
        objectStatusPage.open();
    }, 1);

    describe('default object status example', function() {
        it('should check default status', () => {
            expect(getText(defaultExamples + text)).toBe(defaultStatusText);
            expect(getCSSPropertyByName(defaultExamples + text, colorAttr).value).toContain(semanticColors[4]);
        });
    });

    describe('object status text only example', function() {
        xit('should check text colors and text values', () => {
            scrollIntoView(textOnlyExamples + text);
            checkStatusColors(textOnlyExamples + text, colorAttribute, semanticColors);
            checkElementTextValue(textOnlyExamples + text, semanticStatusText);
        });
    });

    describe('object status with text and icon example', function() {
        xit('should check text colors and text values', () => {
            scrollIntoView(textAndIconExamples + text);
            checkStatusColors(textAndIconExamples + text, colorAttribute, semanticColors);
            checkElementTextValue(textAndIconExamples + text, semanticStatusText);
        });

        it('should check icons and icon colors', () => {
            checkElementDisplayed(textAndIconExamples + icons);
            // skipped due to issue https://github.com/SAP/fundamental-ngx/issues/4493
            // checkStatusColors(textAndIconExamples + icons, colorAttribute, semanticColors);
        });
    });

    describe('object status with generic indication colors example', function() {
        xit('should check text colors and text values', () => {
            scrollIntoView(indicationColorExamples + text);
            checkStatusColors(indicationColorExamples + text, colorAttribute, indicationColors);
            checkElementTextValue(indicationColorExamples + text, indicationColorText);
        });
    });

    describe('clickable object status example', function() {
        it('should check statuses are clickable', () => {
            const statusCount = getElementArrayLength(clickableExamples + status);

            for (let i = 0; statusCount > i; i++) {
                scrollIntoView(clickableExamples + status, i);
                click(clickableExamples + status, i);
                acceptAlert();
            }
        });
    });

    describe('inverted object status example', function() {
        it('should check status is inverted', () => {
            scrollIntoView(invertedExamples + status);
            checkAttributeValueTrue(invertedExamples + status, invertedAttribute);
        });
    });

    describe('inverted object status with generic indication colors example', function() {
        it('should check status is inverted', () => {
            scrollIntoView(invertedIndicationColorExamples + status);
            checkAttributeValueTrue(invertedIndicationColorExamples + status, invertedAttribute);
        });

        xit('should check inverted colors', () => {
            checkStatusColors(invertedIndicationColorExamples + text, colorAttr, invertedTextColor);
            checkStatusColors(invertedIndicationColorExamples + status, backgroundColorAttribute, indicationColors);
        });
    });

    describe('object status large design example', function() {
        it('should check large status', () => {
            checkAttributeValueTrue(largeExamples + status, largeStatusAttribute);
        });
    });

    describe('Orientation check', function() {
        it('should check RTL/LTR', () => {
            objectStatusPage.checkRtlSwitch();
        });
    });

    describe('Visual regression', function() {
        xit('should check examples visual regression', () => {
            refreshPage();
            waitForPresent(defaultExamples + status);
            objectStatusPage.saveExampleBaselineScreenshot();
            expect(objectStatusPage.compareWithBaseline()).toBeLessThan(3);
        });
    });
});

function checkStatusColors(selector: string, cssAttribute: string, expectation): void {
    const statusCount = getElementArrayLength(selector);
    for (let i = 0; statusCount > i; i++) {
        expect(getCSSPropertyByName(selector, cssAttribute, i).value).toContain(expectation[i]);
    }
}
