import {
    checkElementScreenshot,
    click, clickWithOption,
    currentPlatformName,
    doesItExist,
    getAttributeByName,
    getElementArrayLength,
    getParentElementCSSProperty,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    waitForElDisplayed,
    waitForPresent
} from '../../driver/wdio';
import { ThumbnailPo } from '../pages/thumbnail.po';

describe('Thumbnail field', function() {
    const thumbnailPage: ThumbnailPo = new ThumbnailPo();
    const {
        mainImage, mainVideo, verticalGalleryImages, horizontalGalleryImages, verticalGalleryVideo, galleryDialog,
        galleryDialogCloseButton,
        galleryDialogLeftArrowButton,
        galleryDialogRightArrowButton
    } = thumbnailPage;

    beforeAll(() => {
        thumbnailPage.open();
    }, 1);

    afterEach(() => {
        refreshPage();
        waitForPresent(mainImage);
    }, 1);

    it('should be able to view all thumbnail images', () => {
        waitForPresent(mainImage);
        waitForElDisplayed(mainImage);
        expect(isElementDisplayed(mainImage)).toBeTrue();
        expect(isElementDisplayed(mainImage, 1)).toBeTrue();
        expect(isElementDisplayed(mainVideo)).toBeTrue();
    });

    // Skipped due https://github.com/SAP/fundamental-ngx/issues/4896
    xit('should on click display image for vertical', () => {
        scrollIntoView(verticalGalleryImages);
        const arrLength = getElementArrayLength(verticalGalleryImages);
        for (let i = 0; arrLength - 1 > i; i++) {
            const imageUrl = getAttributeByName(verticalGalleryImages, 'ng-reflect-image', i);
            click(verticalGalleryImages, i);
            expect(getAttributeByName(mainImage, 'src', 0)).toContain(imageUrl);
        }
    });

    it('should on click display image for horizontal', () => {
        scrollIntoView(horizontalGalleryImages);
        const arrLength = getElementArrayLength(horizontalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            const imageUrl = getAttributeByName(horizontalGalleryImages, 'ng-reflect-image', i);
            click(horizontalGalleryImages, i);
            expect(getAttributeByName(mainImage, 'src', 1)).toContain(imageUrl);
        }
    });

    it('should highlight on hover', () => {
        scrollIntoView(verticalGalleryImages);
        const arrLength = getElementArrayLength(verticalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            scrollIntoView(verticalGalleryImages, i);
            mouseHoverElement(verticalGalleryImages, i);
            expect(getParentElementCSSProperty(verticalGalleryImages, 'border-bottom-color', i)).toContain('8,84,160');
        }

        for (let i = 0; arrLength > i; i++) {
            scrollIntoView(horizontalGalleryImages, i);
            mouseHoverElement(horizontalGalleryImages, i);
            expect(getParentElementCSSProperty(horizontalGalleryImages, 'border-bottom-color', i)).toContain('8,92,175');
        }

        for (let i = 0; arrLength > i; i++) {
            scrollIntoView(verticalGalleryVideo, i);
            mouseHoverElement(verticalGalleryVideo, i);
            expect(getParentElementCSSProperty(verticalGalleryVideo, 'border-bottom-color', i)).toContain('8,84,160');
        }
    });

    it('should be able to close gallery popup', () => {
        scrollIntoView(verticalGalleryImages, 4);
        waitForElDisplayed(verticalGalleryImages, 4);
        clickWithOption(verticalGalleryImages, 4, 5000, {x: 10});
        scrollIntoView(galleryDialog);
        waitForElDisplayed(galleryDialog);
        click(galleryDialogCloseButton);

        expect(doesItExist(galleryDialog)).toBe(false);
    });

    xit('should be able to switch image in gallery popup', () => {
        waitForElDisplayed(verticalGalleryImages, 4);
        clickWithOption(verticalGalleryImages, 4, 5000, {x: 20});
        waitForElDisplayed(galleryDialog);
        saveElementScreenshot(galleryDialog, 'thumbnail-dialog-on-open-' + currentPlatformName(), thumbnailPage.getScreenshotFolder());
        let diff = checkElementScreenshot(galleryDialog, 'thumbnail-dialog-on-open-' + currentPlatformName(), thumbnailPage.getScreenshotFolder());
        click(galleryDialogLeftArrowButton);

        saveElementScreenshot(galleryDialog, 'thumbnail-dialog-previous-' + currentPlatformName(), thumbnailPage.getScreenshotFolder());
        diff += checkElementScreenshot(galleryDialog, 'thumbnail-dialog-previous-' + currentPlatformName(), thumbnailPage.getScreenshotFolder());

        click(galleryDialogRightArrowButton);
        click(galleryDialogRightArrowButton);
        saveElementScreenshot(galleryDialog, 'thumbnail-dialog-next-' + currentPlatformName(), thumbnailPage.getScreenshotFolder());
        diff += checkElementScreenshot(galleryDialog, 'thumbnail-dialog-next-' + currentPlatformName(), thumbnailPage.getScreenshotFolder());

        expect(diff).toBeLessThan(5);
    });

    it('should have rtl orientation', () => {
        thumbnailPage.checkRtlSwitch();
    });

    describe('Check visual regression', function() {
        it('should check examples visual regression', () => {
            thumbnailPage.saveExampleBaselineScreenshot();
            expect(thumbnailPage.compareWithBaseline()).toBeLessThan(5);
        });
    });
});
