import { PlatformBaseComponentPo, waitForElDisplayed, waitForPresent } from '../../../../../e2e';

export class ThumbnailPo extends PlatformBaseComponentPo {
    url = '/thumbnail';
    root = '#page-content';

    mainImage = '.fdp-media-container img';
    mainVideo = '.fdp-media-container video';
    dialogMainImg = '[role="dialog"] img';
    verticalGalleryImages = 'fdp-platform-thumbnail-basic-example fd-avatar';
    horizontalGalleryImages = 'fdp-platform-thumbnail-horizontal-example fd-avatar';
    horizontalMainImg = 'fdp-platform-thumbnail-horizontal-example img';
    verticalGalleryVideo = 'fdp-platform-thumbnail-video-media-example fd-avatar';
    galleryDialog = '[role="dialog"]';
    galleryDialogCloseButton = this.galleryDialog + ' button.fd-button--transparent';
    galleryDialogLeftArrowButton = this.galleryDialog + ' button.fdp-thumbnail-button--left';
    galleryDialogRightArrowButton = this.galleryDialog + ' button.fdp-thumbnail-button--right';

    async open(): Promise<void> {
        await super.open(this.url);
        await waitForPresent(this.root);
        await waitForElDisplayed(this.title);
    }

    async getScreenshotFolder(): Promise<Record<string, any>> {
        return super.getScreenshotFolder(this.url);
    }

    async saveExampleBaselineScreenshot(specName: string = 'thumbnail'): Promise<void> {
        await super.saveExampleBaselineScreenshot(specName, await this.getScreenshotFolder());
    }

    async compareWithBaseline(specName: string = 'thumbnail'): Promise<any> {
        return super.compareWithBaseline(specName, await this.getScreenshotFolder());
    }
}
