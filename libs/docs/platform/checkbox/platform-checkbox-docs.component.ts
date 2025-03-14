import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformChekboxNoFormComponent } from './examples/platform-binary-checkbox-no-form.component';
import { PlatformCompactChekboxExampleComponent } from './examples/platform-binary-checkbox.component';
import { PlatformChekboxA11yExampleComponent } from './examples/platform-checkbox-a11y.component';
import { PlatformChekboxStyleComponent } from './examples/platform-checkbox-error-handling.component';
import { PlatformCozyChekboxExampleComponent } from './examples/platform-multiselect-checkbox.component';
import { PlatformChekboxTristateComponent } from './examples/platform-tristate-checkbox.component';
const multiselectCheckboxhtml = 'platform-multiselect-checkbox.component.html';
const multiselectCheckboxSrc = 'platform-multiselect-checkbox.component.ts';
const binaryCheckboxhtml = 'platform-binary-checkbox.component.html';
const binaryCheckboxSrc = 'platform-binary-checkbox.component.ts';
const checkboxStylehtml = 'platform-checkbox-error-handling.component.html';
const checkboxStyleSrc = 'platform-checkbox-error-handling.component.ts';
const checkboxNoFormhtml = 'platform-binary-checkbox-no-form.component.html';
const checkboxNoFormSrc = 'platform-binary-checkbox-no-form.component.ts';
const triCheckboxhtml = 'platform-tristate-checkbox.component.html';
const triCheckboxSrc = 'platform-tristate-checkbox.component.ts';
const a11yCheckboxhtml = 'platform-checkbox-a11y.component.html';
const a11yCheckboxSrc = 'platform-checkbox-a11y.component.ts';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'platform-checkbox-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformCompactChekboxExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformChekboxNoFormComponent,
        PlatformCozyChekboxExampleComponent,
        PlatformChekboxTristateComponent,
        PlatformChekboxStyleComponent,
        PlatformChekboxA11yExampleComponent
    ]
})
export class PlatformCheckboxDocsComponent {
    multiselectCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(multiselectCheckboxhtml),
            fileName: 'platform-multiselect-checkbox'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(multiselectCheckboxSrc),
            fileName: 'platform-multiselect-checkbox',
            component: 'PlatformCozyChekboxExampleComponent'
        }
    ];

    binaryCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(binaryCheckboxhtml),
            fileName: 'platform-binary-checkbox'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(binaryCheckboxSrc),
            fileName: 'platform-binary-checkbox',
            component: 'PlatformCompactChekboxExampleComponent'
        }
    ];

    errorCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(checkboxStylehtml),
            fileName: 'platform-checkbox-error-handling'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(checkboxStyleSrc),
            fileName: 'platform-checkbox-error-handling',
            component: 'PlatformChekboxStyleComponent'
        }
    ];

    noFormCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(checkboxNoFormhtml),
            fileName: 'platform-binary-checkbox-no-form'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(checkboxNoFormSrc),
            fileName: 'platform-binary-checkbox-no-form',
            component: 'PlatformChekboxNoFormComponent'
        }
    ];

    triCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(triCheckboxhtml),
            fileName: 'platform-tristate-checkbox'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(triCheckboxSrc),
            fileName: 'platform-tristate-checkbox',
            component: 'PlatformChekboxTristateComponent'
        }
    ];

    a11yCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(a11yCheckboxhtml),
            fileName: 'platform-checkbox-a11y'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(a11yCheckboxSrc),
            fileName: 'platform-checkbox-a11y',
            component: 'PlatformChekboxA11yExampleComponent'
        }
    ];
}
