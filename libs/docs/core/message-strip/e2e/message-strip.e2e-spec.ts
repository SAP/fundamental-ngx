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

    beforeAll(async () => {
        await messageStripPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(messageStripPage.root);
        await waitForElDisplayed(messageStripPage.title);
    }, 1);

    it('should check message-box status', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkMessageStatus(sections[i]);
        }
    });

    it('should check that message-strips in Without Icon example have no icons', async () => {
        const messageLength = await getElementArrayLength(noIconExample + messageStrip);
        for (let i = 0; i < messageLength; i++) {
            await expect(await getElementClass(noIconExample + messageStrip, i)).toContain('no-icon');
        }
    });

    it('should check dismissing message', async () => {
        for (let i = 0; i < sections.length; i++) {
            await checkDismissingMessage(sections[i]);
        }
        await checkDismissingMessage(playground);
    });

    it('should check width property for messages in Width Example', async () => {
        const messageLength = await getElementArrayLength(widthExample + messageStrip);
        for (let i = 0; i < messageLength; i++) {
            await expect(await getAttributeByName(widthExample + messageStrip, 'style', i)).toContain('width:');
        }
    });

    it('should check orientation', async () => {
        await messageStripPage.checkRtlSwitch();
    });

    xit('should check examples visual regression', async () => {
        await messageStripPage.saveExampleBaselineScreenshot();
        await expect(await messageStripPage.compareWithBaseline()).toBeLessThan(5);
    });

    describe('playground constructor test', () => {
        it('should check choosing states of message-strip', async () => {
            for (let i = 0; i < playgroundStates.length; i++) {
                await click(typeSelectionField);
                await click(stateOption, i);
                await expect(await getElementClass(messageStripPG)).toContain(playgroundStates[i]);
            }
            await click(resetButton);
            await expect(await getElementClass(messageStripPG)).toContain(playgroundStates[0]);
        });

        it('should check changing message in message-strip', async () => {
            const defaultMessage = await getText(messageStripMessage);
            await setValue(messageInput, customMessage);
            await expect((await getText(messageStripMessage)).trim()).toEqual(customMessage);
            await click(resetButton);
            await expect(await getText(messageStripMessage)).toEqual(defaultMessage);
        });

        it('should check changing width of the message-strip', async () => {
            const defaultWidth = await getValue(widthInput);
            await setValue(widthInput, customWidth);
            await expect(await getAttributeByName(messageStripPG, 'style')).toContain(`width: ${customWidth}`);
            await click(resetButton);
            await expect(await getValue(widthInput)).toEqual(defaultWidth);
        });

        it('should check working dismissible mode', async () => {
            await click(dismissibleCheckbox);
            // checkbox is enabled by default
            await expect(await getElementClass(messageStripPG)).not.toContain('dismissible');
            await click(resetButton);
            await expect(await getElementClass(messageStripPG)).toContain('dismissible');
        });

        it('should check working icon-noIcon mode', async () => {
            await click(noIconCheckbox);
            await expect(await getElementClass(messageStripPG)).toContain('no-icon');
            await click(resetButton);
            await expect(await getElementClass(messageStripPG)).not.toContain('no-icon');
        });
    });

    async function checkDismissingMessage(section: string): Promise<void> {
        const messageLength = await getElementArrayLength(section + messageStrip);
        let j = 0;
        for (let i = 0; i < messageLength; i++) {
            if ((await getElementClass(section + messageStrip, i)).includes('dismissible')) {
                await click(section + dismissButton, j);
                j++;
                await expect(await isElementDisplayed(section + messageStrip, i)).toBe(false);
            }
        }
    }

    async function checkMessageStatus(section: string): Promise<void> {
        const messageLength = await getElementArrayLength(section + messageStrip);
        for (let i = 0; i < messageLength; i++) {
            if (i === 4) {
                for (let j = 0; j < messageTypes.length; j++) {
                    await expect(await getElementClass(section + messageStrip, i)).not.toContain(messageTypes[j]);
                }
                continue;
            }
            await expect(await getElementClass(section + messageStrip, i)).toContain(messageTypes[i]);
        }
    }
});
