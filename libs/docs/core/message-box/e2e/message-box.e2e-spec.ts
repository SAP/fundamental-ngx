import { MessageBoxPo } from './message-box.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed
} from '../../../../../e2e';
import { buttonClassArr, iconsArr } from './message-box';

describe('Message-box test suits', () => {
    const messageBoxPage = new MessageBoxPo();
    const {
        resultTxt,
        mobileExample,
        positionExample,
        basedObjectExample,
        openTemplateExample,
        sematicTypesExample,
        basedComponentExample,
        complexTemplateExample,
        button,
        okButton,
        cancelButton,
        messageBox,
        messageIcon
    } = messageBoxPage;

    beforeAll(async () => {
        await messageBoxPage.open();
    }, 1);

    describe('Object based example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(basedObjectExample);
        });
        it('Should check accepting message-box', async () => {
            await checkAcceptingMessage(basedObjectExample);
        });
        it('Should check working of message-boxes', async () => {
            await checkDismissingMessage(basedObjectExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(basedObjectExample);
        });
    });

    describe('Template message box example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(openTemplateExample);
        });
        it('Should check accepting message-box', async () => {
            await checkAcceptingMessage(openTemplateExample);
        });
        it('Should check working of message-boxes', async () => {
            await checkDismissingMessage(openTemplateExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(openTemplateExample);
        });
    });

    describe('Component based message box example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(basedComponentExample);
        });
        it('Should check accepting message-box', async () => {
            await checkAcceptingMessage(basedComponentExample);
        });
        it('Should check working of message-boxes', async () => {
            await checkDismissingMessage(basedComponentExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(basedComponentExample);
        });
    });

    describe('Semantic types example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(sematicTypesExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(sematicTypesExample);
        });
        it('Should check message & button types', async () => {
            const buttonsLength = await getElementArrayLength(sematicTypesExample + button);
            for (let i = 0; i < buttonsLength; i++) {
                await expect(await getElementClass(sematicTypesExample + button, i)).toContain(
                    buttonClassArr[i],
                    `Element type is not ${buttonClassArr[i]}`
                );
                await click(sematicTypesExample + button, i);
                i === buttonsLength - 1
                    ? await expect(await doesItExist(messageIcon)).toBe(false, 'Icon exists')
                    : await expect(await getElementClass(messageIcon)).toContain(
                          iconsArr[i],
                          `Icon is not ${iconsArr[i]}`
                      );
                await click(okButton);
            }
        });
    });

    describe('Position example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(positionExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(positionExample);
        });
    });

    describe('Mobile example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(mobileExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(mobileExample);
        });
    });

    describe('Complex template example', () => {
        it('Should check working of message-boxes', async () => {
            await checkMessageBoxWorking(complexTemplateExample);
        });
        it('should check losing message box by escape button', async () => {
            await checkClosingMessageBoxByPressEscape(complexTemplateExample);
        });
    });

    it('should check orientation', async () => {
        await messageBoxPage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check examples visual regression', async () => {
            await refreshPage();
            await waitForElDisplayed(messageBoxPage.title);
            await messageBoxPage.saveExampleBaselineScreenshot();
            await expect(await messageBoxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkClosingMessageBoxByPressEscape(section: string): Promise<void> {
        await scrollIntoView(section);
        await click(section + button);
        await waitForElDisplayed(messageBox);
        await sendKeys('Escape');

        await expect(await doesItExist(messageBox)).toBe(false);
        await refreshPage();
    }

    async function checkMessageBoxWorking(section: string): Promise<void> {
        const elementLength = await getElementArrayLength(section + button);
        for (let i = 0; i < elementLength; i++) {
            await click(section + button, i);
            await expect(await isElementDisplayed(messageBox)).toBe(true, 'Message-Box is not displayed');
            await click(okButton);
            await expect(await doesItExist(messageBox)).toBe(false, 'Message-Box still displayed');
        }
    }

    async function checkAcceptingMessage(section: string): Promise<void> {
        await click(section + button);
        await click(okButton);
        section === basedObjectExample
            ? await expect(await getText(section + resultTxt)).toContain('Approved', 'Result is not OK')
            : await expect(await getText(section + resultTxt)).toContain('Ok', 'Result is not OK');
    }
    async function checkDismissingMessage(section: string): Promise<void> {
        await click(section + button);
        await click(cancelButton);
        section === basedObjectExample
            ? await expect(await getText(section + resultTxt)).toContain('Canceled', 'Result is not Canceled')
            : await expect(await getText(section + resultTxt)).toContain('Cancel', 'Result is not Cancel');
    }
});
