import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const popoverSrcScss = 'popover-simple/popover-example.component.scss';
const popoverProgrammaticScssSrc = 'popover-programmatic/popover-programmatic-open-example.component.scss';
const dropdownPopoverScss = 'popover-dropdown/popover-dropdown.component.scss';

const popoverSrc = 'popover-simple/popover-example.component.html';
const popoverSrcTs = 'popover-simple/popover-example.component.ts';
const popoverComplexSrc = 'popover-complex-example/popover-complex-example.component.html';
const popoverComplexSrcTs = 'popover-complex-example/popover-complex-example.component.ts';
const popoverProgrammaticHtmlSrc = 'popover-programmatic/popover-programmatic-open-example.component.html';
const popoverProgrammaticTsSrc = 'popover-programmatic/popover-programmatic-open-example.component.ts';
const popoverPlacementHtmlSrc = 'popover-placement/popover-placement-example.component.html';
const popoverPlacementTsSrc = 'popover-placement/popover-placement-example.component.ts';
const popoverDialogHtmlSrc = 'popover-dialog/popover-dialog-example.component.html';
const popoverDialogTsSrc = 'popover-dialog/popover-dialog-example.component.ts';
const popoverFillHSrc = 'popover-c-fill/popover-c-fill.component.html';
const popoverFillSrcTs = 'popover-c-fill/popover-c-fill.component.ts';
const popoverDynamicHSrc = 'popover-dynamic/popover-dynamic-example.component.html';
const popoverDynamicTSrc = 'popover-dynamic/popover-dynamic-example.component.ts';
const dropdownPopoverHtml = 'popover-dropdown/popover-dropdown.component.html';
const dropdownPopoverTs = 'popover-dropdown/popover-dropdown-example.component.ts';
const dropdownContainerSrcTs = 'popover-container-example/popover-container-example.component.ts';
const dropdownContainerSrc = 'popover-container-example/popover-container-example.component.html';
const popoverFocusSrcTs = 'popover-focus-example/popover-focus-example.component.ts';
const popoverFocusSrcH = 'popover-focus-example/popover-focus-example.component.html';
const popoverCdkPlacementSrcTs = 'popover-new-placement/popover-cdk-placement-example.component.ts';
const popoverCdkPlacementSrcH = 'popover-new-placement/popover-cdk-placement-example.component.html';
const popoverCdkScrollSrcTs = 'popover-scroll-example/popover-scroll-example.component.ts';
const popoverCdkScrollSrcH = 'popover-scroll-example/popover-scroll-example.component.html';
const popoverTriggerSrcTs = 'popover-trigger-example/popover-trigger-example.component.ts';
const popoverTriggerTsSrc = 'popover-trigger-example/popover-trigger-example.component.ts';
const popoverTriggerSrc = 'popover-trigger-example/popover-trigger-example.component.html';
const mobilePopoverHtmlSrc = 'popover-mobile/popover-mobile-example.component.html';
const mobilePopoverTsSrc = 'popover-mobile/popover-mobile-example.component.ts';

const dynamicContainerHeightHtmlSrc =
    'popover-dynamic-container-height/popover-dynamic-container-height-example.component.html';
