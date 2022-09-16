import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementClass,
    getText,
    getValue,
    isElementDisplayed,
    refreshPage,
    setValue,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { messageTypes, playgroundStates, sections } from './message-strip.contents';
import { customMessage, customWidth } from './message-strip';
import { MessageStripPo } from './message-strip.po';

describe('Message-strip test suite', () => {
    const messageStripPage = new MessageStripPo();
    const {
        noIconExample,
        widthExample,
        messageStrip,
        dismissButton,
        playground,
        dismissibleCheckbox,
        noIconCheckbox,
        widthInput,
        messageInput,
        typeSelectionField,
        messageStripPG,
        messageStripMessage,
        resetButton,
        stateOption
    } = messageStripPage;

    beforeAll(() => {
        messageStripPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(messageStripPage.root);
        waitForElDisplayed(messageStripPage.title);
    }, 1);

    it('should check message-box status', () => {
        for (let i = 0; i < sections.length; i++) {
            checkMessageStatus(sections[i]);
        }
    });

    it('should check that message-strips in Without Icon example have no icons', () => {
        const messageLength = getElementArrayLength(noIconExample + messageStrip);
        for (let i = 0; i < messageLength; i++) {
            expect(getElementClass(noIconExample + messageStrip, i)).toContain('no-icon');
        }
    });

    it('should check dismissing message', () => {
        for (let i = 0; i < sections.length; i++) {
            checkDismissingMessage(sections[i]);
        }
        checkDismissingMessage(playground);
    });

    it('should check width property for messages in Width Example', () => {
        const messageLength = getElementArrayLength(widthExample + messageStrip);
        for (let i = 0; i < messageLength; i++) {
            expect(getAttributeByName(widthExample + messageStrip, 'style', i)).toContain('width:');
        }
    });

    it('should check orientation', () => {
        messageStripPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', () => {
        messageStripPage.saveExampleBaselineScreenshot();
        expect(messageStripPage.compareWithBaseline()).toBeLessThan(5);
    });

    describe('playground constructor test', () => {
        it('should check choosing states of message-strip', () => {
            for (let i = 0; i < playgroundStates.length; i++) {
                click(typeSelectionField);
                click(stateOption, i);
                expect(getElementClass(messageStripPG)).toContain(playgroundStates[i]);
            }
            click(resetButton);
            expect(getElementClass(messageStripPG)).toContain(playgroundStates[0]);
        });

        it('should check changing message in message-strip', () => {
            const defaultMessage = getText(messageStripMessage);
            setValue(messageInput, customMessage);
            expect(getText(messageStripMessage).trim()).toEqual(customMessage);
            click(resetButton);
            expect(getText(messageStripMessage)).toEqual(defaultMessage);
        });

        it('should check changing width of the message-strip', () => {
            const defaultWidth = getValue(widthInput);
            setValue(widthInput, customWidth);
            expect(getAttributeByName(messageStripPG, 'style')).toContain(`width: ${customWidth}`);
            click(resetButton);
            expect(getValue(widthInput)).toEqual(defaultWidth);
        });

        it('should check working dismissible mode', () => {
            click(dismissibleCheckbox);
            // checkbox is enabled by default
            expect(getElementClass(messageStripPG)).not.toContain('dismissible');
            click(resetButton);
            expect(getElementClass(messageStripPG)).toContain('dismissible');
        });

        it('should check working icon-noIcon mode', () => {
            click(noIconCheckbox);
            expect(getElementClass(messageStripPG)).toContain('no-icon');
            click(resetButton);
            expect(getElementClass(messageStripPG)).not.toContain('no-icon');
        });
    });

    function checkDismissingMessage(section: string): void {
        const messageLength = getElementArrayLength(section + messageStrip);
        let j = 0;
        for (let i = 0; i < messageLength; i++) {
            if (getElementClass(section + messageStrip, i).includes('dismissible')) {
                click(section + dismissButton, j);
                j++;
                expect(isElementDisplayed(section + messageStrip, i)).toBe(false);
            }
        }
    }

    function checkMessageStatus(section: string): void {
        const messageLength = getElementArrayLength(section + messageStrip);
        for (let i = 0; i < messageLength; i++) {
            if (i === 4) {
                for (let j = 0; j < messageTypes.length; j++) {
                    expect(getElementClass(section + messageStrip, i)).not.toContain(messageTypes[j]);
                }
                continue;
            }
            expect(getElementClass(section + messageStrip, i)).toContain(messageTypes[i]);
        }
    }
});
