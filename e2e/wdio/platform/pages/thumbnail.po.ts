import { BaseComponentPo } from './base-component.po';
import { waitElementToBePresentInDOM, waitForElDisplayed } from '../../driver/wdio';

export class ThumbnailPo extends BaseComponentPo {

    url = '/thumbnail';
    root = '#page-content';

    mainImage = '.fdp-media-container img';
    verticalGalleryImages = 'fdp-thumbnail-basic-example fd-avatar';
    horizontalGalleryImages = 'fdp-thumbnail-horizontal-example fd-avatar';
    verticalGalleryVideo = 'fdp-thumbnail-video-media-example fd-avatar';

    open(): void {
        super.open(this.url);
        waitElementToBePresentInDOM(this.root, 30000);
        waitForElDisplayed(this.root, 30000);
    }
}
