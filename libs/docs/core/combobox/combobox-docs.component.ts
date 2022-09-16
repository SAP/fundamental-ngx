import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const comboboxScss = 'combobox-example.component.scss';

const comboboxHTMLSrc = 'combobox-example.component.html';
const comboboxTSSrc = 'combobox-example.component.ts';
const comboboxDynHtml = 'combobox-dynamic-example.component.html';
const comboboxDynTs = 'combobox-dynamic-example.component.ts';
const comboboxAsyncHtml = 'combobox-async-example.component.html';
const comboboxAsyncTs = 'combobox-async-example.component.ts';
const comboboxDisplayHtml = 'combobox-displaywith-example.component.html';
const comboboxDisplayTs = 'combobox-displaywith-example.component.ts';
const comboboxTemplateH = 'combobox-template-example.component.html';
const comboboxTemplateT = 'combobox-template-example.component.ts';
const comboboxMobileH = 'combobox-mobile/combobox-mobile-example.component.html';
const comboboxMobileT = 'combobox-mobile/combobox-mobile-example.component.ts';
const comboboxDisabledTemplateH = 'combobox-disabled-example.component.html';
const comboboxDisabledTemplateT = 'combobox-disabled-example.component.ts';
const comboboxColumnsTemplateH = 'combobox-columns-example.component.html';
const comboboxColumnsTemplateT = 'combobox-columns-example.component.ts';
const comboboxGroupTemplateH = 'combobox-group-example.component.html';
const comboboxGroupTemplateT = 'combobox-group-example.component.ts';
const comboboxFormT = 'combobox-forms-example.component.ts';
const comboboxFormH = 'combobox-forms-example.component.html';
const comboboxIncludesT = 'combobox-includes-example.component.ts';
const comboboxIncludesH = 'combobox-includes-example.component.html';
const comboboxHeightHtml = 'combobox-height-example.component.html';
const comboboxHeightTs = 'combobox-height-example.component.ts';
const comboboxSeaTs = 'combobox-search-function-example.component.ts';
const comboboxSeaHtml = 'combobox-search-function-example.component.html';
const comboboxProgramHtml = 'combobox-open-control-example.component.html';
const comboboxProgramTs = 'combobox-open-control-example.component.ts';
const comboboxSearchFieldHTMLSrc = 'combobox-search-field-example.component.html';
const comboboxSearchFieldTSSrc = 'combobox-search-field-example.component.ts';

const comboboxBylineHtml = 'combobox-byline-example.component.html';
const comboboxBylineTs = 'combobox-byline-example.component.ts';

@Component({
    selector: 'fd-combobox-docs',
    templateUrl: './combobox-docs.component.html'
})
export class ComboboxDocsComponent {
    comboboxBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxHTMLSrc),
            fileName: 'combobox-example',
            scssFileCode: getAssetFromModuleAssets(comboboxScss)
        },
        {
            language: 'typescript',
            component: 'ComboboxExampleComponent',
            code: getAssetFromModuleAssets(comboboxTSSrc),
            fileName: 'combobox-example'
        }
    ];

    comboboxDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxDynHtml),
            fileName: 'combobox-dynamic-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxDynamicExampleComponent',
            code: getAssetFromModuleAssets(comboboxDynTs),
            fileName: 'combobox-dynamic-example'
        }
    ];

    comboboxSearchFunctionExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxSeaHtml),
            fileName: 'combobox-search-function-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxSearchFunctionExampleComponent',
            code: getAssetFromModuleAssets(comboboxSeaTs),
            fileName: 'combobox-search-function-example'
        }
    ];

    comboboxAsyncExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxAsyncHtml),
            fileName: 'combobox-async-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxAsyncExampleComponent',
            code: getAssetFromModuleAssets(comboboxAsyncTs),
            fileName: 'combobox-async-example'
        }
    ];

    comboboxDisplayExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxDisplayHtml),
            fileName: 'combobox-displaywith-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxDisplaywithExampleComponent',
            code: getAssetFromModuleAssets(comboboxDisplayTs),
            fileName: 'combobox-displaywith-example'
        }
    ];

    comboboxOpenChangeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxProgramHtml),
            fileName: 'combobox-open-control-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(comboboxProgramTs),
            component: 'ComboboxOpenControlExampleComponent',
            fileName: 'combobox-open-control-example'
        }
    ];

    comboboxDisabledExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxDisabledTemplateH),
            fileName: 'combobox-disabled-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxDisabledExampleComponent',
            code: getAssetFromModuleAssets(comboboxDisabledTemplateT),
            fileName: 'combobox-disabled-example'
        }
    ];

    comboboxColumnsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxColumnsTemplateH),
            fileName: 'combobox-columns-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxColumnsExampleComponent',
            code: getAssetFromModuleAssets(comboboxColumnsTemplateT),
            fileName: 'combobox-columns-example'
        }
    ];

    comboboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxGroupTemplateH),
            fileName: 'combobox-group-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxGroupExampleComponent',
            code: getAssetFromModuleAssets(comboboxGroupTemplateT),
            fileName: 'combobox-group-example'
        }
    ];

    comboboxTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxTemplateH),
            fileName: 'combobox-template-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxTemplateExampleComponent',
            code: getAssetFromModuleAssets(comboboxTemplateT),
            fileName: 'combobox-template-example'
        }
    ];

    comboboxHeightExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxHeightHtml),
            fileName: 'combobox-height-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxHeightExampleComponent',
            code: getAssetFromModuleAssets(comboboxHeightTs),
            fileName: 'combobox-height-example'
        }
    ];

    comboboxMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxMobileH),
            fileName: 'combobox-mobile-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxMobileExampleComponent',
            code: getAssetFromModuleAssets(comboboxMobileT),
            fileName: 'combobox-mobile-example'
        }
    ];

    comboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxFormH),
            fileName: 'combobox-forms-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxFormsExampleComponent',
            code: getAssetFromModuleAssets(comboboxFormT),
            fileName: 'combobox-forms-example'
        }
    ];

    comboboxIncludesExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxIncludesH),
            fileName: 'combobox-includes-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxIncludesExampleComponent',
            code: getAssetFromModuleAssets(comboboxIncludesT),
            fileName: 'combobox-includes-example'
        }
    ];

    comboboxSearchFieldExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxSearchFieldHTMLSrc),
            fileName: 'combobox-search-field-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxSearchFieldExampleComponent',
            code: getAssetFromModuleAssets(comboboxSearchFieldTSSrc),
            fileName: 'combobox-search-field-example'
        }
    ];

    comboboxBylineExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(comboboxBylineHtml),
            fileName: 'combobox-byline-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxBylineExampleComponent',
            code: getAssetFromModuleAssets(comboboxBylineTs),
            fileName: 'combobox-byline-example'
        }
    ];
}
