import { LinkPo } from '../pages/link.po';
import {
    getElementArrayLength,
    isElementClickable,
    refreshPage,
} from '../../driver/wdio';

describe('Link test suite', function() {
    const linkPage = new LinkPo();
    const { links } = linkPage;

    beforeAll(() => {
        linkPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
    }, 1);

    describe('check links', function() {
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

        it('should check orientation', () => {
           linkPage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', function() {
        it('should check examples visual regression', () => {
            linkPage.saveExampleBaselineScreenshot();
            expect(linkPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
