import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const multiComboboxDatasourceHtml = 'multi-combobox-datasource/multi-combobox-datasource-example.component.html';
const multiComboboxDatasourceTs = 'multi-combobox-datasource/multi-combobox-datasource-example.component.ts';
const multiComboboxMobileHtml = 'multi-combobox-mobile/multi-combobox-mobile-example.component.html';
const multiComboboxMobileTs = 'multi-combobox-mobile/multi-combobox-mobile-example.component.ts';
const multiComboboxFormsHtml = 'multi-combobox-forms/multi-combobox-forms-example.component.html';
const multiComboboxFormsTs = 'multi-combobox-forms/multi-combobox-forms-example.component.ts';
const multiComboboxGroupHtml = 'multi-combobox-group/multi-combobox-group-example.component.html';
const multiComboboxGroupTs = 'multi-combobox-group/multi-combobox-group-example.component.ts';
const multiComboboxColumnsHtml = 'multi-combobox-columns/multi-combobox-columns-example.component.html';
const multiComboboxColumnsTs = 'multi-combobox-columns/multi-combobox-columns-example.component.ts';
const multiComboboxStatesHtml = 'multi-combobox-states/multi-combobox-states-example.component.html';
const multiComboboxStatesTs = 'multi-combobox-states/multi-combobox-states-example.component.ts';
const multiComboboxLoadingHtml = 'multi-combobox-loading/multi-combobox-loading-example.component.html';
const multiComboboxLoadingTs = 'multi-combobox-loading/multi-combobox-loading-example.component.ts';

@Component({
    selector: 'platform-multi-combobox-docs',
    templateUrl: './platform-multi-combobox-docs.component.html'
})
export class PlatformMultiComboboxDocsComponent {
    multiComboboxDatasourceExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-datasource-example',
            code: getAssetFromModuleAssets(multiComboboxDatasourceHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-datasource-example',
            code: getAssetFromModuleAssets(multiComboboxDatasourceTs),
            component: 'MultiComboboxDatasourceExampleComponent'
        }
    ];

    multiComboboxMobileExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-mobile-example',
            code: getAssetFromModuleAssets(multiComboboxMobileHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-mobile-example',
            code: getAssetFromModuleAssets(multiComboboxMobileTs),
            component: 'MultiComboboxMobileExampleComponent'
        }
    ];

    multiComboboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-group-example',
            code: getAssetFromModuleAssets(multiComboboxGroupHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-group-example',
            code: getAssetFromModuleAssets(multiComboboxGroupTs),
            component: 'MultiComboboxGroupExampleComponent'
        }
    ];

    multiComboboxColumnsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-columns-example',
            code: getAssetFromModuleAssets(multiComboboxColumnsHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-columns-example',
            code: getAssetFromModuleAssets(multiComboboxColumnsTs),
            component: 'MultiComboboxColumnsExampleComponent'
        }
    ];

    multiComboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-forms-example',
            code: getAssetFromModuleAssets(multiComboboxFormsHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-forms-example',
            code: getAssetFromModuleAssets(multiComboboxFormsTs),
            component: 'MultiComboboxFormsExampleComponent'
        }
    ];

    multiComboboxStatesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-states-example',
            code: getAssetFromModuleAssets(multiComboboxStatesHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-states-example',
            code: getAssetFromModuleAssets(multiComboboxStatesTs),
            component: 'MultiComboboxStatesExampleComponent'
        }
    ];

    multiComboboxLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'multi-combobox-loading-example',
            code: getAssetFromModuleAssets(multiComboboxLoadingHtml)
        },
        {
            language: 'typescript',
            fileName: 'multi-combobox-loading-example',
            code: getAssetFromModuleAssets(multiComboboxLoadingTs),
            component: 'MultiComboboxLoadingExampleComponent'
        }
    ];
}
