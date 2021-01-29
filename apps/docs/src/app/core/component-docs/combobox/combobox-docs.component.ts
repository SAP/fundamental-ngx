import { Component } from '@angular/core';

import * as comboboxHTMLSrc from '!raw-loader!./examples/combobox-example.component.html';
import * as comboboxTSSrc from '!raw-loader!./examples/combobox-example.component.ts';
import * as comboboxDynHtml from '!raw-loader!./examples/combobox-dynamic-example.component.html';
import * as comboboxDynTs from '!raw-loader!./examples/combobox-dynamic-example.component.ts';
import * as comboboxAsyncHtml from '!raw-loader!./examples/combobox-async-example.component.html';
import * as comboboxAsyncTs from '!raw-loader!./examples/combobox-async-example.component.ts';
import * as comboboxDisplayHtml from '!raw-loader!./examples/combobox-displaywith-example.component.html';
import * as comboboxDisplayTs from '!raw-loader!./examples/combobox-displaywith-example.component.ts';
import * as comboboxTemplateH from '!raw-loader!./examples/combobox-template-example.component.html';
import * as comboboxTemplateT from '!raw-loader!./examples/combobox-template-example.component.ts';
import * as comboboxMobileH from '!raw-loader!./examples/combobox-mobile/combobox-mobile-example.component.html';
import * as comboboxMobileT from '!raw-loader!./examples/combobox-mobile/combobox-mobile-example.component.ts';
import * as comboboxDisabledTemplateH from '!raw-loader!./examples/combobox-disabled-example.component.html';
import * as comboboxDisabledTemplateT from '!raw-loader!./examples/combobox-disabled-example.component.ts';
import * as comboboxColumnsTemplateH from '!raw-loader!./examples/combobox-columns-example.component.html';
import * as comboboxColumnsTemplateT from '!raw-loader!./examples/combobox-columns-example.component.ts';
import * as comboboxGroupTemplateH from '!raw-loader!./examples/combobox-group-example.component.html';
import * as comboboxGroupTemplateT from '!raw-loader!./examples/combobox-group-example.component.ts';
import * as comboboxScss from '!raw-loader!./examples/combobox-example.component.scss';
import * as comboboxFormT from '!raw-loader!./examples/combobox-forms-example.component.ts';
import * as comboboxFormH from '!raw-loader!./examples/combobox-forms-example.component.html';
import * as comboboxIncludesT from '!raw-loader!./examples/combobox-includes-example.component.ts';
import * as comboboxIncludesH from '!raw-loader!./examples/combobox-includes-example.component.html';
import * as comboboxHeightHtml from '!raw-loader!./examples/combobox-height-example.component.html';
import * as comboboxHeightTs from '!raw-loader!./examples/combobox-height-example.component.ts';
import * as comboboxSeaTs from '!raw-loader!./examples/combobox-search-function-example.component.ts';
import * as comboboxSeaHtml from '!raw-loader!./examples/combobox-search-function-example.component.html';
import * as comboboxProgramHtml from '!raw-loader!./examples/combobox-open-control-example.component.html';
import * as comboboxProgramTs from '!raw-loader!./examples/combobox-open-control-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as comboboxSearchFieldHTMLSrc from '!raw-loader!./examples/combobox-search-field-example.component.html';
import * as comboboxSearchFieldTSSrc from '!raw-loader!./examples/combobox-search-field-example.component.ts';

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
