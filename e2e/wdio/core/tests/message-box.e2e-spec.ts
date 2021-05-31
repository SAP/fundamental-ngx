import { MessageBoxPo } from '../pages/message-box.po';
import {
    click,
    doesItExist,
    getElementArrayLength,
    getElementClass,
    getText,
    isElementDisplayed
} from '../../driver/wdio';
import {
    iconsArr, buttonClassArr, sectionsArr
} from '../fixtures/appData/message-box'

describe('Message-box test suits', function () {
    const messageBoxPage = new MessageBoxPo();
    const {
        resultTxt, mobileExample, positionExample, messageBoxExample, basedObjectExample, openTemplateExample,
        sematicTypesExample, basedComponentExample, complexTemplateExample, button, okButton, cancelButton, messageBox,
        messageIcon
    } = messageBoxPage;

    beforeAll(() => {
        messageBoxPage.open();
    }, 1);

    it('Should check working of message-boxes', () => {
        for (let i = 0; i < sectionsArr.length; i++) {
            checkMessageBoxWorking(sectionsArr[i])
        }
    })

    it('Should check status after closing message-box', () => {
        checkAcceptingMessage(basedObjectExample);
        checkDismissingMessage(basedObjectExample);
        checkAcceptingMessage(openTemplateExample);
        checkDismissingMessage(openTemplateExample);
        checkAcceptingMessage(basedComponentExample);
        checkDismissingMessage(basedComponentExample);
    })

    it('Should check message & button types', () => {
        const buttonsLength = getElementArrayLength(sematicTypesExample + button)
        for (let i = 0; i < buttonsLength; i++) {
            expect(getElementClass(sematicTypesExample + button, i)).toContain(buttonClassArr[i], `Element type is not ${buttonClassArr[i]}`)
            click(sematicTypesExample + button, i)
            i === buttonsLength - 1 ? expect(doesItExist(messageIcon)).toBe(false, 'Icon exists') : expect(getElementClass(messageIcon)).toContain(iconsArr[i], `Icon is not ${iconsArr[i]}`)
            click(okButton)
        }
    })

    it('should check orientation', () => {
        messageBoxPage.checkRtlSwitch();
    });

    describe('visual regression', function () {
        it('should check examples visual regression', () => {
            messageBoxPage.saveExampleBaselineScreenshot();
            expect(messageBoxPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkMessageBoxWorking(section: string): void {
        const elementLength = getElementArrayLength(section + button);
        for (let i = 0; i < elementLength; i++) {
            click(section + button, i);
            expect(isElementDisplayed(messageBox)).toBe(true, 'Message-Box is not displayed')
            click(okButton)
            expect(doesItExist(messageBox)).toBe(false, 'Message-Box still displayed')
        }
    }

    function checkAcceptingMessage(section: string): void {
        click(section + button);
        click(okButton);
        section === basedObjectExample ? expect(getText(section + resultTxt)).toContain('Approved', 'Result is not OK') : expect(getText(section + resultTxt)).toContain('Ok', 'Result is not OK')

    }
    function checkDismissingMessage(section: string): void {
        click(section + button);
        click(cancelButton);
        section === basedObjectExample ? expect(getText(section + resultTxt)).toContain('Canceled', 'Result is not Canceled') : expect(getText(section + resultTxt)).toContain('Cancel', 'Result is not Cancel')
    }

});
