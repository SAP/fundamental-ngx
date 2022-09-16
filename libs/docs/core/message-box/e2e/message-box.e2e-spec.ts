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

    beforeAll(() => {
        messageBoxPage.open();
    }, 1);

    describe('Object based example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(basedObjectExample);
        });
        it('Should check accepting message-box', () => {
            checkAcceptingMessage(basedObjectExample);
        });
        it('Should check working of message-boxes', () => {
            checkDismissingMessage(basedObjectExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(basedObjectExample);
        });
    });

    describe('Template message box example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(openTemplateExample);
        });
        it('Should check accepting message-box', () => {
            checkAcceptingMessage(openTemplateExample);
        });
        it('Should check working of message-boxes', () => {
            checkDismissingMessage(openTemplateExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(openTemplateExample);
        });
    });

    describe('Component based message box example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(basedComponentExample);
        });
        it('Should check accepting message-box', () => {
            checkAcceptingMessage(basedComponentExample);
        });
        it('Should check working of message-boxes', () => {
            checkDismissingMessage(basedComponentExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(basedComponentExample);
        });
    });

    describe('Semantic types example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(sematicTypesExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(sematicTypesExample);
        });
        it('Should check message & button types', () => {
            const buttonsLength = getElementArrayLength(sematicTypesExample + button);
            for (let i = 0; i < buttonsLength; i++) {
                expect(getElementClass(sematicTypesExample + button, i)).toContain(
                    buttonClassArr[i],
                    `Element type is not ${buttonClassArr[i]}`
                );
                click(sematicTypesExample + button, i);
                i === buttonsLength - 1
                    ? expect(doesItExist(messageIcon)).toBe(false, 'Icon exists')
                    : expect(getElementClass(messageIcon)).toContain(iconsArr[i], `Icon is not ${iconsArr[i]}`);
                click(okButton);
            }
        });
    });

    describe('Position example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(positionExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(positionExample);
        });
    });

    describe('Mobile example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(mobileExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(mobileExample);
        });
    });

    describe('Complex template example', () => {
        it('Should check working of message-boxes', () => {
            checkMessageBoxWorking(complexTemplateExample);
        });
        it('should check losing message box by escape button', () => {
            checkClosingMessageBoxByPressEscape(complexTemplateExample);
        });
    });

    it('should check orientation', () => {
        messageBoxPage.checkRtlSwitch();
    });

    xdescribe('visual regression', () => {
        it('should check examples visual regression', () => {
            refreshPage();
            waitForElDisplayed(messageBoxPage.title);
            messageBoxPage.saveExampleBaselineScreenshot();
            expect(messageBoxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkClosingMessageBoxByPressEscape(section: string): void {
        scrollIntoView(section);
        click(section + button);
        waitForElDisplayed(messageBox);
        sendKeys('Escape');

        expect(doesItExist(messageBox)).toBe(false);
        refreshPage();
    }

    function checkMessageBoxWorking(section: string): void {
        const elementLength = getElementArrayLength(section + button);
        for (let i = 0; i < elementLength; i++) {
            click(section + button, i);
            expect(isElementDisplayed(messageBox)).toBe(true, 'Message-Box is not displayed');
            click(okButton);
            expect(doesItExist(messageBox)).toBe(false, 'Message-Box still displayed');
        }
    }

    function checkAcceptingMessage(section: string): void {
        click(section + button);
        click(okButton);
        section === basedObjectExample
            ? expect(getText(section + resultTxt)).toContain('Approved', 'Result is not OK')
            : expect(getText(section + resultTxt)).toContain('Ok', 'Result is not OK');
    }
    function checkDismissingMessage(section: string): void {
        click(section + button);
        click(cancelButton);
        section === basedObjectExample
            ? expect(getText(section + resultTxt)).toContain('Canceled', 'Result is not Canceled')
            : expect(getText(section + resultTxt)).toContain('Cancel', 'Result is not Cancel');
    }
});
