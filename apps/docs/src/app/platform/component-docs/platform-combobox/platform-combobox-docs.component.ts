import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as comboboxStandardHtml from '!raw-loader!./examples/combobox-standard/combobox-standard.component.html';
import * as comboboxStandardTs from '!raw-loader!./examples/combobox-standard/combobox-standard.component';

import * as comboboxMobileHtml from '!raw-loader!./examples/combobox-mobile/combobox-mobile-example.component.html';
import * as comboboxMobileTs from '!raw-loader!./examples/combobox-mobile/combobox-mobile-example.component';

import * as comboboxDatasourceHtml from '!raw-loader!./examples/combobox-datasource/combobox-datasource-example.component.html';
import * as comboboxDatasourceTs from '!raw-loader!./examples/combobox-datasource/combobox-datasource-example.component';

import * as comboboxColumnsHtml from '!raw-loader!./examples/combobox-columns/combobox-columns-example.component.html';
import * as comboboxColumnsTs from '!raw-loader!./examples/combobox-columns/combobox-columns-example.component';

import * as comboboxGroupHtml from '!raw-loader!./examples/combobox-group/combobox-group-example.component.html';
import * as comboboxGroupTs from '!raw-loader!./examples/combobox-group/combobox-group-example.component';

import * as comboboxTemplatesHtml from '!raw-loader!./examples/combobox-templates/combobox-templates-example.component.html';
import * as comboboxTemplatesTs from '!raw-loader!./examples/combobox-templates/combobox-templates-example.component';

import * as comboboxFormHtml from '!raw-loader!./examples/combobox-forms/combobox-forms-example.component.html';
import * as comboboxFormTs from '!raw-loader!./examples/combobox-forms/combobox-forms-example.component';

import * as comboboxStatesHtml from '!raw-loader!./examples/combobox-states/combobox-states-example.component.html';
import * as comboboxStatesTs from '!raw-loader!./examples/combobox-states/combobox-states-example.component';

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
