import { FileUploaderPo } from './file-uploader.po';
import {
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getElementSize,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    uploadFile,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';

import { imagePath, placeholderTestTextArr, titleValue } from './file-uploader-contents';

describe('File uploader component test', () => {
    const fileUploaderPage = new FileUploaderPo();
    const {
        fileUploaderInput,
        browseButton,
        browseButtonDisabled,
        fileUploaderInputFile,
        fileSelectedText,
        fileUploaderExample,
        fileUploaderCompactExample
    } = fileUploaderPage;

    beforeAll(async () => {
        await fileUploaderPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(fileUploaderPage.root);
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

    it('verify compact input smaller than basic', async () => {
        const basicInput = await getElementSize(fileUploaderExample + fileUploaderInput);
        const compactInput = await getElementSize(fileUploaderCompactExample + fileUploaderInput);

        await expect(compactInput.width).toBeLessThan(basicInput.width);
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('verify file upload', async () => {
        const arrLength = await getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            await uploadFile(fileUploaderInputFile, imagePath, i);
            await expect(imagePath).toContain(await getText(fileSelectedText, i));
            await expect(imagePath).toContain((await getAttributeByName(fileUploaderInput, 'title', i)).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('verify file uploaded message', async () => {
        const arrLength = await getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            await uploadFile(fileUploaderInputFile, imagePath, i);
            await expect(titleValue).toContain(await getAlertText());
        }
    });

    it('should check RTL and LTR orientation', async () => {
        await fileUploaderPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await fileUploaderPage.saveExampleBaselineScreenshot();
            await expect(await fileUploaderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
