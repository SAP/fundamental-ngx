import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformFileUploadDefaultTypesSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-example.component.html';
import * as platformFileUploadDefaultTypesScssSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-example.component.scss';
import * as platformFileUploadDefaultTypesTsSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-example.component.ts';
import * as platformFileUploadCompactTypesSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-compact-example.component.html';
import * as platformFileUploadCompactTypesScssSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-compact-example.component.scss';
import * as platformFileUploadCompactTypesTsSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-compact-example.component.ts';
import * as platformFileUploadMaxFileSizeTypesSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component.html';
import * as platformFileUploadMaxFileSizeTypesScssSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component.scss';
import * as platformFileUploadMaxFileSizeTypesTsSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component.ts';
import * as platformFileUploadMinFileSizeTypesSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component.html';
import * as platformFileUploadMinFileSizeTypesScssSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component.scss';
import * as platformFileUploadMinFileSizeTypesTsSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component.ts';
import * as platformFileUploadFileTypesSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-file-types-example.component.html';
import * as platformFileUploadFileTypesTsSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-file-types-example.component.ts';
import * as platformFileUploadFileTypesScssSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-file-types-example.component.scss';
import * as platformFileUploadReactiveSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-reactive-example.component.html';
import * as platformFileUploadReactiveScssSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-reactive-example.component.scss';
import * as platformFileUploadReactiveTsSrc from '!raw-loader!./platform-file-uploader-examples/platform-file-uploader-reactive-example.component.ts';

@Component({
    selector: 'fd-platform-file-uploader-docs',
    templateUrl: './platform-file-uploader-docs.component.html'
})
export class PlatformFileUploaderDocsComponent {
    defaultFileUploadType: ExampleFile[] = [
        {
            language: 'html',
            code: platformFileUploadDefaultTypesSrc,
            fileName: 'platform-file-uploader-example',
            scssFileCode: platformFileUploadDefaultTypesScssSrc
        },
        {
            language: 'typescript',
            code: platformFileUploadDefaultTypesTsSrc,
            fileName: 'platform-file-uploader-example',
            component: 'PlatformFileUploaderExampleComponent'
        }
    ];
    defaultFileUploadCompactType: ExampleFile[] = [
        {
            language: 'html',
            code: platformFileUploadCompactTypesSrc,
            fileName: 'platform-file-uploader-compact-example',
            scssFileCode: platformFileUploadCompactTypesScssSrc
        },
        {
            language: 'typescript',
            code: platformFileUploadCompactTypesTsSrc,
            fileName: 'platform-file-uploader-compact-example',
            component: 'PlatformFileUploaderCompactExampleComponent'
        }
    ];
    defaultFileUploadMaxFileSizeType: ExampleFile[] = [
        {
            language: 'html',
            code: platformFileUploadMaxFileSizeTypesSrc,
            fileName: 'platform-file-uploader-max-file-size-example',
            scssFileCode: platformFileUploadMaxFileSizeTypesScssSrc
        },
        {
            language: 'typescript',
            code: platformFileUploadMaxFileSizeTypesTsSrc,
            fileName: 'platform-file-uploader-max-file-size-example',
            component: 'PlatformFileUploaderMaxFileSizeExampleComponent'
        }
    ];

    defaultFileUploadMinFileSizeType: ExampleFile[] = [
        {
            language: 'html',
            code: platformFileUploadMinFileSizeTypesSrc,
            fileName: 'platform-file-uploader-min-file-size-example',
            scssFileCode: platformFileUploadMinFileSizeTypesScssSrc
        },
        {
            language: 'typescript',
            code: platformFileUploadMinFileSizeTypesTsSrc,
            fileName: 'platform-file-uploader-min-file-size-example',
            component: 'PlatformFileUploaderMinFileSizeExampleComponent'
        }
    ];
    defaultFileUploadFileType: ExampleFile[] = [
        {
            language: 'html',
            code: platformFileUploadFileTypesSrc,
            fileName: 'platform-file-uploader-file-types-example',
            scssFileCode: platformFileUploadFileTypesScssSrc
        },
        {
            language: 'typescript',
            code: platformFileUploadFileTypesTsSrc,
            fileName: 'platform-file-uploader-file-types-example',
            component: 'PlatformFileUploaderFileTypesExampleComponent'
        }
    ];
    defaultFileUploadDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: platformFileUploadReactiveSrc,
            fileName: 'platform-file-uploader-reactive-example',
            scssFileCode: platformFileUploadReactiveScssSrc
        },
        {
            language: 'typescript',
            code: platformFileUploadReactiveTsSrc,
            fileName: 'platform-file-uploader-reactive-example',
            component: 'PlatformFileUploaderReactiveExampleComponent'
        }
    ];
}
