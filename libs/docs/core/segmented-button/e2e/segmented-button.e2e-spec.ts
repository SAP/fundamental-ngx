import { SegmentedButtonPo } from './segmented-button.po';
import {
    acceptAlert,
    click,
    getAttributeByName,
    getElementClass,
    getText,
    refreshPage,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

describe('Select component:', () => {
    const segmentedButtonPage = new SegmentedButtonPo();
    const {
        toggleExample,
        defaultExample,
        complexExample,
        formExample,
        button,
        firstDefaulSegment,
        secondDefaulSegment,
        firstFormSegment,
        firstFormButtonsSection,
        secondFormButtonsSection,
        toggled,
        chosenValue
    } = segmentedButtonPage;

    beforeAll(() => {
        segmentedButtonPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(segmentedButtonPage.root);
        waitForElDisplayed(segmentedButtonPage.title);
    }, 2);

    describe('Select modes', () => {
        it('should check choosing value in Default Example', () => {
            checkDefaultExample(secondDefaulSegment, firstDefaulSegment);
            checkDefaultExample(firstDefaulSegment, secondDefaulSegment);
        });

        it('should check choosing value in Toogle Example', () => {
            for (let i = 1; i < 3; i++) {
                click(toggleExample + button, i);
                expect(getElementClass(toggleExample + button, i)).toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
                switch (i) {
                    case 0:
                        expect(getText(toggleExample + chosenValue)).toContain('first');
                        break;
                    case 1:
                        expect(getText(toggleExample + chosenValue)).toContain('first,second');
                        break;
                    case 2:
                        expect(getText(toggleExample + chosenValue)).toContain('first,second,third');
                        break;
                }
            }
            for (let i = 0; i < 3; i++) {
                click(toggleExample + button, i);
                expect(getElementClass(toggleExample + button, i)).not.toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
            }
        });

        it('should check choosing value in Complex Example', () => {
            for (let i = 0; i < 3; i++) {
                click(complexExample + button, i);
                acceptAlert();
                expect(getElementClass(complexExample + button, i)).toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
                switch (i) {
                    case 0:
                        expect(getText(complexExample + chosenValue)).toEqual('value: first');
                        break;
                    case 1:
                        expect(getText(complexExample + chosenValue)).toEqual('value: second');
                        break;
                    case 2:
                        expect(getText(complexExample + chosenValue)).toEqual('value: third');
                        break;
                }
            }
        });

        it('should check choosing value in Form Example', () => {
            for (let i = 0; i < 3; i++) {
                click(firstFormSegment + button, i);
                expect(getElementClass(firstFormSegment + button, i)).toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
                switch (i) {
                    case 0:
                        expect(
                            getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(4)').trim()
                        ).toEqual('Value: first');
                        break;
                    case 1:
                        expect(
                            getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(4)').trim()
                        ).toEqual('Value: second');
                        break;
                    case 2:
                        expect(
                            getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(4)').trim()
                        ).toEqual('Value: third');
                        break;
                }
            }
        });

        it('should check disabled form in Form Example', () => {
            for (let i = 0; i < 3; i++) {
                expect(getAttributeByName(formExample + secondFormButtonsSection + button, 'disabled', i)).toBe('true');
            }
        });

        it('should check touched status in Form Example', () => {
            expect(getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(8)').trim()).toEqual(
                'Touched: false'
            );
            expect(getElementClass(firstFormSegment)).toContain('ng-untouched');
            click(firstFormSegment + button);
            expect(getElementClass(firstFormSegment)).not.toContain('ng-untouched');
            expect(getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(8)').trim()).toEqual(
                'Touched: true'
            );
        });

        describe('check orientation', () => {
            it('should check RTL and LTR orientation', () => {
                segmentedButtonPage.checkRtlSwitch();
            });
        });

        xdescribe('Check visual regression', () => {
            it('should check examples visual regression', () => {
                segmentedButtonPage.saveExampleBaselineScreenshot();
                expect(segmentedButtonPage.compareWithBaseline()).toBeLessThan(5);
            });
        });
    });

    function checkDefaultExample(mainSection: string, secondarySection): void {
        for (let i = 0; i < 3; i++) {
            click(mainSection + button, i);
            expect(getElementClass(mainSection + button, i)).toContain(
                toggled,
                `button with index ${i} is not toggled`
            );
            expect(getElementClass(secondarySection + button, i)).toContain(
                toggled,
                `button with index ${i} is not toggled`
            );
            switch (i) {
                case 0:
                    expect(getText(defaultExample + chosenValue)).toEqual('value: first');
                    break;
                case 1:
                    expect(getText(defaultExample + chosenValue)).toEqual('value: second');
                    break;
                case 2:
                    expect(getText(defaultExample + chosenValue)).toEqual('value: third');
                    break;
            }
        }
    }
});
