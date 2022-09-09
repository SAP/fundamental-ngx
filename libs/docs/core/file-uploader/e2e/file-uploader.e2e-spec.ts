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

    beforeAll(() => {
        fileUploaderPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(fileUploaderPage.root);
        waitForElDisplayed(fileUploaderPage.title);
    }, 2);

    it('verify placeholders', () => {
        const arrLength = getElementArrayLength(fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            scrollIntoView(fileUploaderInput, i);
            expect(getAttributeByName(fileUploaderInput, 'placeholder', i)).toBe(placeholderTestTextArr[i]);
        }
    });

    it('verify browser button', () => {
        let arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            scrollIntoView(browseButton, i);
            expect(isElementClickable(browseButton, i)).toBe(true, `browse button with index ${i} is clickable`);
        }

        arrLength = getElementArrayLength(browseButtonDisabled);
        for (let i = 0; i < arrLength; i++) {
            scrollIntoView(browseButtonDisabled, i);
            expect(isElementClickable(browseButtonDisabled, i)).toBe(
                false,
                `browse button with index ${i} is not clickable`
            );
        }
    });

    it('verify compact input smaller than basic', () => {
        const basicInput = getElementSize(fileUploaderExample + fileUploaderInput);
        const compactInput = getElementSize(fileUploaderCompactExample + fileUploaderInput);

        expect(compactInput.width).toBeLessThan(basicInput.width);
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('verify file upload', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderInputFile, imagePath, i);
            expect(imagePath).toContain(getText(fileSelectedText, i));
            expect(imagePath).toContain(getAttributeByName(fileUploaderInput, 'title', i).slice(1));
        }
    });

    // skipped due to issue with file uploader - browser is stuck after uploading file
    xit('verify file uploaded message', () => {
        const arrLength = getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            uploadFile(fileUploaderInputFile, imagePath, i);
            expect(titleValue).toContain(getAlertText());
        }
    });

    it('should check RTL and LTR orientation', () => {
        fileUploaderPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            fileUploaderPage.saveExampleBaselineScreenshot();
            expect(fileUploaderPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
