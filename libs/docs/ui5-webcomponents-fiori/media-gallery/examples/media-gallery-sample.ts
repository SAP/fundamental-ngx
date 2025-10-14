import { Component } from '@angular/core';

import { MediaGallery } from '@fundamental-ngx/ui5-webcomponents-fiori/media-gallery';
import { MediaGalleryItem } from '@fundamental-ngx/ui5-webcomponents-fiori/media-gallery-item';

@Component({
    selector: 'ui5-fiori-media-gallery-sample',
    standalone: true,
    imports: [MediaGallery, MediaGalleryItem],
    templateUrl: './media-gallery-sample.html',
    styles: [``]
})
export class MediaGallerySample {}
