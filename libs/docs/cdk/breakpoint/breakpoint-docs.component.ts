import { Component } from '@angular/core';
import { getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ResponsiveBreakpoints } from '@fundamental-ngx/cdk/utils';
import { DifferentObserveTargetExampleComponent } from './examples/different-observe-target-example.component';
import { AliasNamesExampleComponent } from './examples/alias-names-example/alias-names-example.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { BasicExampleComponent } from './examples/basic-example/basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
            fileName: 'basic-example.component',
            component: 'FdkBreakpointBasicExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'basic-example.component',
            component: 'FdkBreakpointBasicExample'
        }
    ];
    aliasExample = [
        {
            code: getAssetFromModuleAssets(aliasNamesExampleTs),
            language: 'ts',
            fileName: 'alias-names-example.component',
            component: 'AliasNamesExampleComponent'
        }
    ];

    differentSourceExample = [
        {
            code: getAssetFromModuleAssets(differentSourceExampleTs),
            language: 'ts',
            fileName: 'different-observe-target-example.component',
            component: 'DifferentObserveTargetExampleComponent'
        }
    ];
}
