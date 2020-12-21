import { webDriver } from '../../driver/wdio';
import { FileUploaderPo } from '../pages/file-uploader.po';
import { placeholderValue, titleValue, imagePath } from '../fixtures/appData/file-uploader.page-content';


describe('File uploader test suite', function() {
    const fileUploaderPO: FileUploaderPo = new FileUploaderPo();
    const { checkRtlSwitch, fileUploaderInput, browseButton, fileUploaderInputFile, fileSelectedText,
    } = new FileUploaderPo();

    beforeAll(() => {
        fileUploaderPO.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify placeholders', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            expect(placeholderValue).toContain(webDriver.getAttributeByName
            (fileUploaderInput, 'placeholder', i));
        }
    });

    it('Verify browser button', () => {
        const arrLength = webDriver.getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.click(browseButton, i);
        }
    });

    it('Verify file upload', () => {
        const arrLength = webDriver.getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.uploadFile(fileUploaderInputFile, imagePath);
            expect(imagePath).toContain(webDriver.getText(fileSelectedText, i));
            expect(imagePath).toContain(webDriver.getAttributeByName(fileUploaderInput, 'title', i).slice(1));
        }
    });

    it('Verify file uploaded message', () => {
        const arrLength = webDriver.getElementArrayLength(browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.uploadFile(fileUploaderInputFile, imagePath, i);
            expect(titleValue).toContain(webDriver.getAlertText());
        }
    });

    it('should check LTR and RTL orientation', () => {
        checkRtlSwitch();
    });

});
