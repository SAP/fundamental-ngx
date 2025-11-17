import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { MediaGallerySample } from './examples/media-gallery-sample';

const mediaGallerySampleHtml = 'media-gallery-sample.html';
const mediaGallerySampleTs = 'media-gallery-sample.ts';

@Component({
    selector: 'ui5-fiori-media-gallery-docs',
    templateUrl: './media-gallery-docs.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        MediaGallerySample
    ]
})
export class MediaGalleryDocs {
    mediaGallerySample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mediaGallerySampleHtml),
            fileName: 'media-gallery-sample'
        },
        {
            language: 'typescript',
            component: 'MediaGallerySample',
            code: getAssetFromModuleAssets(mediaGallerySampleTs),
            fileName: 'media-gallery-sample'
        }
    ];
}
