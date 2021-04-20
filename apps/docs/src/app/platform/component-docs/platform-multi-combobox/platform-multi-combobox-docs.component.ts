import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as multiComboboxDatasourceHtml from '!raw-loader!./examples/multi-combobox-datasource/multi-combobox-datasource-example.component.html';
import * as multiComboboxDatasourceTs from '!raw-loader!./examples/multi-combobox-datasource/multi-combobox-datasource-example.component';
import * as multiComboboxMobileHtml from '!raw-loader!./examples/multi-combobox-mobile/multi-combobox-mobile-example.component.html';
import * as multiComboboxMobileTs from '!raw-loader!./examples/multi-combobox-mobile/multi-combobox-mobile-example.component';
import * as multiComboboxFormsHtml from '!raw-loader!./examples/multi-combobox-forms/multi-combobox-forms-example.component.html';
import * as multiComboboxFormsTs from '!raw-loader!./examples/multi-combobox-forms/multi-combobox-forms-example.component';
import * as multiComboboxGroupHtml from '!raw-loader!./examples/multi-combobox-group/multi-combobox-group-example.component.html';
import * as multiComboboxGroupTs from '!raw-loader!./examples/multi-combobox-group/multi-combobox-group-example.component';
import * as multiComboboxColumnsHtml from '!raw-loader!./examples/multi-combobox-columns/multi-combobox-columns-example.component.html';
import * as multiComboboxColumnsTs from '!raw-loader!./examples/multi-combobox-columns/multi-combobox-columns-example.component';

@Component({
    selector: 'platform-multi-combobox-docs',
    templateUrl: './platform-multi-combobox-docs.component.html'
})
export class PlatformMultiComboboxDocsComponent {
    multiComboboxDatasourceExample: ExampleFile[] = [{
        language: 'html',
        fileName: 'multi-combobox-datasource-example',
        code: multiComboboxDatasourceHtml
    }, {
        language: 'typescript',
        fileName: 'multi-combobox-datasource-example',
        code: multiComboboxDatasourceTs,
        component: 'MultiComboboxDatasourceExampleComponent'
    }];

    multiComboboxMobileExample: ExampleFile[] = [{
        language: 'html',
        fileName: 'multi-combobox-mobile-example',
        code: multiComboboxMobileHtml
    }, {
        language: 'typescript',
        fileName: 'multi-combobox-mobile-example',
        code: multiComboboxMobileTs,
        component: 'MultiComboboxMobileExampleComponent'
    }];

    multiComboboxGroupExample: ExampleFile[] = [{
        language: 'html',
        fileName: 'multi-combobox-group-example',
        code: multiComboboxGroupHtml
    }, {
        language: 'typescript',
        fileName: 'multi-combobox-group-example',
        code: multiComboboxGroupTs,
        component: 'MultiComboboxGroupExampleComponent'
    }];

    multiComboboxColumnsExample: ExampleFile[] = [{
        language: 'html',
        fileName: 'multi-combobox-columns-example',
        code: multiComboboxColumnsHtml
    }, {
        language: 'typescript',
        fileName: 'multi-combobox-columns-example',
        code: multiComboboxColumnsTs,
        component: 'MultiComboboxColumnsExampleComponent'
    }];

    multiComboboxFormExample: ExampleFile[] = [{
        language: 'html',
        fileName: 'multi-combobox-forms-example',
        code: multiComboboxFormsHtml
    }, {
        language: 'typescript',
        fileName: 'multi-combobox-forms-example',
        code: multiComboboxFormsTs,
        component: 'MultiComboboxFormsExampleComponent'
    }];
}
