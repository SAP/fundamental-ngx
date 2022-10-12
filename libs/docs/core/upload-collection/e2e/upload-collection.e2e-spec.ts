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

    beforeAll(async () => {
        await uploadCollectionPage.open();
    }, 1);

    beforeEach(async () => {
        await refreshPage();
        await waitForPresent(uploadCollectionPage.root);
        await waitForElDisplayed(uploadCollectionPage.title);
    }, 2);

    describe('Should check default example', () => {
        it('should check possible click on file', async () => {
            await checkElArrIsClickable(uploadCollectionExample + link);
        });

        it('should check possible rename file', async () => {
            await checkFileNameChange(uploadCollectionExample);
        });

        it('should check possible delete file', async () => {
            await checkItemDecline(uploadCollectionExample);
        });
    });

    describe('Should check Small Mode example', () => {
        it('should check possible click on file', async () => {
            await checkElArrIsClickable(uploadCollectionSmallExample + link);
        });

        it('should check possible rename file', async () => {
            await checkFileNameChange(uploadCollectionSmallExample);
        });

        it('should check possible delete file', async () => {
            await checkItemDecline(uploadCollectionSmallExample);
        });

        it('should check small item be smaller than basic item', async () => {
            const basicItem = await getElementSize(uploadCollectionExample + item);
            const smallItem = await getElementSize(uploadCollectionSmallExample + item);

            await expect(smallItem.width).toBeLessThan(basicItem.width);
        });
    });

    describe('Should check Customization example', () => {
        it('should check possible click on file', async () => {
            await checkElArrIsClickable(uploadCollectionCustomExample + link);
        });

        it('should disabled buttons', async () => {
            await expect(await getAttributeByName(uploadCollectionCustomExample + editButton, 'disabled')).toBe('true');
            await expect(await getAttributeByName(uploadCollectionCustomExample + declineButton, 'disabled')).toBe(
                'true'
            );
        });

        it('should check the editing of the file name', async () => {
            await scrollIntoView(uploadCollectionCustomExample);
            await click(uploadCollectionCustomExample + editButton, 1);
            await setValue(uploadCollectionCustomExample + input, testText);
            await click(okButton);
            await expect(await getAlertText()).toBe(acceptAlertText);
            await acceptAlert();
            await expect((await getText(uploadCollectionCustomExample + link, 2)).trim()).toBe(testText + formatArr[2]);
        });
    });

    describe('Should check Complex example', () => {
        it('should check possible click on file', async () => {
            await checkElArrIsClickable(uploadCollectionComplexExample + link);
        });

        it('should check possible rename file', async () => {
            await checkFileNameChange(uploadCollectionComplexExample);
        });

        it('should check possible delete file', async () => {
            await checkItemDecline(uploadCollectionComplexExample);
        });

        xit('should check upload files', async () => {
            // not working correctly on test runner
            if (await browserIsSafari()) {
                return;
            }
            await scrollIntoView(uploadCollectionComplexExample);
            await uploadFile(fileUploaderInputFile, imagePath);
            const afterUploadItems = await getElementArrayLength(uploadCollectionComplexExample + item);
            await expect(afterUploadItems).toEqual(4);
            await expect((await getText(uploadCollectionComplexExample + link, 3)).trim()).toBe(imageText);
        });

        it('should check if file download button is active', async () => {
            await scrollIntoView(uploadCollectionComplexExample);
            await click(uploadCollectionComplexExample + checkbox);
            await expect(await isElementClickable(uploadCollectionComplexExample + standardButton, 1)).toBe(
                true,
                'download button not clickable'
            );
        });

        it('should check functionality delete 2 items', async () => {
            await scrollIntoView(uploadCollectionComplexExample);
            await click(uploadCollectionComplexExample + checkbox);
            await click(uploadCollectionComplexExample + checkbox, 1);
            await click(uploadCollectionComplexExample + standardButton, 2);
            const afterDeleteItems = await getElementArrayLength(uploadCollectionComplexExample + item);
            await expect(afterDeleteItems).toEqual(1);
        });
    });

    it('should check LTR and RTL orientation', async () => {
        if (await browserIsSafari()) {
            return;
        }
        await uploadCollectionPage.checkRtlSwitch();
    });

    xdescribe('Should check visual regression', () => {
        it('should check visual regression for all examples', async () => {
            await uploadCollectionPage.saveExampleBaselineScreenshot();
            await expect(await uploadCollectionPage.compareWithBaseline()).toBeLessThan(5);
        });
    });

    async function checkFileNameChange(example: string): Promise<void> {
        await scrollIntoView(example);
        for (let i = 0; i < 3; i++) {
            await click(example + editButton, i);
            await setValue(example + input, testText);
            await click(okButton);
            await expect(await getAlertText()).toBe(acceptAlertText);
            await acceptAlert();
            await expect((await getText(example + link, i)).trim()).toBe(testText + formatArr[i]);
        }
    }

    async function checkItemDecline(example: string): Promise<void> {
        const itemsBefore = await getElementArrayLength(example + declineButton);

        await scrollIntoView(example);
        await click(example + declineButton);

        if (example === uploadCollectionComplexExample) {
            await click(emphasizedButton);
        }

        await expect(await getAlertText()).toBe(declineAlertText);
        await acceptAlert();

        const itemCount = await getElementArrayLength(example + item);
        await expect(itemCount).toEqual(itemsBefore - 1);
    }
});
