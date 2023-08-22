import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformFileUploaderReactiveExampleComponent } from './examples/platform-file-uploader-reactive-example.component';
import { PlatformFileUploaderFileTypesExampleComponent } from './examples/platform-file-uploader-file-types-example.component';
import { PlatformFileUploaderMinFileSizeExampleComponent } from './examples/platform-file-uploader-min-file-size-example.component';
import { PlatformFileUploaderMaxFileSizeExampleComponent } from './examples/platform-file-uploader-max-file-size-example.component';
import { PlatformFileUploaderCompactExampleComponent } from './examples/platform-file-uploader-compact-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformFileUploaderExampleComponent } from './examples/platform-file-uploader-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const platformFileUploadDefaultTypesSrc = 'platform-file-uploader-example.component.html';
const platformFileUploadDefaultTypesScssSrc = 'platform-file-uploader-example.component.scss';
const platformFileUploadDefaultTypesTsSrc = 'platform-file-uploader-example.component.ts';
const platformFileUploadCompactTypesSrc = 'platform-file-uploader-compact-example.component.html';
const platformFileUploadCompactTypesScssSrc = 'platform-file-uploader-compact-example.component.scss';
const platformFileUploadCompactTypesTsSrc = 'platform-file-uploader-compact-example.component.ts';
const platformFileUploadMaxFileSizeTypesSrc = 'platform-file-uploader-max-file-size-example.component.html';
const platformFileUploadMaxFileSizeTypesScssSrc = 'platform-file-uploader-max-file-size-example.component.scss';
const platformFileUploadMaxFileSizeTypesTsSrc = 'platform-file-uploader-max-file-size-example.component.ts';
const platformFileUploadMinFileSizeTypesSrc = 'platform-file-uploader-min-file-size-example.component.html';
const platformFileUploadMinFileSizeTypesScssSrc = 'platform-file-uploader-min-file-size-example.component.scss';
const platformFileUploadMinFileSizeTypesTsSrc = 'platform-file-uploader-min-file-size-example.component.ts';
const platformFileUploadFileTypesSrc = 'platform-file-uploader-file-types-example.component.html';
const platformFileUploadFileTypesTsSrc = 'platform-file-uploader-file-types-example.component.ts';
const platformFileUploadFileTypesScssSrc = 'platform-file-uploader-file-types-example.component.scss';
const platformFileUploadReactiveSrc = 'platform-file-uploader-reactive-example.component.html';
const platformFileUploadReactiveScssSrc = 'platform-file-uploader-reactive-example.component.scss';
const platformFileUploadReactiveTsSrc = 'platform-file-uploader-reactive-example.component.ts';

@Component({
    selector: 'fd-platform-file-uploader-docs',
    templateUrl: './platform-file-uploader-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformFileUploaderExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformFileUploaderCompactExampleComponent,
        PlatformFileUploaderMaxFileSizeExampleComponent,
        PlatformFileUploaderMinFileSizeExampleComponent,
        PlatformFileUploaderFileTypesExampleComponent,
        PlatformFileUploaderReactiveExampleComponent
    ]
})
export class PlatformFileUploaderDocsComponent {
    defaultFileUploadType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFileUploadDefaultTypesSrc),
            fileName: 'platform-file-uploader-example',
            scssFileCode: getAssetFromModuleAssets(platformFileUploadDefaultTypesScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFileUploadDefaultTypesTsSrc),
            fileName: 'platform-file-uploader-example',
            component: 'PlatformFileUploaderExampleComponent'
        }
    ];
    defaultFileUploadCompactType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFileUploadCompactTypesSrc),
            fileName: 'platform-file-uploader-compact-example',
            scssFileCode: getAssetFromModuleAssets(platformFileUploadCompactTypesScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFileUploadCompactTypesTsSrc),
            fileName: 'platform-file-uploader-compact-example',
            component: 'PlatformFileUploaderCompactExampleComponent'
        }
    ];
    defaultFileUploadMaxFileSizeType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFileUploadMaxFileSizeTypesSrc),
            fileName: 'platform-file-uploader-max-file-size-example',
            scssFileCode: getAssetFromModuleAssets(platformFileUploadMaxFileSizeTypesScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFileUploadMaxFileSizeTypesTsSrc),
            fileName: 'platform-file-uploader-max-file-size-example',
            component: 'PlatformFileUploaderMaxFileSizeExampleComponent'
        }
    ];

    defaultFileUploadMinFileSizeType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFileUploadMinFileSizeTypesSrc),
            fileName: 'platform-file-uploader-min-file-size-example',
            scssFileCode: getAssetFromModuleAssets(platformFileUploadMinFileSizeTypesScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFileUploadMinFileSizeTypesTsSrc),
            fileName: 'platform-file-uploader-min-file-size-example',
            component: 'PlatformFileUploaderMinFileSizeExampleComponent'
        }
    ];
    defaultFileUploadFileType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFileUploadFileTypesSrc),
            fileName: 'platform-file-uploader-file-types-example',
            scssFileCode: getAssetFromModuleAssets(platformFileUploadFileTypesScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFileUploadFileTypesTsSrc),
            fileName: 'platform-file-uploader-file-types-example',
            component: 'PlatformFileUploaderFileTypesExampleComponent'
        }
    ];
    defaultFileUploadDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformFileUploadReactiveSrc),
            fileName: 'platform-file-uploader-reactive-example',
            scssFileCode: getAssetFromModuleAssets(platformFileUploadReactiveScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformFileUploadReactiveTsSrc),
            fileName: 'platform-file-uploader-reactive-example',
            component: 'PlatformFileUploaderReactiveExampleComponent'
        }
    ];
}
