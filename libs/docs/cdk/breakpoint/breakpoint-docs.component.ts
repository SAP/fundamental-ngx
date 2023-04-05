import { Component } from '@angular/core';
import { getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ResponsiveBreakpoints } from '../../../cdk/src/lib/utils/directives/breakpoints/responsive-breakpoints';

const defaultExampleHtml = 'basic-example/basic-example.component.html';
const defaultExampleTs = 'basic-example/basic-example.component.ts';

const aliasNamesExampleTs = 'alias-names-example/alias-names-example.component.ts';
const differentSourceExampleTs = 'different-observe-target-example.component.ts';

@Component({
    templateUrl: './breakpoint-docs.component.html'
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
