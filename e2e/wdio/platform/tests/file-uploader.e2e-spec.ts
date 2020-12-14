import { webDriver } from '../../driver/wdio';
import { FileUploaderPo } from '../pages/file-uploader.po';
import {placeholderValue, imagePath} from '../fixtures/appData/file-uploader.page-content';
import { BaseComponentPo } from '../pages/base-component.po';


describe('File uploader test suite', function () {
    const fileUploader = new FileUploaderPo();
    const BaseComponent = new BaseComponentPo();

    beforeAll(() => {
        fileUploader.open();
    });

    afterEach(() => {
        webDriver.refreshPage();
    });

    it('Verify placeholders', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploader.fileUploaderInput);
        for (let i = 0; i < arrLength; i++) {
            expect(placeholderValue).toContain(webDriver.getAttributeByName
            (fileUploader.fileUploaderInput, 'placeholder', i));
        }
    });

    it('Verify browser button', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploader.browseButton);
        for (let i = 0; i < arrLength; i++) {
            webDriver.click(fileUploader.browseButton, i);
        }
    })

    it('Verify file upload', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploader.browseButton) - 1;
        for (let i = 0; i < arrLength; i++) {
            webDriver.uploadFile(fileUploader.fileUploaderInputFile, imagePath, i);
            expect(imagePath).toContain(webDriver.getText(fileUploader.fileSelectedText, i))
            expect(imagePath).toContain(webDriver.getAttributeByName(fileUploader.fileUploaderInput, 'title', i).slice(1))
        }
    })

    it('Verify file uploaded message', () => {
        const arrLength = webDriver.getElementArrayLength(fileUploader.browseButton) - 1;
        for (let i = 0; i < arrLength; i++) {
            webDriver.uploadFile(fileUploader.fileUploaderInputFile, imagePath, i);
            expect(webDriver.getAlertText()).toContain('file uploaded');
        }
    })

    it('should check LTR and RTL orientation', () => {
        BaseComponent.checkRtlSwitch();
    })

});
