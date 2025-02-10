import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PopoverCFillComponent } from './examples/popover-c-fill/popover-c-fill.component';
import { PopoverClosingExampleComponent } from './examples/popover-closing-example/popover-closing-example.component';
import { PopoverComplexExampleComponent } from './examples/popover-complex-example/popover-complex-example.component';
import { PopoverContainerExampleComponent } from './examples/popover-container-example/popover-container-example.component';
import { PopoverDialogExampleComponent } from './examples/popover-dialog/popover-dialog-example.component';
import { PopoverDropdownExampleComponent } from './examples/popover-dropdown/popover-dropdown-example.component';
import { PopoverDynamicContainerHeightExampleComponent } from './examples/popover-dynamic-container-height/popover-dynamic-container-height-example.component';
import { PopoverDynamicExampleComponent } from './examples/popover-dynamic/popover-dynamic-example.component';
import { PopoverFocusExampleComponent } from './examples/popover-focus-example/popover-focus-example.component';
import { PopoverLazyInitOfBodyExampleComponent } from './examples/popover-lazy-init-of-body/popover-lazy-init-of-body-example.component';
import { PopoverMobileExampleComponent } from './examples/popover-mobile/popover-mobile-example.component';
import { PopoverCdkPlacementExampleComponent } from './examples/popover-new-placement/popover-cdk-placement-example.component';
import { PopoverPlacementExampleComponent } from './examples/popover-placement/popover-placement-example.component';
import { PopoverProgrammaticOpenExampleComponent } from './examples/popover-programmatic/popover-programmatic-open-example.component';
import { PopoverResizableExampleComponent } from './examples/popover-resizable/popover-resizable-example.component';
import { PopoverScrollExampleComponent } from './examples/popover-scroll-example/popover-scroll-example.component';
import { PopoverExampleComponent } from './examples/popover-simple/popover-example.component';
import { PopoverTriggerExampleComponent } from './examples/popover-trigger-example/popover-trigger-example.component';

const popoverSrcScss = 'popover-simple/popover-example.component.scss';
const popoverProgrammaticScssSrc = 'popover-programmatic/popover-programmatic-open-example.component.scss';
const dropdownPopoverScss = 'popover-dropdown/popover-dropdown.component.scss';

const popoverSrc = 'popover-simple/popover-example.component.html';
const popoverSrcTs = 'popover-simple/popover-example.component.ts';
const popoverClosingSrc = 'popover-closing-example/popover-closing-example.component.html';
const popoverClosingSrcTs = 'popover-closing-example/popover-closing-example.component.ts';
const popoverComplexSrc = 'popover-complex-example/popover-complex-example.component.html';
const popoverComplexSrcTs = 'popover-complex-example/popover-complex-example.component.ts';
const popoverProgrammaticHtmlSrc = 'popover-programmatic/popover-programmatic-open-example.component.html';
const popoverProgrammaticTsSrc = 'popover-programmatic/popover-programmatic-open-example.component.ts';
const popoverPlacementHtmlSrc = 'popover-placement/popover-placement-example.component.html';
const popoverPlacementTsSrc = 'popover-placement/popover-placement-example.component.ts';
const popoverPlacementScss = 'popover-placement/popover-placement-example.component.scss';
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

const resizablePopoverHtmlSrc = 'popover-resizable/popover-resizable-example.component.html';
const resizablePopoverTsSrc = 'popover-resizable/popover-resizable-example.component.ts';
const resizablePopoverScss = 'popover-resizable/popover-resizable-example.component.scss';

const dynamicContainerHeightHtmlSrc =
    'popover-dynamic-container-height/popover-dynamic-container-height-example.component.html';
const dynamicContainerHeightTsSrc =
    'popover-dynamic-container-height/popover-dynamic-container-height-example.component.ts';

@Component({
    selector: 'app-popover',
    templateUrl: './popover-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PopoverExampleComponent,
        PopoverClosingExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PopoverTriggerExampleComponent,
        PopoverComplexExampleComponent,
        PopoverPlacementExampleComponent,
        PopoverProgrammaticOpenExampleComponent,
        PopoverDialogExampleComponent,
        PopoverCFillComponent,
        PopoverContainerExampleComponent,
        PopoverFocusExampleComponent,
        PopoverCdkPlacementExampleComponent,
        PopoverScrollExampleComponent,
        PopoverDynamicExampleComponent,
        PopoverDropdownExampleComponent,
        RouterLink,
        PopoverMobileExampleComponent,
        PopoverDynamicContainerHeightExampleComponent,
        PopoverLazyInitOfBodyExampleComponent,
        PopoverResizableExampleComponent
    ]
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

    popoverClosingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(popoverClosingSrc),
            fileName: 'popover-closing-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(popoverTriggerSrcTs),
            fileName: 'popover-closing-exampl',
            typescriptFileCode: getAssetFromModuleAssets(popoverClosingSrcTs),
            component: 'PopoverClosingExampleComponent'
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
            fileName: 'popover-placement-example',
            scssFileCode: getAssetFromModuleAssets(popoverPlacementScss)
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

    lazyLoadBody: ExampleFile[] = [
        {
            name: 'PopoverLazyInitOfBodyExampleComponent',
            language: 'typescript',
            component: 'PopoverLazyInitOfBodyExampleComponent',
            code: getAssetFromModuleAssets('popover-lazy-init-of-body/popover-lazy-init-of-body-example.component.ts'),
            fileName: 'popover-lazy-init-of-body-example'
        },
        {
            name: 'PopoverLazyLoadedBodyComponent',
            language: 'typescript',
            component: 'PopoverLazyLoadedBodyComponent',
            code: getAssetFromModuleAssets('popover-lazy-init-of-body/popover-lazy-loaded-body.component.ts'),
            fileName: 'popover-lazy-loaded-body'
        }
    ];

    resizablePopovers: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(resizablePopoverHtmlSrc),
            fileName: 'popover-resizable-example'
        },
        {
            language: 'typescript',
            component: 'PopoverResizableExampleComponent',
            code: getAssetFromModuleAssets(resizablePopoverTsSrc),
            fileName: 'popover-resizable-example',
            scssFileCode: getAssetFromModuleAssets(resizablePopoverScss)
        }
    ];
}
