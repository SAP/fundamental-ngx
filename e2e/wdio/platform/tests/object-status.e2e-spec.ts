import { ObjectStatusPo } from '../pages/object-status.po';
import {
    acceptAlert,
    click, getAttributeByName,
    getElementArrayLength, getElementClass,
    getText,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import {
    defaultStatusText,
    indicationColorText,
    largeStatusAttribute,
    semanticStatusText,
    invertedAttribute
} from '../fixtures/appData/object-status-contents';
import { checkAttributeValueTrue, checkElementDisplayed, checkElementTextValue } from '../../helper/assertion-helper';

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
        });
    });

    describe('object status text only example', function() {
        it('should check text values', () => {
            scrollIntoView(textOnlyExamples + text);
            checkElementTextValue(textOnlyExamples + text, semanticStatusText);
        });
    });

    describe('object status with text and icon example', function() {
        it('should check text values', () => {
            scrollIntoView(textAndIconExamples + text);
            checkElementTextValue(textAndIconExamples + text, semanticStatusText);
        });

        it('should check icons and icon colors', () => {
            checkElementDisplayed(textAndIconExamples + icons);
        });
    });

    describe('object status with generic indication colors example', function() {
        it('should check text values', () => {
            scrollIntoView(indicationColorExamples + text);
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
            const statusCount = getElementArrayLength(invertedExamples + status);

            for (let i = 0; i < statusCount; i++) {
                scrollIntoView(invertedExamples + status);
                expect(getAttributeByName(invertedExamples + status, invertedAttribute)).toBe('true');
            }
        });
    });

    describe('inverted object status with generic indication colors example', function() {
        it('should check status is inverted', () => {
            const statusCount = getElementArrayLength(invertedIndicationColorExamples + status);

            for (let i = 0; i < statusCount; i++) {
                scrollIntoView(invertedIndicationColorExamples + status);
                expect(getElementClass(invertedIndicationColorExamples + status + ' span')).toContain('fd-object-status--inverted');
            }
        });
    });

    describe('object status large design example', function() {
        it('should check large status', () => {
            const statusCount = getElementArrayLength(largeExamples + status);

            for (let i = 0; i < statusCount; i++) {
                scrollIntoView(largeExamples + status);
                expect(getAttributeByName(largeExamples + status, largeStatusAttribute)).toBe('true');
            }
        });
    });

    describe('Orientation check', function() {
        it('should check RTL/LTR', () => {
            objectStatusPage.checkRtlSwitch();
        });
    });

    xdescribe('Visual regression', function() {
        it('should check examples visual regression', () => {
            refreshPage();
            waitForPresent(defaultExamples + status);
            objectStatusPage.saveExampleBaselineScreenshot();
            expect(objectStatusPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
