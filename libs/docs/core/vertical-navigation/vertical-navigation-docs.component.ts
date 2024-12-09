import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { VerticalNavigationCondensedExampleComponent } from './examples/vertical-navigation-condensed-example.component';
import { VerticalNavigationDefaultExampleComponent } from './examples/vertical-navigation-default-example.component';
import { VerticalNavigationGroupingExampleComponent } from './examples/vertical-navigation-grouping-example.component';
import { VerticalNavigationNoIconsExampleComponent } from './examples/vertical-navigation-no-icons-example.component';

const VerticalNavigationDefaultExample = 'vertical-navigation-default-example.component.html';
const VerticalNavigationGroupingExample = 'vertical-navigation-grouping-example.component.html';
const VerticalNavigationCondensedExample = 'vertical-navigation-condensed-example.component.html';
const VerticalNavigationCondensedExampleTs = 'vertical-navigation-condensed-example.component.ts';
const VerticalNavigationNoIconsExample = 'vertical-navigation-no-icons-example.component.html';

@Component({
    selector: 'app-vertical-navigation',
    templateUrl: './vertical-navigation-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        VerticalNavigationDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        VerticalNavigationCondensedExampleComponent,
        VerticalNavigationNoIconsExampleComponent,
        VerticalNavigationGroupingExampleComponent
    ]
})
export class VerticalNavigationDocsComponent {
    defaultVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationDefaultExample),
            fileName: 'vertical-navigation-default-example'
        }
    ];
    condensedVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationCondensedExample),
            fileName: 'vertical-navigation-condensed-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(VerticalNavigationCondensedExampleTs),
            fileName: 'vertical-navigation-condensed-example',
            component: 'VerticalNavigationCondensedExampleComponent'
        }
    ];
    noIconsVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationNoIconsExample),
            fileName: 'vertical-navigation-no-icons-example'
        }
    ];
    groupingVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(VerticalNavigationGroupingExample),
            fileName: 'vertical-navigation-grouping-example'
        }
    ];
}
