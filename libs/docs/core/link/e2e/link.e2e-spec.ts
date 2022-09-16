import { LinkPo } from './link.po';
import {
    getElementAriaLabel,
    getElementArrayLength,
    isElementClickable,
    isElementDisplayed,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Link test suite', () => {
    const linkPage = new LinkPo();
    const { links, leftArrowIcon, rightArrowIcon } = linkPage;

    beforeAll(() => {
        linkPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(linkPage.root);
        waitForElDisplayed(linkPage.title);
    }, 1);

    describe('check links', () => {
        it('should check links clickable', () => {
            const linkCount = getElementArrayLength(links);
            const disabledLinkIndex = 2;

            for (let i = 0; i < linkCount; i++) {
                if (i === disabledLinkIndex) {
                    expect(isElementClickable(links, i)).toBe(false);
                    continue;
                }
                expect(isElementClickable(links, i)).toBe(true);
            }
        });

        it('should check that first link is standard type', () => {
            expect(getElementAriaLabel(links)).toBe('Standard');
        });

        it('should check that second link is emphasized type', () => {
            expect(getElementAriaLabel(links, 1)).toBe('Emphasized');
        });

        it('should check that the last link is inverted type', () => {
            expect(getElementAriaLabel(links, 5)).toBe('Inverted');
        });

        it('should check link with right arrow', () => {
            expect(getElementAriaLabel(links, 3)).toBe('Icon right');
            expect(isElementDisplayed(rightArrowIcon)).toBe(true);
        });

        it('should check link with left arrow', () => {
            expect(getElementAriaLabel(links, 4)).toBe('Icon left');
            expect(isElementDisplayed(leftArrowIcon)).toBe(true);
        });

        it('should check orientation', () => {
            linkPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        it('should check examples visual regression', () => {
            linkPage.saveExampleBaselineScreenshot();
            expect(linkPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
