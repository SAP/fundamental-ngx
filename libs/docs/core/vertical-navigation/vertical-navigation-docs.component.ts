import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { VerticalNavigationGroupingExampleComponent } from './examples/vertical-navigation-grouping-example.component';
import { VerticalNavigationNoIconsExampleComponent } from './examples/vertical-navigation-no-icons-example.component';
import { VerticalNavigationCondensedExampleComponent } from './examples/vertical-navigation-condensed-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { VerticalNavigationDefaultExampleComponent } from './examples/vertical-navigation-default-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const VerticalNavigationDefaultExample = 'vertical-navigation-default-example.component.html';
const VerticalNavigationGroupingExample = 'vertical-navigation-grouping-example.component.html';
const VerticalNavigationCondensedExample = 'vertical-navigation-condensed-example.component.html';
const VerticalNavigationNoIconsExample = 'vertical-navigation-no-icons-example.component.html';

@Component({
    selector: 'app-vertical-navigation',
    templateUrl: './vertical-navigation-docs.component.html',
    standalone: true,
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
