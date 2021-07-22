import { ObjectIdentifierPo } from '../pages/object-identifier.po';
import {
    click,
    getElementAriaLabel,
    getElementArrayLength,
    getElementTitle,
    refreshPage,
    scrollIntoView,
    waitForPresent
} from '../../driver/wdio';
import { checkElArrIsClickable } from '../../helper/assertion-helper';


describe('Object identifier test suite', function() {
    const objectIdentifierPage = new ObjectIdentifierPo();
    const {
        identifier,
        clickableLinks,
    } = objectIdentifierPage;

    beforeAll(() => {
        objectIdentifierPage.open();
    }, 1);

    it('Verify each marker is clickable', () => {
        checkElArrIsClickable(identifier);
    });

    afterEach(() => {
        refreshPage();
        waitForPresent(identifier);
    }, 1);

    it('Verify each identifier is clickable', () => {
        const arr = getElementArrayLength(identifier);
        for (let i = 0; i < arr; i++) {
            scrollIntoView(identifier, i);
            click(identifier, i);
        }
    });

    describe('Check orientation', function() {
        it('Verify RTL and LTR orientation', () => {
            objectIdentifierPage.checkRtlSwitch();
        });
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            objectIdentifierPage.saveExampleBaselineScreenshot();
            expect(objectIdentifierPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
