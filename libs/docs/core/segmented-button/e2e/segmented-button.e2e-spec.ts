import {
    acceptAlert,
    click,
    getAttributeByName,
    getElementClass,
    getText,
    refreshPage,
    waitForElDisplayed
} from '../../../../../e2e';
import { SegmentedButtonPo } from './segmented-button.po';

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

    beforeAll(async () => {
        await segmentedButtonPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await segmentedButtonPage.waitForRoot();
        await waitForElDisplayed(segmentedButtonPage.title);
    }, 2);

    describe('Select modes', () => {
        it('should check choosing value in Default Example', async () => {
            await checkDefaultExample(secondDefaulSegment, firstDefaulSegment);
            await checkDefaultExample(firstDefaulSegment, secondDefaulSegment);
        });

        it('should check choosing value in Toogle Example', async () => {
            for (let i = 1; i < 3; i++) {
                await click(toggleExample + button, i);
                await expect(await getElementClass(toggleExample + button, i)).toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
                switch (i) {
                    case 0:
                        await expect(await getText(toggleExample + chosenValue)).toContain('first');
                        break;
                    case 1:
                        await expect(await getText(toggleExample + chosenValue)).toContain('first,second');
                        break;
                    case 2:
                        await expect(await getText(toggleExample + chosenValue)).toContain('first,second,third');
                        break;
                }
            }
            for (let i = 0; i < 3; i++) {
                await click(toggleExample + button, i);
                await expect(await getElementClass(toggleExample + button, i)).not.toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
            }
        });

        it('should check choosing value in Complex Example', async () => {
            for (let i = 0; i < 3; i++) {
                await click(complexExample + button, i);
                await acceptAlert();
                await expect(await getElementClass(complexExample + button, i)).toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
                switch (i) {
                    case 0:
                        await expect(await getText(complexExample + chosenValue)).toEqual('value: first');
                        break;
                    case 1:
                        await expect(await getText(complexExample + chosenValue)).toEqual('value: second');
                        break;
                    case 2:
                        await expect(await getText(complexExample + chosenValue)).toEqual('value: third');
                        break;
                }
            }
        });

        it('should check choosing value in Form Example', async () => {
            for (let i = 0; i < 3; i++) {
                await click(firstFormSegment + button, i);
                await expect(await getElementClass(firstFormSegment + button, i)).toContain(
                    toggled,
                    `button with index ${i} is not toggled`
                );
                switch (i) {
                    case 0:
                        await expect(
                            (
                                await getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(4)')
                            ).trim()
                        ).toEqual('Value: first');
                        break;
                    case 1:
                        await expect(
                            (
                                await getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(4)')
                            ).trim()
                        ).toEqual('Value: second');
                        break;
                    case 2:
                        await expect(
                            (
                                await getText(formExample + firstFormButtonsSection + chosenValue + ':nth-child(4)')
                            ).trim()
                        ).toEqual('Value: third');
                        break;
                }
            }
        });

        it('should check disabled form in Form Example', async () => {
            for (let i = 0; i < 3; i++) {
                await expect(
                    await getAttributeByName(formExample + secondFormButtonsSection + button, 'disabled', i)
                ).toBe('true');
            }
        });

        describe('check orientation', () => {
            it('should check RTL and LTR orientation', async () => {
                await segmentedButtonPage.checkRtlSwitch();
            });
        });
    });

    async function checkDefaultExample(mainSection: string, secondarySection): Promise<void> {
        for (let i = 0; i < 3; i++) {
            await click(mainSection + button, i);
            await expect(await getElementClass(mainSection + button, i)).toContain(
                toggled,
                `button with index ${i} is not toggled`
            );
            await expect(await getElementClass(secondarySection + button, i)).toContain(
                toggled,
                `button with index ${i} is not toggled`
            );
            switch (i) {
                case 0:
                    await expect(await getText(defaultExample + chosenValue)).toEqual('value: first');
                    break;
                case 1:
                    await expect(await getText(defaultExample + chosenValue)).toEqual('value: second');
                    break;
                case 2:
                    await expect(await getText(defaultExample + chosenValue)).toEqual('value: third');
                    break;
            }
        }
    }
});
