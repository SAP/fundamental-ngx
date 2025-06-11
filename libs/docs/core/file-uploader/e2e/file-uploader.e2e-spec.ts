import {
    getAttributeByName,
    getElementArrayLength,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed
} from '@fundamental-ngx/e2e';
import { FileUploaderPo } from './file-uploader.po';

import { placeholderTestTextArr } from './file-uploader-contents';

describe('File uploader component test', () => {
    const fileUploaderPage = new FileUploaderPo();
    const { fileUploaderInput, browseButton, browseButtonDisabled } = fileUploaderPage;

    beforeAll(async () => {
        await fileUploaderPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await fileUploaderPage.waitForRoot();
        await waitForElDisplayed(fileUploaderPage.title);
    }, 2);

    it('verify placeholders', async () => {
        const arrLength = await getElementArrayLength(fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            await scrollIntoView(fileUploaderInput, i);
            await expect(await getAttributeByName(fileUploaderInput, 'placeholder', i)).toBe(placeholderTestTextArr[i]);
        }
    });

    it('verify browser button', async () => {
        let arrLength = await getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            await scrollIntoView(browseButton, i);
            await expect(await isElementClickable(browseButton, i)).toBe(
                true,
                `browse button with index ${i} is clickable`
            );
        }

        arrLength = await getElementArrayLength(browseButtonDisabled);
        for (let i = 0; i < arrLength; i++) {
            await scrollIntoView(browseButtonDisabled, i);
            await expect(await isElementClickable(browseButtonDisabled, i)).toBe(
                false,
                `browse button with index ${i} is not clickable`
            );
        }
    });

    it('should check RTL and LTR orientation', async () => {
        await fileUploaderPage.checkRtlSwitch();
    });
});
