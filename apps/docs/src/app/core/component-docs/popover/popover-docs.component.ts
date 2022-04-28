import { Component } from '@angular/core';

import popoverSrc from '!./examples/popover-simple/popover-example.component.html?raw';
import popoverSrcScss from '!./examples/popover-simple/popover-example.component.scss?raw';
import popoverSrcTs from '!./examples/popover-simple/popover-example.component.ts?raw';
import popoverComplexSrc from '!./examples/popover-complex-example/popover-complex-example.component.html?raw';
import popoverComplexSrcTs from '!./examples/popover-complex-example/popover-complex-example.component.ts?raw';
import popoverProgrammaticHtmlSrc from '!./examples/popover-programmatic/popover-programmatic-open-example.component.html?raw';
import popoverProgrammaticScssSrc from '!./examples/popover-programmatic/popover-programmatic-open-example.component.scss?raw';
import popoverProgrammaticTsSrc from '!./examples/popover-programmatic/popover-programmatic-open-example.component.ts?raw';
import popoverPlacementHtmlSrc from '!./examples/popover-placement/popover-placement-example.component.html?raw';
import popoverPlacementTsSrc from '!./examples/popover-placement/popover-placement-example.component.ts?raw';
import popoverDialogHtmlSrc from '!./examples/popover-dialog/popover-dialog-example.component.html?raw';
import popoverDialogTsSrc from '!./examples/popover-dialog/popover-dialog-example.component.ts?raw';
import popoverFillHSrc from '!./examples/popover-c-fill/popover-c-fill.component.html?raw';
import popoverFillSrcTs from '!./examples/popover-c-fill/popover-c-fill.component.ts?raw';
import popoverDynamicHSrc from '!./examples/popover-dynamic/popover-dynamic-example.component.html?raw';
import popoverDynamicTSrc from '!./examples/popover-dynamic/popover-dynamic-example.component.ts?raw';
import dropdownPopoverHtml from '!./examples/popover-dropdown/popover-dropdown.component.html?raw';
import dropdownPopoverTs from '!./examples/popover-dropdown/popover-dropdown-example.component.ts?raw';
import dropdownPopoverScss from '!./examples/popover-dropdown/popover-dropdown.component.scss?raw';
import dropdownContainerSrcTs from '!./examples/popover-container-example/popover-container-example.component.ts?raw';
import dropdownContainerSrc from '!./examples/popover-container-example/popover-container-example.component.html?raw';
import popoverFocusSrcTs from '!./examples/popover-focus-example/popover-focus-example.component.ts?raw';
import popoverFocusSrcH from '!./examples/popover-focus-example/popover-focus-example.component.html?raw';
import popoverCdkPlacementSrcTs from '!./examples/popover-new-placement/popover-cdk-placement-example.component.ts?raw';
import popoverCdkPlacementSrcH from '!./examples/popover-new-placement/popover-cdk-placement-example.component.html?raw';
import popoverCdkScrollSrcTs from '!./examples/popover-scroll-example/popover-scroll-example.component.ts?raw';
import popoverCdkScrollSrcH from '!./examples/popover-scroll-example/popover-scroll-example.component.html?raw';
import popoverTriggerSrcTs from '!./examples/popover-trigger-example/popover-trigger-example.component.ts?raw';
import popoverTriggerSrc from '!./examples/popover-trigger-example/popover-trigger-example.component.html?raw';
import popoverTriggerTsSrc from '!./examples/popover-trigger-example/popover-trigger-example.component.ts?raw';
import mobilePopoverHtmlSrc from '!./examples/popover-mobile/popover-mobile-example.component.html?raw';
import mobilePopoverTsSrc from '!./examples/popover-mobile/popover-mobile-example.component.ts?raw';

