import { SplitterPo } from './spltiller.po';
import {
    browserIsFirefox,
    browserIsSafari,
    click,
    clickAndMoveElement,
    getElementArrayLength,
    getElementSize,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Standard List test suite', () => {
    const splitterPage = new SplitterPo();
    const { basicExample, splitterSection, requiredWidthExample, sliderApiExample, button, resizer, paginationItem } =
        splitterPage;

    beforeAll(() => {
        splitterPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(splitterPage.root);
        waitForElDisplayed(splitterPage.title);
    }, 1);

    describe('Basic example', () => {
        it('should check horizontal resizing', () => {
            checkHorizontalResize(basicExample);
        });

        it('should check resizing vertical nested sections', () => {
            // FF and Safari skipped due to dragAndDrop does not work there
            if (browserIsFirefox() || browserIsSafari()) {
                return;
            }
            scrollIntoView(basicExample + splitterSection);
            const firstNestedSectionHeight = getElementSize(basicExample + splitterSection, 5, 'height');
            clickAndMoveElement(basicExample + resizer, 0, -50, 3);

            expect(getElementSize(basicExample + splitterSection, 5, 'height')).not.toEqual(
                firstNestedSectionHeight,
                'height of section is not changed after resizing'
            );
        });
    });

    describe('Required parent width example', () => {
        it('should check resizing', () => {
            checkHorizontalResize(requiredWidthExample);
        });
    });

    describe('Slider API example', () => {
        it('should check horizontal resizing', () => {
            checkHorizontalResize(sliderApiExample);
        });

        it('should check hiding sections by buttons', () => {
            click(sliderApiExample + button);
            expect(getElementArrayLength(sliderApiExample + splitterSection)).toBe(2, 'section is not hidden');

            click(paginationItem, 1);
            expect(getElementArrayLength(sliderApiExample + splitterSection)).toBe(1, 'section is not hidden');

            click(paginationItem, 0);
            expect(getElementArrayLength(sliderApiExample + splitterSection)).toBe(2, 'section is not displayed back');

            click(sliderApiExample + button, 1);
            expect(getElementArrayLength(sliderApiExample + splitterSection)).toBe(3, 'section is not displayed back');
        });
    });

    function checkHorizontalResize(section: string): void {
        // FF and Safari skipped due to dragAndDrop does not work there
        if (browserIsFirefox() || browserIsSafari()) {
            return;
        }
        scrollIntoView(section + splitterSection);
        const startingFirstColumnWidth = getElementSize(section + splitterSection, 0, 'width');
        const startingSecondColumnWidth = getElementSize(section + splitterSection, 1, 'width');
        const startingThirdColumnWidth = getElementSize(section + splitterSection, 2, 'width');

        clickAndMoveElement(section + resizer, -200, 0);
        clickAndMoveElement(section + resizer, 200, 0, 1);

        expect(getElementSize(section + splitterSection, 0, 'width')).not.toEqual(startingFirstColumnWidth);
        expect(getElementSize(section + splitterSection, 1, 'width')).not.toEqual(startingSecondColumnWidth);
        expect(getElementSize(section + splitterSection, 2, 'width')).not.toEqual(startingThirdColumnWidth);
    }
});
