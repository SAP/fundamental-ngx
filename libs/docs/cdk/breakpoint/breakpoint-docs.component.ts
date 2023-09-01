import { Component } from '@angular/core';
import { FocusableGridDirective, ResponsiveBreakpoints } from '@fundamental-ngx/cdk/utils';
import { TableModule } from '@fundamental-ngx/core/table';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { AliasNamesExampleComponent } from './examples/alias-names-example/alias-names-example.component';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { DifferentObserveTargetExampleComponent } from './examples/different-observe-target-example.component';

const defaultExampleHtml = 'basic-example/basic-example.component.html';
const defaultExampleTs = 'basic-example/basic-example.component.ts';

const aliasNamesExampleTs = 'alias-names-example/alias-names-example.component.ts';
const differentSourceExampleTs = 'different-observe-target-example.component.ts';

@Component({
    templateUrl: './breakpoint-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        FocusableGridDirective,
        TableModule,
        ComponentExampleComponent,
        BasicExampleComponent,
        CodeExampleComponent,
        AliasNamesExampleComponent,
        DifferentObserveTargetExampleComponent
    ]
})
export class BreakpointDocsComponent {
    breakpointSizes = ResponsiveBreakpoints;

    basicExample = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'basic-example',
            component: 'BasicExampleComponent'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'typescript',
            fileName: 'basic-example',
            component: 'BasicExampleComponent'
        }
    ];
    aliasExample = [
        {
            code: getAssetFromModuleAssets(aliasNamesExampleTs),
            language: 'typescript',
            fileName: 'alias-names-example',
            component: 'AliasNamesExampleComponent'
        }
    ];

    differentSourceExample = [
        {
            code: getAssetFromModuleAssets(differentSourceExampleTs),
            language: 'typescript',
            fileName: 'different-observe-target-example',
            component: 'DifferentObserveTargetExampleComponent'
        }
    ];
}
