import { SplitterPo } from '../pages/spltiller.po';
import {
    click,
    getElementArrayLength,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    getAttributeByName,
    clickAndMoveElement,
    getAttributeByNameArr,
    getElementSize,
    waitForPresent,
    browserIsFirefox
} from '../../driver/wdio';

describe('Standard List test suite', function () {
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
            // FF skipped due to dragAndDrop does not work there
            if (browserIsFirefox()) {
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
        // FF skipped due to dragAndDrop does not work there
        if (browserIsFirefox()) {
            return;
        }
        scrollIntoView(section + splitterSection);
        const defaultSizesOfSections = getAttributeByNameArr(section + splitterSection, 'style');

        clickAndMoveElement(section + resizer, -200, 0);
        expect(getAttributeByName(section + splitterSection, 'style')).not.toEqual(
            defaultSizesOfSections[0],
            'width of section is not changed after resizing'
        );

        clickAndMoveElement(section + resizer, 200, 0, 1);
        expect(getAttributeByName(section + splitterSection, 'style', 1)).not.toEqual(
            defaultSizesOfSections[1],
            'width of section is not changed after resizing'
        );
        expect(getAttributeByName(section + splitterSection, 'style', 2)).not.toEqual(
            defaultSizesOfSections[2],
            'width of section is not changed after resizing'
        );
    }
});
