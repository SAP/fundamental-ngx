import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { NavigationBasicExampleComponent } from './examples/basic-example/navigation-basic-example.component';
import { NavigationDesktopExampleComponent } from './examples/desktop/desktop.component';
import { NavigationIndicationTagsExampleComponent } from './examples/indication-tags/navigation-indication-tags.component';
import { NavigationOverlayExampleComponent } from './examples/overlay/overlay.component';
import { NavigationParentItemLinkComponent } from './examples/parent-item-link/navigation-parent-item-link.component';
import { SelectionModeComponent } from './examples/selection-mode/selection-mode.component';
import { StickyAreaExampleComponent } from './examples/sticky-area/sticky-area.component';

@Component({
    selector: 'fd-docs-btp-navigation',
    templateUrl: './navigation-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        NavigationBasicExampleComponent,
        SeparatorComponent,
        NavigationParentItemLinkComponent,
        SelectionModeComponent,
        NavigationOverlayExampleComponent,
        NavigationDesktopExampleComponent,
        NavigationIndicationTagsExampleComponent,
        StickyAreaExampleComponent
    ]
})
export class NavigationDocsComponent {
    basicExample: ExampleFile[] = [
        getExampleFile('basic-example/navigation-basic-example.component.ts', {
            component: 'NavigationBasicExampleComponent',
            selector: 'navigation-basic-example'
        }),
        getExampleFile('basic-example/navigation-basic-example.component.html')
    ];

    parentItemLinkExample: ExampleFile[] = [
        getExampleFile('parent-item-link/navigation-parent-item-link.component.ts', {
            component: 'NavigationParentItemLinkComponent',
            selector: 'navigation-parent-item-link'
        }),
        getExampleFile('parent-item-link/navigation-parent-item-link.component.html')
    ];

    selectionModeExample: ExampleFile[] = [
        getExampleFile('selection-mode/selection-mode.component.ts', {
            component: 'SelectionModeComponent',
            selector: 'selection-mode'
        }),
        getExampleFile('selection-mode/selection-mode.component.html')
    ];

    desktopExample: ExampleFile[] = [
        getExampleFile('desktop/desktop.component.ts', {
            component: 'NavigationDesktopExampleComponent',
            selector: 'desktop'
        }),
        getExampleFile('desktop/desktop.component.html')
    ];

    overlayExample: ExampleFile[] = [
        getExampleFile('overlay/overlay.component.ts', {
            component: 'NavigationOverlayExampleComponent',
            selector: 'overlay'
        }),
        getExampleFile('overlay/overlay.component.html')
    ];

    indicationTagsExample: ExampleFile[] = [
        getExampleFile('indication-tags/navigation-indication-tags.component.ts', {
            component: 'NavigationIndicationTagsExampleComponent',
            selector: 'navigation-indication-tags'
        }),
        getExampleFile('indication-tags/navigation-indication-tags.component.html')
    ];

    stickyAreaExample: ExampleFile[] = [
        getExampleFile('sticky-area/sticky-area.component.ts', {
            component: 'StickyAreaExampleComponent',
            selector: 'fdb-sticky-area'
        }),
        getExampleFile('sticky-area/sticky-area.component.html')
    ];
}
