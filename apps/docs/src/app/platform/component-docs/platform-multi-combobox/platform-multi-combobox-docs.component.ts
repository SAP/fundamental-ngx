import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import multiComboboxDatasourceHtml from '!./examples/multi-combobox-datasource/multi-combobox-datasource-example.component.html?raw';
import multiComboboxDatasourceTs from '!./examples/multi-combobox-datasource/multi-combobox-datasource-example.component?raw';
import multiComboboxMobileHtml from '!./examples/multi-combobox-mobile/multi-combobox-mobile-example.component.html?raw';
import multiComboboxMobileTs from '!./examples/multi-combobox-mobile/multi-combobox-mobile-example.component?raw';
import multiComboboxFormsHtml from '!./examples/multi-combobox-forms/multi-combobox-forms-example.component.html?raw';
import multiComboboxFormsTs from '!./examples/multi-combobox-forms/multi-combobox-forms-example.component?raw';
import multiComboboxGroupHtml from '!./examples/multi-combobox-group/multi-combobox-group-example.component.html?raw';
import multiComboboxGroupTs from '!./examples/multi-combobox-group/multi-combobox-group-example.component?raw';
import multiComboboxColumnsHtml from '!./examples/multi-combobox-columns/multi-combobox-columns-example.component.html?raw';
import multiComboboxColumnsTs from '!./examples/multi-combobox-columns/multi-combobox-columns-example.component?raw';
import multiComboboxStatesHtml from '!./examples/multi-combobox-states/multi-combobox-states-example.component.html?raw';
import multiComboboxStatesTs from '!./examples/multi-combobox-states/multi-combobox-states-example.component?raw';
import multiComboboxLoadingHtml from '!./examples/multi-combobox-loading/multi-combobox-loading-example.component.html?raw';
import multiComboboxLoadingTs from '!./examples/multi-combobox-loading/multi-combobox-loading-example.component?raw';

@Component({
    selector: 'platform-multi-combobox-docs',
    templateUrl: './platform-multi-combobox-docs.component.html'
})
export class PlatformMultiComboboxDocsComponent {
    multiComboboxDatasourceExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-datasource-example',
            code: multiComboboxDatasourceHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-datasource-example',
            code: multiComboboxDatasourceTs,
            component: 'MultiComboboxDatasourceExampleComponent'
        }
    ];

    multiComboboxMobileExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-mobile-example',
            code: multiComboboxMobileHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-mobile-example',
            code: multiComboboxMobileTs,
            component: 'MultiComboboxMobileExampleComponent'
        }
    ];

    multiComboboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-group-example',
            code: multiComboboxGroupHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-group-example',
            code: multiComboboxGroupTs,
            component: 'MultiComboboxGroupExampleComponent'
        }
    ];

    multiComboboxColumnsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-columns-example',
            code: multiComboboxColumnsHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-columns-example',
            code: multiComboboxColumnsTs,
            component: 'MultiComboboxColumnsExampleComponent'
        }
    ];

    multiComboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-forms-example',
            code: multiComboboxFormsHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-forms-example',
            code: multiComboboxFormsTs,
            component: 'MultiComboboxFormsExampleComponent'
        }
    ];

    multiComboboxStatesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-states-example',
            code: multiComboboxStatesHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-states-example',
            code: multiComboboxStatesTs,
            component: 'MultiComboboxStatesExampleComponent'
        }
    ];

    multiComboboxLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-loading-example',
            code: multiComboboxLoadingHtml
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-loading-example',
            code: multiComboboxLoadingTs,
            component: 'MultiComboboxLoadingExampleComponent'
        }
    ];
}
