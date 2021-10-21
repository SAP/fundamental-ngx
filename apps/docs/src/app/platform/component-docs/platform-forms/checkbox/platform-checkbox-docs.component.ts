import { Component } from '@angular/core';
import * as multiselectCheckboxhtml from '!raw-loader!./platform-checkbox-examples/platform-multiselect-checkbox.component.html';
import * as multiselectCheckboxSrc from '!raw-loader!./platform-checkbox-examples/platform-multiselect-checkbox.component.ts';
import * as binaryCheckboxhtml from '!raw-loader!./platform-checkbox-examples/platform-binary-checkbox.component.html';
import * as binaryCheckboxSrc from '!raw-loader!./platform-checkbox-examples/platform-binary-checkbox.component.ts';
import * as checkboxStylehtml from '!raw-loader!./platform-checkbox-examples/platform-checkbox-error-handling.component.html';
import * as checkboxStyleSrc from '!raw-loader!./platform-checkbox-examples/platform-checkbox-error-handling.component.ts';
import * as checkboxNoFormhtml from '!raw-loader!./platform-checkbox-examples/platform-binary-checkbox-no-form.component.html';
import * as checkboxNoFormSrc from '!raw-loader!./platform-checkbox-examples/platform-binary-checkbox-no-form.component.ts';
import * as triCheckboxhtml from '!raw-loader!./platform-checkbox-examples/platform-tristate-checkbox.component.html';
import * as triCheckboxSrc from '!raw-loader!./platform-checkbox-examples/platform-tristate-checkbox.component.ts';
import * as a11yCheckboxhtml from '!raw-loader!./platform-checkbox-examples/platform-checkbox-a11y.component.html';
import * as a11yCheckboxSrc from '!raw-loader!./platform-checkbox-examples/platform-checkbox-a11y.component.ts';
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
