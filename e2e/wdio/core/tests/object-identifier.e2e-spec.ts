import { ObjectIdentifierPo } from '../pages/object-identifier.po';
import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';

describe('Object identifier test suite', function() {
    const objectIdentifierPage = new ObjectIdentifierPo();
    const {
        identifier,
        clickableLinks,
    } = objectIdentifierPage;

    beforeAll(() => {
        objectIdentifierPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(identifier);
    }, 1);

    it('Verify each identifier is clickable', () => {
        const linkElementArr = getElementArrayLength(clickableLinks);
        for (let i = 0; i < linkElementArr; i++) {
            scrollIntoView(clickableLinks, i);
            expect(isElementClickable(clickableLinks, i)).toBe(true,'link with index ${i} not clickable');
        }
    });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            objectIdentifierPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objectIdentifierPage.saveExampleBaselineScreenshot();
            expect(objectIdentifierPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
