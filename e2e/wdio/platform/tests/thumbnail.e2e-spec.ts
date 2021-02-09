import {
    click,
    getAttributeByName,
    getElementArrayLength,
    getElementLocation,
    getParentElementCSSProperty,
    isElementDisplayed,
    mouseHoverElement,
    refreshPage,
    scrollIntoView,
    waitForPresent,
    waitForElDisplayed
} from '../../driver/wdio';
import { ThumbnailPo } from '../pages/thumbnail.po';

describe('Thumbnail field', function() {
    const thumbnailPage: ThumbnailPo = new ThumbnailPo();

    beforeAll(() => {
        thumbnailPage.open();
    });

    afterEach(() => {
        refreshPage();
        waitForPresent(thumbnailPage.mainImage);
    });

    it('should be able to view all thumbnail images', () => {
        waitForPresent(thumbnailPage.mainImage);
        waitForElDisplayed(thumbnailPage.mainImage);
        expect(isElementDisplayed(thumbnailPage.mainImage)).toBeTrue();
        expect(isElementDisplayed(thumbnailPage.mainImage, 1)).toBeTrue();
        expect(isElementDisplayed(thumbnailPage.mainVideo)).toBeTrue();
    });

    it('should be able to display images vertical', () => {
        scrollIntoView(thumbnailPage.verticalGalleryImages);
        const arrLength = getElementArrayLength(thumbnailPage.verticalGalleryImages);
        for (let i = 0; arrLength - 1 > i; i++) {
            expect(getElementLocation(thumbnailPage.verticalGalleryImages, i).x)
                .toEqual(getElementLocation(thumbnailPage.verticalGalleryImages, i + 1).x);
            expect(getElementLocation(thumbnailPage.verticalGalleryImages, i).y)
                .toBeLessThan(getElementLocation(thumbnailPage.verticalGalleryImages, i + 1).y);
        }
    });

    it('should be able to display images horizontal', () => {
        scrollIntoView(thumbnailPage.horizontalGalleryImages);
        const arrLength = getElementArrayLength(thumbnailPage.horizontalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            if (i !== arrLength - 1) {
                expect(getElementLocation(thumbnailPage.horizontalGalleryImages, i).y)
                    .toEqual(getElementLocation(thumbnailPage.horizontalGalleryImages, i + 1).y);
                expect(getElementLocation(thumbnailPage.horizontalGalleryImages, i).x)
                    .toBeLessThan(getElementLocation(thumbnailPage.horizontalGalleryImages, i + 1).x);
            }
        }
    });

    it('should be able to display vertical for video gallery', () => {
        scrollIntoView(thumbnailPage.verticalGalleryVideo);
        const arrLength = getElementArrayLength(thumbnailPage.verticalGalleryVideo);
        for (let i = 0; arrLength > i; i++) {
            if (i !== arrLength - 1) {
                expect(getElementLocation(thumbnailPage.verticalGalleryVideo, i).x)
                    .toEqual(getElementLocation(thumbnailPage.verticalGalleryVideo, i + 1).x);
                expect(getElementLocation(thumbnailPage.verticalGalleryVideo, i).y)
                    .toBeLessThan(getElementLocation(thumbnailPage.verticalGalleryVideo, i + 1).y);
            }
        }
    });

    it('should on click display image for vertical', () => {
        scrollIntoView(thumbnailPage.verticalGalleryImages);
        const arrLength = getElementArrayLength(thumbnailPage.verticalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            const imageUrl = getAttributeByName(thumbnailPage.verticalGalleryImages, 'ng-reflect-image', i);
            click(thumbnailPage.verticalGalleryImages, i);
            expect(getAttributeByName(thumbnailPage.mainImage, 'src', 0)).toContain(imageUrl);
        }
    });

    it('should on click display image for horizontal', () => {
        scrollIntoView(thumbnailPage.horizontalGalleryImages);
        const arrLength = getElementArrayLength(thumbnailPage.horizontalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            const imageUrl = getAttributeByName(thumbnailPage.horizontalGalleryImages, 'ng-reflect-image', i);
            click(thumbnailPage.horizontalGalleryImages, i);
            expect(getAttributeByName(thumbnailPage.mainImage, 'src', 1)).toContain(imageUrl);
        }
    });

    it('should highlight on hover', () => {
        scrollIntoView(thumbnailPage.verticalGalleryImages);
        const arrLength = getElementArrayLength(thumbnailPage.verticalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            scrollIntoView(thumbnailPage.verticalGalleryImages, i);
            mouseHoverElement(thumbnailPage.verticalGalleryImages, i);
            expect(getParentElementCSSProperty(thumbnailPage.verticalGalleryImages, 'border-bottom-color', i)).toContain('8,84,160');
        }

        for (let i = 0; arrLength > i; i++) {
            scrollIntoView(thumbnailPage.horizontalGalleryImages, i);
            mouseHoverElement(thumbnailPage.horizontalGalleryImages, i);
            expect(getParentElementCSSProperty(thumbnailPage.horizontalGalleryImages, 'border-bottom-color', i)).toContain('8,92,175');
        }

        for (let i = 0; arrLength > i; i++) {
            scrollIntoView(thumbnailPage.verticalGalleryVideo, i);
            mouseHoverElement(thumbnailPage.verticalGalleryVideo, i);
            expect(getParentElementCSSProperty(thumbnailPage.verticalGalleryVideo, 'border-bottom-color', i)).toContain('8,84,160');
        }
    });

    it('should have rtl orientation', () => {
        thumbnailPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', function() {
        xit('should check examples visual regression', () => {
            thumbnailPage.saveExampleBaselineScreenshot('thumbnail');
            expect(thumbnailPage.compareWithBaseline('thumbnail')).toBeLessThan(2);
        });
    });
});
