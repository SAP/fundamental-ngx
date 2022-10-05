import {
    click,
    clickWithOption,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    isElementDisplayed,
    refreshPage,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../../../../e2e';
import { ThumbnailPo } from './thumbnail.po';

describe('Thumbnail field', () => {
    const thumbnailPage: ThumbnailPo = new ThumbnailPo();
    const {
        mainImage,
        mainVideo,
        verticalGalleryImages,
        horizontalGalleryImages,
        galleryDialog,
        galleryDialogCloseButton,
        galleryDialogLeftArrowButton,
        galleryDialogRightArrowButton,
        dialogMainImg,
        horizontalMainImg
    } = thumbnailPage;

    beforeAll(async () => {
        await thumbnailPage.open();
    }, 1);

    afterEach(async () => {
        await refreshPage();
        await waitForPresent(thumbnailPage.root);
        await waitForElDisplayed(thumbnailPage.title);
    }, 1);

    it('should be able to view all thumbnail images', async () => {
        await waitForPresent(mainImage);
        await waitForElDisplayed(mainImage);
        await expect(await isElementDisplayed(mainImage)).toBeTrue();
        await expect(await isElementDisplayed(mainImage, 1)).toBeTrue();
        await expect(await isElementDisplayed(mainVideo)).toBeTrue();
    });

    it('should on click display image for vertical', async () => {
        await scrollIntoView(verticalGalleryImages);
        const arrLength = await getElementArrayLength(verticalGalleryImages);
        for (let i = 0; arrLength - 1 > i; i++) {
            const imageUrl = await getAttributeByName(verticalGalleryImages, 'style', i);
            await click(verticalGalleryImages, i);
            await expect(imageUrl).toContain(await getAttributeByName(mainImage, 'src', 0));
        }
    });

    it('should on click display image for horizontal', async () => {
        await scrollIntoView(horizontalGalleryImages);
        const arrLength = await getElementArrayLength(horizontalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            const imageUrl = await getAttributeByName(horizontalGalleryImages, 'style', i);
            const trimmedImageUrl = imageUrl
                .replace('background-image: url("', '')
                .replace('");', '')
                .replace('https:', '');
            await click(horizontalGalleryImages, i);
            await expect(await getAttributeByName(mainImage, 'src', 1)).toContain(trimmedImageUrl);
        }
    });

    it('should be able to close gallery popup', async () => {
        await scrollIntoView(verticalGalleryImages, 4);
        await waitForElDisplayed(verticalGalleryImages, 4);
        await clickWithOption(verticalGalleryImages, 4, 5000, { x: 10 });
        await scrollIntoView(galleryDialog);
        await waitForElDisplayed(galleryDialog);
        await click(galleryDialogCloseButton);

        await expect(await doesItExist(galleryDialog)).toBe(false);
    });

    it('should be able to switch image in gallery popup', async () => {
        await waitForElDisplayed(horizontalGalleryImages);
        await scrollIntoView(horizontalGalleryImages, 2);
        await clickWithOption(horizontalGalleryImages, 2, 5000, { x: 20 });
        await click(horizontalMainImg);
        await waitForElDisplayed(galleryDialog);
        const startingImage = await getAttributeByName(dialogMainImg, 'src');

        await click(galleryDialogLeftArrowButton);
        const newImage = await getAttributeByName(dialogMainImg, 'src');
        await expect(newImage).not.toBe(startingImage);

        await click(galleryDialogRightArrowButton);
        await click(galleryDialogRightArrowButton);
        const newImage2 = await getAttributeByName(dialogMainImg, 'src');
        await expect(newImage2).not.toBe(newImage);
    });

    it('should have rtl orientation', async () => {
        await thumbnailPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', async () => {
            await thumbnailPage.saveExampleBaselineScreenshot();
            await expect(await thumbnailPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
