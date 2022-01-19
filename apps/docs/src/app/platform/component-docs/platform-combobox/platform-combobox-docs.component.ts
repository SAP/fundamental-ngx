import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import comboboxStandardHtml from '!./examples/combobox-standard/combobox-standard.component.html?raw';
import comboboxStandardTs from '!./examples/combobox-standard/combobox-standard.component?raw';

import comboboxMobileHtml from '!./examples/combobox-mobile/combobox-mobile-example.component.html?raw';
import comboboxMobileTs from '!./examples/combobox-mobile/combobox-mobile-example.component?raw';

import comboboxDatasourceHtml from '!./examples/combobox-datasource/combobox-datasource-example.component.html?raw';
import comboboxDatasourceTs from '!./examples/combobox-datasource/combobox-datasource-example.component?raw';

import comboboxColumnsHtml from '!./examples/combobox-columns/combobox-columns-example.component.html?raw';
import comboboxColumnsTs from '!./examples/combobox-columns/combobox-columns-example.component?raw';

import comboboxGroupHtml from '!./examples/combobox-group/combobox-group-example.component.html?raw';
import comboboxGroupTs from '!./examples/combobox-group/combobox-group-example.component?raw';

import comboboxTemplatesHtml from '!./examples/combobox-templates/combobox-templates-example.component.html?raw';
import comboboxTemplatesTs from '!./examples/combobox-templates/combobox-templates-example.component?raw';

import comboboxFormHtml from '!./examples/combobox-forms/combobox-forms-example.component.html?raw';
import comboboxFormTs from '!./examples/combobox-forms/combobox-forms-example.component?raw';

import comboboxStatesHtml from '!./examples/combobox-states/combobox-states-example.component.html?raw';
import comboboxStatesTs from '!./examples/combobox-states/combobox-states-example.component?raw';

@Component({
    selector: 'platform-combobox-docs',
    templateUrl: './platform-combobox-docs.component.html'
})
export class PlatformComboboxDocsComponent {
    comboboxStandard: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-standard',
            code: comboboxStandardHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-standard',
            code: comboboxStandardTs,
            component: 'ComboboxStandardComponent'
        }
    ];

    comboboxMobile: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-mobile-example',
            code: comboboxMobileHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-mobile-example',
            code: comboboxMobileTs,
            component: 'ComboboxMobileExampleComponent'
        }
    ];

    comboboxDatasource: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-datasource-example',
            code: comboboxDatasourceHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-datasource-example',
            code: comboboxDatasourceTs,
            component: 'ComboboxDatasourceExampleComponent'
        }
    ];

    comboboxColumns: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-columns-example',
            code: comboboxColumnsHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-columns-example',
            code: comboboxColumnsTs,
            component: 'ComboboxColumnsExampleComponent'
        }
    ];

    comboboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-group-example',
            code: comboboxGroupHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-group-example',
            code: comboboxGroupTs,
            component: 'ComboboxGroupExampleComponent'
        }
    ];

    comboboxTemplatesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-templates-example',
            code: comboboxTemplatesHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-templates-example',
            code: comboboxTemplatesTs,
            component: 'ComboboxTemplatesExampleComponent'
        }
    ];

    comboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-forms-example',
            code: comboboxFormHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-forms-example',
            code: comboboxFormTs,
            component: 'ComboboxFormsExampleComponent'
        }
    ];

    comboboxStateExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-states-example',
            code: comboboxStatesHtml
        },
        {
            language: 'typescript',
            fileName: 'combobox-states-example',
            code: comboboxStatesTs,
            component: 'ComboboxStateComponent'
        }
    ];
}
