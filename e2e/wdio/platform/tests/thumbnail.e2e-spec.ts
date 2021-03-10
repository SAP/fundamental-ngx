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
    const {
        mainImage, mainVideo, verticalGalleryImages, horizontalGalleryImages, verticalGalleryVideo
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

    it('should be able to display images vertical', () => {
        scrollIntoView(verticalGalleryImages);
        const arrLength = getElementArrayLength(verticalGalleryImages);
        for (let i = 0; arrLength - 1 > i; i++) {
            expect(getElementLocation(verticalGalleryImages, i).x)
                .toEqual(getElementLocation(verticalGalleryImages, i + 1).x);
            expect(getElementLocation(verticalGalleryImages, i).y)
                .toBeLessThan(getElementLocation(verticalGalleryImages, i + 1).y);
        }
    });

    it('should be able to display images horizontal', () => {
        scrollIntoView(horizontalGalleryImages);
        const arrLength = getElementArrayLength(horizontalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
            if (i !== arrLength - 1) {
                expect(getElementLocation(horizontalGalleryImages, i).y)
                    .toEqual(getElementLocation(horizontalGalleryImages, i + 1).y);
                expect(getElementLocation(horizontalGalleryImages, i).x)
                    .toBeLessThan(getElementLocation(horizontalGalleryImages, i + 1).x);
            }
        }
    });

    it('should be able to display vertical for video gallery', () => {
        scrollIntoView(verticalGalleryVideo);
        const arrLength = getElementArrayLength(verticalGalleryVideo);
        for (let i = 0; arrLength > i; i++) {
            if (i !== arrLength - 1) {
                expect(getElementLocation(verticalGalleryVideo, i).x)
                    .toEqual(getElementLocation(verticalGalleryVideo, i + 1).x);
                expect(getElementLocation(verticalGalleryVideo, i).y)
                    .toBeLessThan(getElementLocation(verticalGalleryVideo, i + 1).y);
            }
        }
    });

    it('should on click display image for vertical', () => {
        scrollIntoView(verticalGalleryImages);
        const arrLength = getElementArrayLength(verticalGalleryImages);
        for (let i = 0; arrLength > i; i++) {
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

    it('should have rtl orientation', () => {
        thumbnailPage.checkRtlSwitch();
    });

    xdescribe('Check visual regression', function() {
        xit('should check examples visual regression', () => {
            thumbnailPage.saveExampleBaselineScreenshot();
            expect(thumbnailPage.compareWithBaseline()).toBeLessThan(2);
        });
    });
});
