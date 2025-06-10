import {
    click,
    elementDisplayed,
    getElementArrayLength,
    isElementClickable,
    waitForElDisplayed,
    waitForNotPresent
} from '@fundamental-ngx/e2e';
import { IllustratedMessagePo } from './illustrated-message.po';

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
});
