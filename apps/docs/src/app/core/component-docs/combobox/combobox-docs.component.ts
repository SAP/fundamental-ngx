import { Component } from '@angular/core';

import comboboxHTMLSrc from '!./examples/combobox-example.component.html?raw';
import comboboxTSSrc from '!./examples/combobox-example.component.ts?raw';
import comboboxDynHtml from '!./examples/combobox-dynamic-example.component.html?raw';
import comboboxDynTs from '!./examples/combobox-dynamic-example.component.ts?raw';
import comboboxAsyncHtml from '!./examples/combobox-async-example.component.html?raw';
import comboboxAsyncTs from '!./examples/combobox-async-example.component.ts?raw';
import comboboxDisplayHtml from '!./examples/combobox-displaywith-example.component.html?raw';
import comboboxDisplayTs from '!./examples/combobox-displaywith-example.component.ts?raw';
import comboboxTemplateH from '!./examples/combobox-template-example.component.html?raw';
import comboboxTemplateT from '!./examples/combobox-template-example.component.ts?raw';
import comboboxMobileH from '!./examples/combobox-mobile/combobox-mobile-example.component.html?raw';
import comboboxMobileT from '!./examples/combobox-mobile/combobox-mobile-example.component.ts?raw';
import comboboxDisabledTemplateH from '!./examples/combobox-disabled-example.component.html?raw';
import comboboxDisabledTemplateT from '!./examples/combobox-disabled-example.component.ts?raw';
import comboboxColumnsTemplateH from '!./examples/combobox-columns-example.component.html?raw';
import comboboxColumnsTemplateT from '!./examples/combobox-columns-example.component.ts?raw';
import comboboxGroupTemplateH from '!./examples/combobox-group-example.component.html?raw';
import comboboxGroupTemplateT from '!./examples/combobox-group-example.component.ts?raw';
import comboboxScss from '!./examples/combobox-example.component.scss?raw';
import comboboxFormT from '!./examples/combobox-forms-example.component.ts?raw';
import comboboxFormH from '!./examples/combobox-forms-example.component.html?raw';
import comboboxIncludesT from '!./examples/combobox-includes-example.component.ts?raw';
import comboboxIncludesH from '!./examples/combobox-includes-example.component.html?raw';
import comboboxHeightHtml from '!./examples/combobox-height-example.component.html?raw';
import comboboxHeightTs from '!./examples/combobox-height-example.component.ts?raw';
import comboboxSeaTs from '!./examples/combobox-search-function-example.component.ts?raw';
import comboboxSeaHtml from '!./examples/combobox-search-function-example.component.html?raw';
import comboboxProgramHtml from '!./examples/combobox-open-control-example.component.html?raw';
import comboboxProgramTs from '!./examples/combobox-open-control-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import comboboxSearchFieldHTMLSrc from '!./examples/combobox-search-field-example.component.html?raw';
import comboboxSearchFieldTSSrc from '!./examples/combobox-search-field-example.component.ts?raw';

@Component({
    selector: 'fd-combobox-docs',
    templateUrl: './combobox-docs.component.html'
})
export class ComboboxDocsComponent {
    comboboxBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxHTMLSrc,
            fileName: 'combobox-example',
            scssFileCode: comboboxScss
        },
        {
            language: 'typescript',
            component: 'ComboboxExampleComponent',
            code: comboboxTSSrc,
            fileName: 'combobox-example'
        }
    ];

    comboboxDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxDynHtml,
            fileName: 'combobox-dynamic-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxDynamicExampleComponent',
            code: comboboxDynTs,
            fileName: 'combobox-dynamic-example'
        }
    ];

    comboboxSearchFunctionExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxSeaHtml,
            fileName: 'combobox-search-function-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxSearchFunctionExampleComponent',
            code: comboboxSeaTs,
            fileName: 'combobox-search-function-example'
        }
    ];

    comboboxAsyncExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxAsyncHtml,
            fileName: 'combobox-async-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxAsyncExampleComponent',
            code: comboboxAsyncTs,
            fileName: 'combobox-async-example'
        }
    ];

    comboboxDisplayExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxDisplayHtml,
            fileName: 'combobox-displaywith-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxDisplaywithExampleComponent',
            code: comboboxDisplayTs,
            fileName: 'combobox-displaywith-example'
        }
    ];

    comboboxOpenChangeExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxProgramHtml,
            fileName: 'combobox-open-control-example'
        },
        {
            language: 'typescript',
            code: comboboxProgramTs,
            component: 'ComboboxOpenControlExampleComponent',
            fileName: 'combobox-open-control-example'
        }
    ];

    comboboxDisabledExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxDisabledTemplateH,
            fileName: 'combobox-disabled-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxDisabledExampleComponent',
            code: comboboxDisabledTemplateT,
            fileName: 'combobox-disabled-example'
        }
    ];

    comboboxColumnsExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxColumnsTemplateH,
            fileName: 'combobox-columns-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxColumnsExampleComponent',
            code: comboboxColumnsTemplateT,
            fileName: 'combobox-columns-example'
        }
    ];

    comboboxGroupExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxGroupTemplateH,
            fileName: 'combobox-group-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxGroupExampleComponent',
            code: comboboxGroupTemplateT,
            fileName: 'combobox-group-example'
        }
    ];

    comboboxTemplateExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxTemplateH,
            fileName: 'combobox-template-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxTemplateExampleComponent',
            code: comboboxTemplateT,
            fileName: 'combobox-template-example'
        }
    ];

    comboboxHeightExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxHeightHtml,
            fileName: 'combobox-height-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxHeightExampleComponent',
            code: comboboxHeightTs,
            fileName: 'combobox-height-example'
        }
    ];

    comboboxMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxMobileH,
            fileName: 'combobox-mobile-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxMobileExampleComponent',
            code: comboboxMobileT,
            fileName: 'combobox-mobile-example'
        }
    ];

    comboboxFormExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxFormH,
            fileName: 'combobox-forms-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxFormsExampleComponent',
            code: comboboxFormT,
            fileName: 'combobox-forms-example'
        }
    ];

    comboboxIncludesExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxIncludesH,
            fileName: 'combobox-includes-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxIncludesExampleComponent',
            code: comboboxIncludesT,
            fileName: 'combobox-includes-example'
        }
    ];

    comboboxSearchFieldExample: ExampleFile[] = [
        {
            language: 'html',
            code: comboboxSearchFieldHTMLSrc,
            fileName: 'combobox-search-field-example'
        },
        {
            language: 'typescript',
            component: 'ComboboxSearchFieldExampleComponent',
            code: comboboxSearchFieldTSSrc,
            fileName: 'combobox-search-field-example'
        }
    ];
}
