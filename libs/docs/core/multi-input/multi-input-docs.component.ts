import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const simpleH = 'multi-input-example/multi-input-example.component.html';
const simpleT = 'multi-input-example/multi-input-example.component.ts';

const displayH = 'multi-input-displaywith-example/multi-input-displaywith-example.component.html';
const displayT = 'multi-input-displaywith-example/multi-input-displaywith-example.component.ts';

const filterH = 'multi-input-filter-example/multi-input-filter-example.component.html';
const filterT = 'multi-input-filter-example/multi-input-filter-example.component.ts';

const includesH = 'multi-input-includes-example/multi-input-includes-example.component.html';
const includesT = 'multi-input-includes-example/multi-input-includes-example.component.ts';

const asyncH = 'multi-input-async-example/multi-input-async-example.component.html';
const asyncT = 'multi-input-async-example/multi-input-async-example.component.ts';

const compactH = 'multi-input-compact-example/multi-input-compact-example.component.html';
const compactT = 'multi-input-compact-example/multi-input-compact-example.component.ts';

const formH = 'multi-input-form-example/multi-input-form-example.component.html';
const formT = 'multi-input-form-example/multi-input-form-example.component.ts';

const newTokensH = 'multi-input-new-tokens-example/multi-input-new-tokens-example.component.html';
const newTokensT = 'multi-input-new-tokens-example/multi-input-new-tokens-example.component.ts';

const mobileH = 'multi-input-mobile-example/multi-input-mobile-example.component.html';
const mobileT = 'multi-input-mobile-example/multi-input-mobile-example.component.ts';

const customH = 'multi-input-custom-item-example/multi-input-custom-item-example.component.html';
const customT = 'multi-input-custom-item-example/multi-input-custom-item-example.component.ts';

const widthH = 'multi-input-dropdown-width-example/multi-input-dropdown-width-example.component.html';
const widthT = 'multi-input-dropdown-width-example/multi-input-dropdown-width-example.component.ts';

const addonH = 'multi-input-addon-clicked-example/multi-input-addon-clicked-example.component.html';
const addonT = 'multi-input-addon-clicked-example/multi-input-addon-clicked-example.component.ts';

@Component({
    selector: 'app-multi-input-docs',
    templateUrl: './multi-input-docs.component.html',
    styleUrls: ['./multi-input-docs.component.scss']
})
export class MultiInputDocsComponent {
    multiInputBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(simpleH),
            fileName: 'multi-input-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputExampleComponent',
            code: getAssetFromModuleAssets(simpleT),
            fileName: 'multi-input-example'
        }
    ];

    display: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(displayH),
            fileName: 'multi-input-displaywith-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputDisplaywithExampleComponent',
            code: getAssetFromModuleAssets(displayT),
            fileName: 'multi-input-displaywith-example'
        }
    ];

    filter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(filterH),
            fileName: 'multi-input-filter-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputFilterExampleComponent',
            code: getAssetFromModuleAssets(filterT),
            fileName: 'multi-input-filter-example'
        }
    ];

    includes: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(includesH),
            fileName: 'multi-input-includes-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputIncludesExampleComponent',
            code: getAssetFromModuleAssets(includesT),
            fileName: 'multi-input-includes-example'
        }
    ];

    async: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(asyncH),
            fileName: 'multi-input-async-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputAsyncExampleComponent',
            code: getAssetFromModuleAssets(asyncT),
            fileName: 'multi-input-async-example'
        }
    ];

    compact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(compactH),
            fileName: 'multi-input-compact-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputCompactExampleComponent',
            code: getAssetFromModuleAssets(compactT),
            fileName: 'multi-input-compact-example'
        }
    ];

    form: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formH),
            fileName: 'multi-input-form-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputFormExampleComponent',
            code: getAssetFromModuleAssets(formT),
            fileName: 'multi-input-form-example'
        }
    ];

    mobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mobileH),
            fileName: 'multi-input-mobile-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputMobileExampleComponent',
            code: getAssetFromModuleAssets(mobileT),
            fileName: 'multi-input-mobile-example'
        }
    ];

    newTokens: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(newTokensH),
            fileName: 'multi-input-new-tokens-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputNewTokensExampleComponent',
            code: getAssetFromModuleAssets(newTokensT),
            fileName: 'multi-input-new-tokens-example'
        }
    ];

    customItem: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customH),
            fileName: 'multi-input-custom-item-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputCustomItemExampleComponent',
            code: getAssetFromModuleAssets(customT),
            fileName: 'multi-input-custom-item-example'
        }
    ];

    customWidth: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(widthH),
            fileName: 'multi-input-dropdown-width-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputDropdownWidthExampleComponent',
            code: getAssetFromModuleAssets(widthT),
            fileName: 'multi-input-dropdown-width-example'
        }
    ];

    addonClicked: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(addonH),
            fileName: 'multi-input-addon-clicked-example'
        },
        {
            language: 'typescript',
            component: 'MultiInputAddonClickedExampleComponent',
            code: getAssetFromModuleAssets(addonT),
            fileName: 'multi-input-addon-clicked-example'
        }
    ];
}