const dynamicContainerHeightTsSrc =
    'popover-dynamic-container-height/popover-dynamic-container-height-example.component.ts';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {
    popoverExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverSrc),
            fileName: 'popover-example',
            typescriptFileCode: getAssetFromModuleAssets(popoverSrcTs),
            component: 'PopoverExampleComponent',
            scssFileCode: getAssetFromModuleAssets(popoverSrcScss)
        }
    ];

    popoverComplex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverComplexSrc),
            fileName: 'popover-complex-example',
            typescriptFileCode: getAssetFromModuleAssets(popoverComplexSrcTs),
            component: 'PopoverComplexExampleComponent',
            scssFileCode: getAssetFromModuleAssets(popoverSrcScss)
        }
    ];

    popoverContainer: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dropdownContainerSrc),
            fileName: 'popover-container-example',
            component: 'PopoverContainerExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dropdownContainerSrcTs),
            fileName: 'popover-container-example',
            component: 'PopoverContainerExampleComponent'
        }
    ];

    popoverTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverTriggerSrc),
            fileName: 'popover-trigger-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(popoverTriggerSrcTs),
            fileName: 'popover-trigger-example',
            typescriptFileCode: getAssetFromModuleAssets(popoverTriggerTsSrc),
            component: 'PopoverTriggerExampleComponent'
        }
    ];

    focusTrapExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverFocusSrcH),
            fileName: 'popover-focus-example',
            typescriptFileCode: getAssetFromModuleAssets(popoverFocusSrcTs),
            component: 'PopoverFocusExampleComponent'
        }
    ];

    cdkPlacementExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverCdkPlacementSrcH),
            fileName: 'popover-cdk-placement-example',
            component: 'PopoverCdkPlacementExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(popoverCdkPlacementSrcTs),
            fileName: 'popover-cdk-placement-example',
            component: 'PopoverCdkPlacementExampleComponent'
        }
    ];

    cdkScrollExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverCdkScrollSrcH),
            fileName: 'popover-scroll-example',
            component: 'PopoverScrollExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(popoverCdkScrollSrcTs),
            fileName: 'popover-scroll-example',
            component: 'PopoverScrollExampleComponent'
        }
    ];

    popoverProgrammaticExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverProgrammaticHtmlSrc),
            fileName: 'popover-programmatic-open-example',
            scssFileCode: getAssetFromModuleAssets(popoverProgrammaticScssSrc)
        },
        {
            language: 'typescript',
            component: 'PopoverProgrammaticOpenExampleComponent',
            code: getAssetFromModuleAssets(popoverProgrammaticTsSrc),
            fileName: 'popover-programmatic-open-example'
        }
    ];

    popoverPlacementExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverPlacementHtmlSrc),
            fileName: 'popover-placement-example'
        },
        {
            language: 'typescript',
            component: 'PopoverPlacementExampleComponent',
            code: getAssetFromModuleAssets(popoverPlacementTsSrc),
            fileName: 'popover-placement-example'
        }
    ];

    popoverDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverDialogHtmlSrc),
            fileName: 'popover-dialog-example'
        },
        {
            language: 'typescript',
            component: 'PopoverDialogExampleComponent',
            code: getAssetFromModuleAssets(popoverDialogTsSrc),
            fileName: 'popover-dialog-example'
        }
    ];

    popoverDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverDynamicHSrc),
            fileName: 'popover-dynamic-example'
        },
        {
            language: 'typescript',
            component: 'PopoverDynamicExampleComponent',
            code: getAssetFromModuleAssets(popoverDynamicTSrc),
            fileName: 'popover-dynamic-example'
        }
    ];

    popoverFillExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverFillHSrc),
            fileName: 'popover-c-fill',
            typescriptFileCode: getAssetFromModuleAssets(popoverFillSrcTs),
            component: 'PopoverCFillComponent'
        }
    ];

    dropdownPopover: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dropdownPopoverHtml),
            fileName: 'popover-dropdown',
            scssFileCode: getAssetFromModuleAssets(dropdownPopoverScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dropdownPopoverTs),
            fileName: 'popover-dropdown-example',
            typescriptFileCode: getAssetFromModuleAssets(dropdownPopoverTs),
            component: 'PopoverDropdownExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(dropdownPopoverScss),
            fileName: 'popover-dropdown',
            component: 'PopoverDropdownComponent',
            scssFileCode: getAssetFromModuleAssets(dropdownPopoverScss)
        }
    ];

    mobilePopover: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(mobilePopoverHtmlSrc),
            fileName: 'popover-mobile-example'
        },
        {
            language: 'typescript',
            component: 'PopoverMobileExampleComponent',
            code: getAssetFromModuleAssets(mobilePopoverTsSrc),
            fileName: 'popover-mobile-example'
        }
    ];

    dynamicContainerHeight: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dynamicContainerHeightHtmlSrc),
            fileName: 'popover-dynamic-container-height-example'
        },
        {
            language: 'typescript',
            component: 'PopoverDynamicContainerHeightExampleComponent',
            code: getAssetFromModuleAssets(dynamicContainerHeightTsSrc),
            fileName: 'popover-dynamic-container-height-example'
        }
    ];
}
