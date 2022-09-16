import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformInputDefaultTypesSrc = 'platform-input-example.component.html';
const platformInputDefaultTypesTsSrc = 'platform-input-example.component.ts';

const platformInputReactiveFormValidationTypesSrc = 'platform-input-reactive-validation-example.component.html';
const platformInputReactiveFormValidationTypesTsSrc = 'platform-input-reactive-validation-example.component.ts';

const platformInputAutoCompleteFormValidationTypesSrc =
    'platform-input-auto-complete-validation-example.component.html';
const platformInputAutoCompleteFormValidationTypesTsSrc =
    'platform-input-auto-complete-validation-example.component.ts';
const platformInputAutoCompleteFormValidationTypesScssSrc =
    'platform-input-auto-complete-validation-example.component.scss';

const platformInputReactiveFormMinMaxValidationTypesSrc =
    'platform-input-reactive-min-max-validation-example.component.html';
const platformInputReactiveFormMinMaxValidationTypesTsSrc =
    'platform-input-reactive-min-max-validation-example.component.ts';

@Component({
    selector: 'fd-platform-input-docs',
    templateUrl: './platform-input-docs.component.html'
})
export class PlatformInputDocsComponent {
    defaultInputType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformInputDefaultTypesSrc),
            fileName: 'platform-input-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformInputDefaultTypesTsSrc),
            fileName: 'platform-input-example',
            component: 'PlatformInputExampleComponent'
        }
    ];

    inputReactiveFormValidationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformInputReactiveFormValidationTypesSrc),
            fileName: 'platform-input-reactive-validation-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformInputReactiveFormValidationTypesTsSrc),
            fileName: 'platform-input-reactive-validation-example',
            component: 'PlatformInputReactiveValidationExampleComponent'
        }
    ];
    inputAutoCompleteFormValidationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformInputAutoCompleteFormValidationTypesSrc),
            fileName: 'platform-input-auto-complete-validation-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformInputAutoCompleteFormValidationTypesTsSrc),
            fileName: 'platform-input-auto-complete-validation-example',
            component: 'PlatformInputAutoCompleteValidationExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformInputAutoCompleteFormValidationTypesScssSrc)
        }
    ];
    inputReactiveFormMinMaxValidationInputType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformInputReactiveFormMinMaxValidationTypesSrc),
            fileName: 'platform-input-reactive-min-max-validation-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformInputReactiveFormMinMaxValidationTypesTsSrc),
            fileName: 'platform-input-reactive-min-max-validation-example',
            component: 'PlatformInputReactiveMinMaxValidationExampleComponent'
        }
    ];
}
