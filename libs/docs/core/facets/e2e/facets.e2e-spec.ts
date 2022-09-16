import { FacetsPo } from './facets.po';
import {
    click,
    getElementArrayLength,
    getText,
    isElementClickable,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('dynamic side content test suite', () => {
    const facetsPage = new FacetsPo();
    const { linkFacestExample, raitingIndicatorExample, groupExample, link, chosenRaitingStars, raitingIndicator } =
        facetsPage;

    beforeAll(() => {
        facetsPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(facetsPage.root);
        waitForElDisplayed(facetsPage.title);
    }, 1);

    it('Should check raiting indicator', () => {
        CheckRaitingIndicator(raitingIndicatorExample);
        CheckRaitingIndicator(groupExample);
    });

    it('Should check that links is clickable', () => {
        const linkLength = getElementArrayLength(linkFacestExample + link);
        for (let i = 0; i < linkLength; i++) {
            expect(isElementClickable(linkFacestExample + link, i)).toBe(true, `link with index ${i} is not clickable`);
        }
    });

    describe('check orientation', () => {
        it('should check RTL and LTR orientation', () => {
            facetsPage.checkRtlSwitch();
        });
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            facetsPage.saveExampleBaselineScreenshot();
            expect(facetsPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function CheckRaitingIndicator(section: string): void {
        const lengthRI = getElementArrayLength(section + raitingIndicator);
        for (let i = 1; i < lengthRI; i++) {
            click(section + raitingIndicator, i);
            expect(getText(section + chosenRaitingStars)).toEqual(`(${i} of 5)`);
        }
    }
});
