import { UploadCollectionPo } from './upload-collection.po';
import {
    acceptAlert,
    browserIsSafari,
    checkElArrIsClickable,
    click,
    getAlertText,
    getAttributeByName,
    getElementArrayLength,
    getElementSize,
    getText,
    isElementClickable,
    refreshPage,
    scrollIntoView,
    setValue,
    uploadFile,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import {
    acceptAlertText,
    declineAlertText,
    formatArr,
    imagePath,
    imageText,
    testText
} from './upload-collection-contents';

describe('File uploader component test', () => {
    const uploadCollectionPage = new UploadCollectionPo();
    const {
        uploadCollectionComplexExample,
        uploadCollectionExample,
        link,
        editButton,
        input,
        okButton,
        declineButton,
        item,
        uploadCollectionSmallExample,
        uploadCollectionCustomExample,
        emphasizedButton,
        fileUploaderInputFile,
        checkbox,
        standardButton
    } = uploadCollectionPage;

    beforeAll(() => {
        uploadCollectionPage.open();
    }, 1);

    beforeEach(() => {
        refreshPage();
        waitForPresent(uploadCollectionPage.root);
        waitForElDisplayed(uploadCollectionPage.title);
    }, 2);

    describe('Should check default example', () => {
        it('should check possible click on file', () => {
            checkElArrIsClickable(uploadCollectionExample + link);
        });

        it('should check possible rename file', () => {
            checkFileNameChange(uploadCollectionExample);
        });

        it('should check possible delete file', () => {
            checkItemDecline(uploadCollectionExample);
        });
    });

    describe('Should check Small Mode example', () => {
        it('should check possible click on file', () => {
            checkElArrIsClickable(uploadCollectionSmallExample + link);
        });

        it('should check possible rename file', () => {
            checkFileNameChange(uploadCollectionSmallExample);
        });

        it('should check possible delete file', () => {
            checkItemDecline(uploadCollectionSmallExample);
        });

        it('should check small item be smaller than basic item', () => {
            const basicItem = getElementSize(uploadCollectionExample + item);
            const smallItem = getElementSize(uploadCollectionSmallExample + item);

            expect(smallItem.width).toBeLessThan(basicItem.width);
        });
    });

    describe('Should check Customization example', () => {
        it('should check possible click on file', () => {
            checkElArrIsClickable(uploadCollectionCustomExample + link);
        });

        it('should disabled buttons', () => {
            expect(getAttributeByName(uploadCollectionCustomExample + editButton, 'disabled')).toBe('true');
            expect(getAttributeByName(uploadCollectionCustomExample + declineButton, 'disabled')).toBe('true');
        });

        it('should check the editing of the file name', () => {
            scrollIntoView(uploadCollectionCustomExample);
            click(uploadCollectionCustomExample + editButton, 1);
            setValue(uploadCollectionCustomExample + input, testText);
            click(okButton);
            expect(getAlertText()).toBe(acceptAlertText);
            acceptAlert();
            expect(getText(uploadCollectionCustomExample + link, 2).trim()).toBe(testText + formatArr[2]);
        });
    });

    describe('Should check Complex example', () => {
        it('should check possible click on file', () => {
            checkElArrIsClickable(uploadCollectionComplexExample + link);
        });

        it('should check possible rename file', () => {
            checkFileNameChange(uploadCollectionComplexExample);
        });

        it('should check possible delete file', () => {
            checkItemDecline(uploadCollectionComplexExample);
        });

        xit('should check upload files', () => {
            // not working correctly on test runner
            if (browserIsSafari()) {
                return;
            }
            scrollIntoView(uploadCollectionComplexExample);
            uploadFile(fileUploaderInputFile, imagePath);
            const afterUploadItems = getElementArrayLength(uploadCollectionComplexExample + item);
            expect(afterUploadItems).toEqual(4);
            expect(getText(uploadCollectionComplexExample + link, 3).trim()).toBe(imageText);
        });

        it('should check if file download button is active', () => {
            scrollIntoView(uploadCollectionComplexExample);
            click(uploadCollectionComplexExample + checkbox);
            expect(isElementClickable(uploadCollectionComplexExample + standardButton, 1)).toBe(
                true,
                'download button not clickable'
            );
        });

        it('should check functionality delete 2 items', () => {
            scrollIntoView(uploadCollectionComplexExample);
            click(uploadCollectionComplexExample + checkbox);
            click(uploadCollectionComplexExample + checkbox, 1);
            click(uploadCollectionComplexExample + standardButton, 2);
            const afterDeleteItems = getElementArrayLength(uploadCollectionComplexExample + item);
            expect(afterDeleteItems).toEqual(1);
        });
    });

    it('should check LTR and RTL orientation', () => {
        if (browserIsSafari()) {
            return;
        }
        uploadCollectionPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', () => {
            uploadCollectionPage.saveExampleBaselineScreenshot();
            expect(uploadCollectionPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    function checkFileNameChange(example: string): void {
        scrollIntoView(example);
        for (let i = 0; i < 3; i++) {
            click(example + editButton, i);
            setValue(example + input, testText);
            click(okButton);
            expect(getAlertText()).toBe(acceptAlertText);
            acceptAlert();
            expect(getText(example + link, i).trim()).toBe(testText + formatArr[i]);
        }
    }

    function checkItemDecline(example: string): void {
        const itemsBefore = getElementArrayLength(example + declineButton);

        scrollIntoView(example);
        click(example + declineButton);

        if (example === uploadCollectionComplexExample) {
            click(emphasizedButton);
        }

        expect(getAlertText()).toBe(declineAlertText);
        acceptAlert();

        const itemCount = getElementArrayLength(example + item);
        expect(itemCount).toEqual(itemsBefore - 1);
    }
});
