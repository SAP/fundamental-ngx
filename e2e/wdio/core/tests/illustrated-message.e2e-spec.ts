import { IllustratedMessagePo } from '../pages/illustrated-message.po';
import {
    checkElementScreenshot,
    click,
    isElementClickable,
    elementDisplayed,
    doesItExist,
    getElementArrayLength,
    waitForElDisplayed, saveElementScreenshot
} from '../../driver/wdio';

describe('Illustrated-message test suite', function() {
    const illustratedMessagePage = new IllustratedMessagePo();
    const {
        sceneAndSpotButtons,
        buttonDialog,
        dialogPopup,
        closePopupSignButton,
        closePopupButton
    } = illustratedMessagePage;

    beforeAll(() => {
        illustratedMessagePage.open();
    }, 1);

    describe('check dialog example', function() {
        it('should open dialog popup illustrated message', () => {
            click(buttonDialog);
            waitForElDisplayed(dialogPopup);
            expect(elementDisplayed(dialogPopup)).toBe(true, 'dialog not displayed');
        });

        it('should check visual regression dialog popup illustrated message', () => {
            saveElementScreenshot(dialogPopup, 'dialogPopup', illustratedMessagePage.getScreenshotFolder());
            expect(checkElementScreenshot(dialogPopup, 'dialogPopup', illustratedMessagePage.getScreenshotFolder()))
                .toBeLessThan(5, 'the dialogPopup didnt match the baseline screenshot');
        });

        it('should close dialog popup illustrated message by click on "Close sign X" button', () => {
            click(closePopupSignButton);
            expect(doesItExist(dialogPopup)).toBe(false, 'dialog was not closed by clicking on X');
        });

        it('should close dialog popup illustrated message by click on "Close" button', () => {
            click(buttonDialog);
            click(closePopupButton);
            expect(doesItExist(dialogPopup)).toBe(false, 'dialog was not closed by clicking close');
        });
    });

    describe('Basic checks', function() {
        it('should check is button clickable', () => {
            const buttonsArrLength = getElementArrayLength(sceneAndSpotButtons);
            for (let i = 0; buttonsArrLength > i; i++) {
                expect(isElementClickable(sceneAndSpotButtons, i)).toBe(true, `Button ${i} is not clickable`);
            }
        });

        it('should check RTL and LTR orientation', () => {
            illustratedMessagePage.checkRtlSwitch();
        });
    });

    xdescribe('visual regression', function() {
        it('should check visual regression for all examples', () => {
            illustratedMessagePage.saveExampleBaselineScreenshot();
            expect(illustratedMessagePage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});

