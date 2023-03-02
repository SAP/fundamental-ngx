import { IllustratedMessagePo } from './illustrated-message.po';
import {
    checkElementScreenshot,
    click,
    doesItExist,
    elementDisplayed,
    getElementArrayLength,
    isElementClickable,
    saveElementScreenshot,
    waitForElDisplayed,
    waitForNotPresent
} from '../../../../../e2e';

describe('Illustrated-message test suite', () => {
    const illustratedMessagePage = new IllustratedMessagePo();
    const { sceneAndSpotButtons, buttonDialog, dialogPopup, closePopupSignButton, closePopupButton } =
        illustratedMessagePage;

    beforeAll(async () => {
        await illustratedMessagePage.open();
    }, 1);

    describe('check dialog example', () => {
        it('should open dialog popup illustrated message', async () => {
            await click(buttonDialog);
            await waitForElDisplayed(dialogPopup);
            await expect(await elementDisplayed(dialogPopup)).toBe(true, 'dialog not displayed');
        });

        xit('should check visual regression dialog popup illustrated message', async () => {
            await saveElementScreenshot(dialogPopup, 'dialogPopup', await illustratedMessagePage.getScreenshotFolder());
            await expect(
                await checkElementScreenshot(
                    dialogPopup,
                    'dialogPopup',
                    await illustratedMessagePage.getScreenshotFolder()
                )
            ).toBeLessThan(5, 'the dialogPopup didnt match the baseline screenshot');
        });

        it('should close dialog popup illustrated message by click on "Close sign X" button', async () => {
            await click(closePopupSignButton);
            await expect(await waitForNotPresent(dialogPopup)).toBe(true, 'dialog was not closed by clicking on X');
        });

        it('should close dialog popup illustrated message by click on "Close" button', async () => {
            await click(buttonDialog);
            await click(closePopupButton);
            await expect(await waitForNotPresent(dialogPopup)).toBe(true, 'dialog was not closed by clicking close');
        });
    });

    describe('Basic checks', () => {
        it('should check is button clickable', async () => {
            const buttonsArrLength = await getElementArrayLength(sceneAndSpotButtons);
            for (let i = 0; buttonsArrLength > i; i++) {
                await expect(await isElementClickable(sceneAndSpotButtons, i)).toBe(
                    true,
                    `Button ${i} is not clickable`
                );
            }
        });

        it('should check RTL and LTR orientation', async () => {
            await illustratedMessagePage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await illustratedMessagePage.saveExampleBaselineScreenshot();
            await expect(await illustratedMessagePage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