import dynamicContainerHeightHtmlSrc from '!./examples/popover-dynamic-container-height/popover-dynamic-container-height-example.component.html?raw';
import dynamicContainerHeightTsSrc from '!./examples/popover-dynamic-container-height/popover-dynamic-container-height-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html'
})
export class PopoverDocsComponent {
    popoverExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverSrc,
            fileName: 'popover-example',
            typescriptFileCode: popoverSrcTs,
            component: 'PopoverExampleComponent',
            scssFileCode: popoverSrcScss
        }
    ];

    popoverComplex: ExampleFile[] = [
        {
            language: 'html',
            code: popoverComplexSrc,
            fileName: 'popover-complex-example',
            typescriptFileCode: popoverComplexSrcTs,
            component: 'PopoverComplexExampleComponent',
            scssFileCode: popoverSrcScss
        }
    ];

    popoverContainer: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownContainerSrc,
            fileName: 'popover-container-example',
            component: 'PopoverContainerExampleComponent'
        },
        {
            language: 'typescript',
            code: dropdownContainerSrcTs,
            fileName: 'popover-container-example',
            component: 'PopoverContainerExampleComponent'
        }
    ];

    popoverTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: popoverTriggerSrc,
            fileName: 'popover-trigger-example'
        },
        {
            language: 'typescript',
            code: popoverTriggerSrcTs,
            fileName: 'popover-trigger-example',
            typescriptFileCode: popoverTriggerTsSrc,
            component: 'PopoverTriggerExampleComponent'
        }
    ];

    focusTrapExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverFocusSrcH,
            fileName: 'popover-focus-example',
            typescriptFileCode: popoverFocusSrcTs,
            component: 'PopoverFocusExampleComponent'
        }
    ];

    cdkPlacementExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverCdkPlacementSrcH,
            fileName: 'popover-cdk-placement-example',
            component: 'PopoverCdkPlacementExampleComponent'
        },
        {
            language: 'typescript',
            code: popoverCdkPlacementSrcTs,
            fileName: 'popover-cdk-placement-example',
            component: 'PopoverCdkPlacementExampleComponent'
        }
    ];

    cdkScrollExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverCdkScrollSrcH,
            fileName: 'popover-scroll-example',
            component: 'PopoverScrollExampleComponent'
        },
        {
            language: 'typescript',
            code: popoverCdkScrollSrcTs,
            fileName: 'popover-scroll-example',
            component: 'PopoverScrollExampleComponent'
        }
    ];

    popoverProgrammaticExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverProgrammaticHtmlSrc,
            fileName: 'popover-programmatic-open-example',
            scssFileCode: popoverProgrammaticScssSrc
        },
        {
            language: 'typescript',
            component: 'PopoverProgrammaticOpenExampleComponent',
            code: popoverProgrammaticTsSrc,
            fileName: 'popover-programmatic-open-example'
        }
    ];

    popoverPlacementExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverPlacementHtmlSrc,
            fileName: 'popover-placement-example'
        },
        {
            language: 'typescript',
            component: 'PopoverPlacementExampleComponent',
            code: popoverPlacementTsSrc,
            fileName: 'popover-placement-example'
        }
    ];

    popoverDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverDialogHtmlSrc,
            fileName: 'popover-dialog-example'
        },
        {
            language: 'typescript',
            component: 'PopoverDialogExampleComponent',
            code: popoverDialogTsSrc,
            fileName: 'popover-dialog-example'
        }
    ];

    popoverDynamicExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverDynamicHSrc,
            fileName: 'popover-dynamic-example'
        },
        {
            language: 'typescript',
            component: 'PopoverDynamicExampleComponent',
            code: popoverDynamicTSrc,
            fileName: 'popover-dynamic-example'
        }
    ];

    popoverFillExample: ExampleFile[] = [
        {
            language: 'html',
            code: popoverFillHSrc,
            fileName: 'popover-c-fill',
            typescriptFileCode: popoverFillSrcTs,
            component: 'PopoverCFillComponent'
        }
    ];

    dropdownPopover: ExampleFile[] = [
        {
            language: 'html',
            code: dropdownPopoverHtml,
            fileName: 'popover-dropdown',
            scssFileCode: dropdownPopoverScss
        },
        {
            language: 'typescript',
            code: dropdownPopoverTs,
            fileName: 'popover-dropdown-example',
            typescriptFileCode: dropdownPopoverTs,
            component: 'PopoverDropdownExampleComponent'
        },
        {
            language: 'scss',
            code: dropdownPopoverScss,
            fileName: 'popover-dropdown',
            component: 'PopoverDropdownComponent',
            scssFileCode: dropdownPopoverScss
        }
    ];

    mobilePopover: ExampleFile[] = [
        {
            language: 'html',
            code: mobilePopoverHtmlSrc,
            fileName: 'popover-mobile-example'
        },
        {
            language: 'typescript',
            component: 'PopoverMobileExampleComponent',
            code: mobilePopoverTsSrc,
            fileName: 'popover-mobile-example'
        }
    ];

    dynamicContainerHeight: ExampleFile[] = [
        {
            language: 'html',
            code: dynamicContainerHeightHtmlSrc,
            fileName: 'popover-dynamic-container-height-example'
        },
        {
            language: 'typescript',
            component: 'PopoverDynamicContainerHeightExampleComponent',
            code: dynamicContainerHeightTsSrc,
            fileName: 'popover-dynamic-container-height-example'
        }
    ];
}
