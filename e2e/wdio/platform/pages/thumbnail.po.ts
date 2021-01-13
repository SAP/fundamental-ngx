import { BaseComponentPo } from './base-component.po';
import { waitForPresent, waitForElDisplayed } from '../../driver/wdio';

export class ThumbnailPo extends BaseComponentPo {

    url = '/thumbnail';
    root = '#page-content';

    mainImage = '.fdp-media-container img';
    verticalGalleryImages = 'fdp-thumbnail-basic-example fd-avatar';
    horizontalGalleryImages = 'fdp-thumbnail-horizontal-example fd-avatar';
    verticalGalleryVideo = 'fdp-thumbnail-video-media-example fd-avatar';

    open(): void {
        super.open(this.url);
        waitForPresent(this.mainImage, 30000);
        waitForElDisplayed(this.mainImage, 30000);
    }
}
