import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as basicThumbnailHtml from '!raw-loader!./platform-thumbnail-examples/platform-thumbnail-basic-example.component.html';
import * as basicThumbnailTs from '!raw-loader!./platform-thumbnail-examples/platform-thumbnail-basic-example.component.ts';
import * as horizontalThumbnailHtml from '!raw-loader!./platform-thumbnail-examples/platform-thumbnail-horizontal-example.component.html';
import * as horizontalThumbnailTs from '!raw-loader!./platform-thumbnail-examples/platform-thumbnail-horizontal-example.component.ts';
import * as videoThumbnailHtml from '!raw-loader!./platform-thumbnail-examples/platform-thumbnail-video-media-example.component.html';
import * as videoThumbnailTs from '!raw-loader!./platform-thumbnail-examples/platform-thumbnail-video-media-example.component.ts';

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
