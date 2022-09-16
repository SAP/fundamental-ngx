import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const barCustomShellbarExampleScss = 'bar-custom-shellbar-example.component.scss';

const barDefaultExampleHtml = 'bar-default-example.component.html';
const barDefaultExampleTs = 'bar-default-example.component.ts';
const barHeaderExampleHtml = 'bar-header-example.component.html';
const barHeaderExampleTs = 'bar-header-example.component.ts';
const barSubHeaderExampleHtml = 'bar-subheader-example.component.html';
const barHeaderSubHeaderExampleHtml = 'bar-header-subheader-example.component.html';
const barFooterExampleHtml = 'bar-footer-example.component.html';
const barFloatingFooterExampleHtml = 'bar-floating-footer-example.component.html';
const barPageExampleHtml = 'bar-page-example.component.html';
const barPageExampleTs = 'bar-page-example.component.ts';
const barPageResponsiveExampleHtml = 'bar-page-responsive-example.component.html';
const barPageResponsiveExampleTs = 'bar-page-responsive-example.component.ts';
const barWithTitleExampleHtml = 'bar-with-title-example.component.html';
const barWithTitleExampleTs = 'bar-with-title-example.component.ts';
const barCustomShellbarExampleHtml = 'bar-custom-shellbar-example.component.html';
const barCustomShellbarExampleTs = 'bar-custom-shellbar-example.component.ts';

@Component({
    selector: 'app-bar',
    templateUrl: './bar-docs.component.html'
})
export class BarDocsComponent {
    barDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-default-example',
            code: getAssetFromModuleAssets(barDefaultExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(barDefaultExampleTs),
            fileName: 'bar-default-example',
            component: 'BarDefaultExampleComponent'
        }
    ];

    barHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-header-example',
            code: getAssetFromModuleAssets(barHeaderExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(barHeaderExampleTs),
            fileName: 'bar-header-example',
            component: 'BarHeaderExampleComponent'
        }
    ];

    barSubHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-subheader-example',
            code: getAssetFromModuleAssets(barSubHeaderExampleHtml)
        }
    ];

    barHeaderSubHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-header-subheader-example',
            code: getAssetFromModuleAssets(barHeaderSubHeaderExampleHtml)
        }
    ];

    barFooterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-footer-example',
            code: getAssetFromModuleAssets(barFooterExampleHtml)
        }
    ];

    barFloatingFooterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-floating-footer-example',
            code: getAssetFromModuleAssets(barFloatingFooterExampleHtml)
        }
    ];

    barPageExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-page-example',
            code: getAssetFromModuleAssets(barPageExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(barPageExampleTs),
            fileName: 'bar-page-example',
            component: 'BarPageExampleComponent'
        }
    ];

    barPageResponsiveExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-page-responsive-example',
            code: getAssetFromModuleAssets(barPageResponsiveExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(barPageResponsiveExampleTs),
            fileName: 'bar-page-responsive-example',
            component: 'BarPageResponsiveExampleComponent'
        }
    ];
    barTitleExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-with-title-example',
            code: getAssetFromModuleAssets(barWithTitleExampleHtml)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(barWithTitleExampleTs),
            fileName: 'bar-with-title-example',
            component: 'BarWithTitleExampleComponent'
        }
    ];
    barCustomShellbarExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-custom-shellbar-example',
            code: getAssetFromModuleAssets(barCustomShellbarExampleHtml),
            scssFileCode: barCustomShellbarExampleScss
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(barCustomShellbarExampleTs),
            fileName: 'bar-custom-shellbar-example',
            component: 'BarCustomShellbarExampleComponent'
        }
    ];
}
