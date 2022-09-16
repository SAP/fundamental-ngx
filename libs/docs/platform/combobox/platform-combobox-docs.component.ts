import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const comboboxStandardHtml = 'combobox-standard/combobox-standard.component.html';
const comboboxStandardTs = 'combobox-standard/combobox-standard.component.ts';

const comboboxMobileHtml = 'combobox-mobile/combobox-mobile-example.component.html';
const comboboxMobileTs = 'combobox-mobile/combobox-mobile-example.component.ts';

const comboboxDatasourceHtml = 'combobox-datasource/combobox-datasource-example.component.html';
const comboboxDatasourceTs = 'combobox-datasource/combobox-datasource-example.component.ts';

const comboboxColumnsHtml = 'combobox-columns/combobox-columns-example.component.html';
const comboboxColumnsTs = 'combobox-columns/combobox-columns-example.component.ts';

const comboboxGroupHtml = 'combobox-group/combobox-group-example.component.html';
const comboboxGroupTs = 'combobox-group/combobox-group-example.component.ts';

const comboboxTemplatesHtml = 'combobox-templates/combobox-templates-example.component.html';
const comboboxTemplatesTs = 'combobox-templates/combobox-templates-example.component.ts';

const comboboxFormHtml = 'combobox-forms/combobox-forms-example.component.html';
const comboboxFormTs = 'combobox-forms/combobox-forms-example.component.ts';

const comboboxStatesHtml = 'combobox-states/combobox-states-example.component.html';
const comboboxStatesTs = 'combobox-states/combobox-states-example.component.ts';

const comboboxBylineHtml = 'combobox-byline/combobox-byline-example.component.html';
const comboboxBylineTs = 'combobox-byline/combobox-byline-example.component.ts';

const comboboxLoadingHtml = 'combobox-loading/combobox-loading-example.component.html';
const comboboxLoadingTs = 'combobox-loading/combobox-loading-example.component.ts';

@Component({
    selector: 'platform-combobox-docs',
    templateUrl: './platform-combobox-docs.component.html'
})
export class PlatformComboboxDocsComponent {
    comboboxStandard: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-standard',
            code: getAssetFromModuleAssets(comboboxStandardHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-standard',
            code: getAssetFromModuleAssets(comboboxStandardTs),
            component: 'ComboboxStandardComponent'
        }
    ];

    comboboxMobile: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-mobile-example',
            code: getAssetFromModuleAssets(comboboxMobileHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-mobile-example',
            code: getAssetFromModuleAssets(comboboxMobileTs),
            component: 'ComboboxMobileExampleComponent'
        }
    ];

    comboboxDatasource: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-datasource-example',
            code: getAssetFromModuleAssets(comboboxDatasourceHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-datasource-example',
            code: getAssetFromModuleAssets(comboboxDatasourceTs),
            component: 'ComboboxDatasourceExampleComponent'
        }
    ];

    comboboxColumns: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-columns-example',
            code: getAssetFromModuleAssets(comboboxColumnsHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-columns-example',
            code: getAssetFromModuleAssets(comboboxColumnsTs),
            component: 'ComboboxColumnsExampleComponent'
        }
    ];

    comboboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-group-example',
            code: getAssetFromModuleAssets(comboboxGroupHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-group-example',
            code: getAssetFromModuleAssets(comboboxGroupTs),
            component: 'ComboboxGroupExampleComponent'
        }
    ];

    comboboxTemplatesExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-templates-example',
            code: getAssetFromModuleAssets(comboboxTemplatesHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-templates-example',
            code: getAssetFromModuleAssets(comboboxTemplatesTs),
            component: 'ComboboxTemplatesExampleComponent'
        }
    ];

    comboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-forms-example',
            code: getAssetFromModuleAssets(comboboxFormHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-forms-example',
            code: getAssetFromModuleAssets(comboboxFormTs),
            component: 'ComboboxFormsExampleComponent'
        }
    ];

    comboboxStateExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-states-example',
            code: getAssetFromModuleAssets(comboboxStatesHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-states-example',
            code: getAssetFromModuleAssets(comboboxStatesTs),
            component: 'ComboboxStateComponent'
        }
    ];

    comboboxBylineExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-byline-example',
            code: getAssetFromModuleAssets(comboboxBylineHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-byline-example',
            code: getAssetFromModuleAssets(comboboxBylineTs),
            component: 'ComboboxBylineExampleComponent'
        }
    ];

    comboboxLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'combobox-loading-example',
            code: getAssetFromModuleAssets(comboboxLoadingHtml)
        },
        {
            language: 'typescript',
            fileName: 'combobox-loading-example',
            code: getAssetFromModuleAssets(comboboxLoadingTs),
            component: 'ComboboxLoadingExampleComponent'
        }
    ];
}
