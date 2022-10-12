import {
    click,
    getAlertText,
    getElementArrayLength,
    getElementPlaceholder,
    getElementTitle,
    getText,
    refreshPage,
    uploadFile,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { FileUploaderPo } from './file-uploader.po';
import { imagePath, placeholderValue, titleValue } from './file-uploader.page-content';

describe('File uploader test suite', () => {
    const fileUploaderPage: FileUploaderPo = new FileUploaderPo();
    const { fileUploaderInput, fileUploaderInputFile, browseButton, fileSelectedText } = fileUploaderPage;

    beforeAll(async () => {
        await fileUploaderPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(fileUploaderPage.root);
        await waitForElDisplayed(fileUploaderPage.title);
    }, 1);

    it('Verify placeholders', async () => {
        const arrLength = await getElementArrayLength(fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            await expect(placeholderValue).toContain(await getElementPlaceholder(fileUploaderInput, i));
        }
    });

    it('Verify browser button', async () => {
        const arrLength = await getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            await click(browseButton, i);
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file upload', async () => {
        const arrLength = await getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            await uploadFile(fileUploaderInputFile, imagePath);
            await expect(imagePath).toContain(await getText(fileSelectedText, i));
            await expect(imagePath).toContain((await getElementTitle(fileUploaderInput, i)).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('Verify file uploaded message', async () => {
        const arrLength = await getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            await uploadFile(fileUploaderInputFile, imagePath, i);
            await expect(titleValue).toContain(await getAlertText());
        }
    });

    it('should check LTR and RTL orientation', async () => {
        await fileUploaderPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await fileUploaderPage.saveExampleBaselineScreenshot();
            await expect(await fileUploaderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
