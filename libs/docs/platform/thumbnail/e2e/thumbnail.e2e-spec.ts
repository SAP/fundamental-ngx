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

    beforeAll(() => {
        thumbnailPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(thumbnailPage.root);
        waitForElDisplayed(thumbnailPage.title);
    }, 1);

    it('should be able to view all thumbnail images', () => {
        waitForPresent(mainImage);
        waitForElDisplayed(mainImage);
        expect(isElementDisplayed(mainImage)).toBeTrue();
        expect(isElementDisplayed(mainImage, 1)).toBeTrue();
        expect(isElementDisplayed(mainVideo)).toBeTrue();
    });

    it('should on click display image for vertical', () => {
        scrollIntoView(verticalGalleryImages);
        const arrLength = getElementArrayLength(verticalGalleryImages);
        for (let i = 0; arrLength - 1 > i; i++) {
            const imageUrl = getAttributeByName(verticalGalleryImages, 'style', i);
            click(verticalGalleryImages, i);
            expect(imageUrl).toContain(getAttributeByName(mainImage, 'src', 0));
        }
    });

    it('should on click display image for horizontal', () => {
        scrollIntoView(horizontalGalleryImages);
        const arrLength = getElementArrayLength(horizontalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            const imageUrl = getAttributeByName(horizontalGalleryImages, 'style', i);
            const trimmedImageUrl = imageUrl
                .replace('background-image: url("', '')
                .replace('");', '')
                .replace('https:', '');
            click(horizontalGalleryImages, i);
            expect(getAttributeByName(mainImage, 'src', 1)).toContain(trimmedImageUrl);
        }
    });

    it('should be able to close gallery popup', () => {
        scrollIntoView(verticalGalleryImages, 4);
        waitForElDisplayed(verticalGalleryImages, 4);
        clickWithOption(verticalGalleryImages, 4, 5000, { x: 10 });
        scrollIntoView(galleryDialog);
        waitForElDisplayed(galleryDialog);
        click(galleryDialogCloseButton);

        expect(doesItExist(galleryDialog)).toBe(false);
    });

    it('should be able to switch image in gallery popup', () => {
        waitForElDisplayed(horizontalGalleryImages);
        scrollIntoView(horizontalGalleryImages, 2);
        clickWithOption(horizontalGalleryImages, 2, 5000, { x: 20 });
        click(horizontalMainImg);
        waitForElDisplayed(galleryDialog);
        const startingImage = getAttributeByName(dialogMainImg, 'src');

        click(galleryDialogLeftArrowButton);
        const newImage = getAttributeByName(dialogMainImg, 'src');
        expect(newImage).not.toBe(startingImage);

        click(galleryDialogRightArrowButton);
        click(galleryDialogRightArrowButton);
        const newImage2 = getAttributeByName(dialogMainImg, 'src');
        expect(newImage2).not.toBe(newImage);
    });

    it('should have rtl orientation', () => {
        thumbnailPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', () => {
        it('should check examples visual regression', () => {
            thumbnailPage.saveExampleBaselineScreenshot();
            expect(thumbnailPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
