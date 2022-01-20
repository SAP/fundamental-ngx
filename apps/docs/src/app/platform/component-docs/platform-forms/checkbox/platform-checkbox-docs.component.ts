import { Component } from '@angular/core';
import multiselectCheckboxhtml from '!./platform-checkbox-examples/platform-multiselect-checkbox.component.html?raw';
import multiselectCheckboxSrc from '!./platform-checkbox-examples/platform-multiselect-checkbox.component.ts?raw';
import binaryCheckboxhtml from '!./platform-checkbox-examples/platform-binary-checkbox.component.html?raw';
import binaryCheckboxSrc from '!./platform-checkbox-examples/platform-binary-checkbox.component.ts?raw';
import checkboxStylehtml from '!./platform-checkbox-examples/platform-checkbox-error-handling.component.html?raw';
import checkboxStyleSrc from '!./platform-checkbox-examples/platform-checkbox-error-handling.component.ts?raw';
import checkboxNoFormhtml from '!./platform-checkbox-examples/platform-binary-checkbox-no-form.component.html?raw';
import checkboxNoFormSrc from '!./platform-checkbox-examples/platform-binary-checkbox-no-form.component.ts?raw';
import triCheckboxhtml from '!./platform-checkbox-examples/platform-tristate-checkbox.component.html?raw';
import triCheckboxSrc from '!./platform-checkbox-examples/platform-tristate-checkbox.component.ts?raw';
import a11yCheckboxhtml from '!./platform-checkbox-examples/platform-checkbox-a11y.component.html?raw';
import a11yCheckboxSrc from '!./platform-checkbox-examples/platform-checkbox-a11y.component.ts?raw';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-checkbox',
    templateUrl: 'platform-checkbox-docs.component.html'
})
export class PlatformCheckboxDocsComponent {
    multiselectCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: multiselectCheckboxhtml,
            fileName: 'platform-multiselect-checkbox'
        },
        {
            language: 'typescript',
            code: multiselectCheckboxSrc,
            fileName: 'platform-multiselect-checkbox',
            component: 'PlatformCozyChekboxExampleComponent'
        }
    ];

    binaryCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: binaryCheckboxhtml,
            fileName: 'platform-binary-checkbox'
        },
        {
            language: 'typescript',
            code: binaryCheckboxSrc,
            fileName: 'platform-binary-checkbox',
            component: 'PlatformCompactChekboxExampleComponent'
        }
    ];

    errorCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxStylehtml,
            fileName: 'platform-checkbox-error-handling'
        },
        {
            language: 'typescript',
            code: checkboxStyleSrc,
            fileName: 'platform-checkbox-error-handling',
            component: 'PlatformChekboxStyleComponent'
        }
    ];

    noFormCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxNoFormhtml,
            fileName: 'platform-binary-checkbox-no-form'
        },
        {
            language: 'typescript',
            code: checkboxNoFormSrc,
            fileName: 'platform-binary-checkbox-no-form',
            component: 'PlatformChekboxNoFormComponent'
        }
    ];

    triCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: triCheckboxhtml,
            fileName: 'platform-tristate-checkbox'
        },
        {
            language: 'typescript',
            code: triCheckboxSrc,
            fileName: 'platform-tristate-checkbox',
            component: 'PlatformChekboxTristateComponent'
        }
    ];

    a11yCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: a11yCheckboxhtml,
            fileName: 'platform-checkbox-a11y'
        },
        {
            language: 'typescript',
            code: a11yCheckboxSrc,
            fileName: 'platform-checkbox-a11y',
            component: 'PlatformChekboxA11yExampleComponent'
        }
    ];
}
