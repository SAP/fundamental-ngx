import { Component } from '@angular/core';
import { getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultExampleHtml = 'basic-example/basic-example.component.html';
const defaultExampleTs = 'basic-example/basic-example.component.ts';

const aliasNamesExampleTs = 'alias-names-example/alias-names-example.component.ts';

@Component({
    templateUrl: './breakpoint-docs.component.html'
})
export class BreakpointDocsComponent {
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
}
