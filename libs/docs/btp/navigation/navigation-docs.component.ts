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
import { NavigationParentItemLinkComponent } from './examples/parent-item-link/navigation-parent-item-link.component';

@Component({
    templateUrl: './navigation-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        NavigationBasicExampleComponent,
        SeparatorComponent,
        NavigationParentItemLinkComponent
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
}
