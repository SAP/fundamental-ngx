import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import basicThumbnailHtml from '!./platform-thumbnail-examples/platform-thumbnail-basic-example.component.html?raw';
import basicThumbnailTs from '!./platform-thumbnail-examples/platform-thumbnail-basic-example.component.ts?raw';
import horizontalThumbnailHtml from '!./platform-thumbnail-examples/platform-thumbnail-horizontal-example.component.html?raw';
import horizontalThumbnailTs from '!./platform-thumbnail-examples/platform-thumbnail-horizontal-example.component.ts?raw';
import videoThumbnailHtml from '!./platform-thumbnail-examples/platform-thumbnail-video-media-example.component.html?raw';
import videoThumbnailTs from '!./platform-thumbnail-examples/platform-thumbnail-video-media-example.component.ts?raw';

@Component({
    selector: 'app-platform-thumbnail',
    templateUrl: './platform-thumbnail.docs.component.html'
})
export class PlatformThumbnailDocsComponent {
    basicThumbnail: ExampleFile[] = [
        {
            language: 'html',
            code: basicThumbnailHtml,
            fileName: 'platform-thumbnail-basic-example'
        },
        {
            language: 'typescript',
            component: 'PlatformThumbnailBasicExampleComponent',
            code: basicThumbnailTs,
            fileName: 'platform-thumbnail-basic-example'
        }
    ];

    horizontalThumbnail: ExampleFile[] = [
        {
            language: 'html',
            code: horizontalThumbnailHtml,
            fileName: 'platform-thumbnail-horizontal-example'
        },
        {
            language: 'typescript',
            component: 'PlatformThumbnailHorizontalExampleComponent',
            code: horizontalThumbnailTs,
            fileName: 'platform-thumbnail-horizontal-example'
        }
    ];

    videoThumbnail: ExampleFile[] = [
        {
            language: 'html',
            code: videoThumbnailHtml,
            fileName: 'platform-thumbnail-video-media-example'
        },
        {
            language: 'typescript',
            component: 'PlatformThumbnailVideoMediaExampleComponent',
            code: videoThumbnailTs,
            fileName: 'platform-thumbnail-video-media-example'
        }
    ];
}
