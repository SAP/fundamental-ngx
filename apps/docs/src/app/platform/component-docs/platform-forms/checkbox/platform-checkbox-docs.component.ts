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
            fileName: 'platform-cozy-checkbox-example'
        },
        {
            language: 'typescript',
            code: multiselectCheckboxSrc,
            fileName: 'platform-cozy-checkbox-example',
            component: 'PlatformCozyChekboxExampleComponent'
        }
    ];

    binaryCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: binaryCheckboxhtml,
            fileName: 'platform-compact-checkbox-example'
        },
        {
            language: 'typescript',
            code: binaryCheckboxSrc,
            fileName: 'platform-compact-checkbox-example',
            component: 'PlatformCompactChekboxExampleComponent'
        }
    ];

    errorCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxStylehtml,
            fileName: 'platform-checkbox-styling'
        },
        {
            language: 'typescript',
            code: checkboxStyleSrc,
            fileName: 'platform-checkbox-styling',
            component: 'PlatformChekboxStyleComponent'
        }
    ];

    noFormCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: checkboxNoFormhtml,
            fileName: 'platform-checkbox-no-form'
        },
        {
            language: 'typescript',
            code: checkboxNoFormSrc,
            fileName: 'platform-checkbox-no-form',
            component: 'PlatformChekboxNoFormComponent'
        }
    ];

    triCheckbox: ExampleFile[] = [
        {
            language: 'html',
            code: triCheckboxhtml,
            fileName: 'platform-checkbox-tristate'
        },
        {
            language: 'typescript',
            code: triCheckboxSrc,
            fileName: 'platform-checkbox-tristate',
            component: 'PlatformChekboxTristateComponent'
        }
    ];
}
