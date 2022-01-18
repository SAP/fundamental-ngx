import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import platformFileUploadDefaultTypesSrc from '!./platform-file-uploader-examples/platform-file-uploader-example.component.html?raw';
import platformFileUploadDefaultTypesScssSrc from '!./platform-file-uploader-examples/platform-file-uploader-example.component.scss?raw';
import platformFileUploadDefaultTypesTsSrc from '!./platform-file-uploader-examples/platform-file-uploader-example.component.ts?raw';
import platformFileUploadCompactTypesSrc from '!./platform-file-uploader-examples/platform-file-uploader-compact-example.component.html?raw';
import platformFileUploadCompactTypesScssSrc from '!./platform-file-uploader-examples/platform-file-uploader-compact-example.component.scss?raw';
import platformFileUploadCompactTypesTsSrc from '!./platform-file-uploader-examples/platform-file-uploader-compact-example.component.ts?raw';
import platformFileUploadMaxFileSizeTypesSrc from '!./platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component.html?raw';
import platformFileUploadMaxFileSizeTypesScssSrc from '!./platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component.scss?raw';
import platformFileUploadMaxFileSizeTypesTsSrc from '!./platform-file-uploader-examples/platform-file-uploader-max-file-size-example.component.ts?raw';
import platformFileUploadMinFileSizeTypesSrc from '!./platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component.html?raw';
import platformFileUploadMinFileSizeTypesScssSrc from '!./platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component.scss?raw';
import platformFileUploadMinFileSizeTypesTsSrc from '!./platform-file-uploader-examples/platform-file-uploader-min-file-size-example.component.ts?raw';
import platformFileUploadFileTypesSrc from '!./platform-file-uploader-examples/platform-file-uploader-file-types-example.component.html?raw';
import platformFileUploadFileTypesTsSrc from '!./platform-file-uploader-examples/platform-file-uploader-file-types-example.component.ts?raw';
import platformFileUploadFileTypesScssSrc from '!./platform-file-uploader-examples/platform-file-uploader-file-types-example.component.scss?raw';
import platformFileUploadReactiveSrc from '!./platform-file-uploader-examples/platform-file-uploader-reactive-example.component.html?raw';
import platformFileUploadReactiveScssSrc from '!./platform-file-uploader-examples/platform-file-uploader-reactive-example.component.scss?raw';
import platformFileUploadReactiveTsSrc from '!./platform-file-uploader-examples/platform-file-uploader-reactive-example.component.ts?raw';

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
