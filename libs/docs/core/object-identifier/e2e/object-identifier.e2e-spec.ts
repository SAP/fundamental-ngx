import { ObjectIdentifierPo } from './object-identifier.po';
import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Object identifier test suite', () => {
    const objectIdentifierPage = new ObjectIdentifierPo();
    const { clickableLinks } = objectIdentifierPage;

    beforeAll(() => {
        objectIdentifierPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(objectIdentifierPage.root);
        waitForElDisplayed(objectIdentifierPage.title);
    }, 1);

    it('Verify each identifier is clickable', () => {
        const linkElementArr = getElementArrayLength(clickableLinks);
        for (let i = 0; i < linkElementArr; i++) {
            scrollIntoView(clickableLinks, i);
            expect(isElementClickable(clickableLinks, i)).toBe(true, 'link with index ${i} not clickable');
        }
    });

    describe('Check orientation', () => {
        it('Verify RTL and LTR orientation', () => {
            objectIdentifierPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            objectIdentifierPage.saveExampleBaselineScreenshot();
            expect(objectIdentifierPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
