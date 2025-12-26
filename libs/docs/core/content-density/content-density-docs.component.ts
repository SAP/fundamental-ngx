import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ContentDensityExampleComponent } from './examples/content-density-example.component';
import { DirectiveUsageExampleComponent } from './examples/directive-usage/directive-usage-example.component';

const contentDensityUserComponentSrc = 'content-density-user/content-density-user.component.ts';
const contentDensityUserComponentScssSrc = 'content-density-user/content-density-user.component.scss';
const contentDensityStorageModule = 'content-density-storage-example.module';

const contentDensitySrc = 'content-density-example.component.ts';
const contentDensityHTMLSrc = 'content-density-example.component.html';

const directiveUsageExampleComponentSrc = 'directive-usage/directive-usage-example.component.ts';
const directiveUsageExampleComponentSrcHTMLSrc = 'directive-usage/directive-usage-example.component.html';

@Component({
    selector: 'app-content-density-docs',
    templateUrl: 'content-density-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        ContentDensityExampleComponent,
        CodeExampleComponent,
        DirectiveUsageExampleComponent
    ]
})
export class ContentDensityDocsComponent {
    contentDensityExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensitySrc),
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(contentDensityHTMLSrc),
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensityUserComponentSrc),
            fileName: 'content-density-user/content-density-user',
            component: 'ContentDensityUserComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(contentDensityUserComponentScssSrc),
            fileName: 'content-density-user/content-density-user',
            component: 'ContentDensityUserComponent'
        }
    ];

    directiveUsageExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(directiveUsageExampleComponentSrc),
            fileName: 'directive-usage-example',
            path: 'directive-usage',
            component: 'DirectiveUsageExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(directiveUsageExampleComponentSrcHTMLSrc),
            fileName: 'directive-usage-example',
            path: 'directive-usage',
            component: 'DirectiveUsageExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(contentDensityUserComponentSrc),
            fileName: 'content-density-user',
            path: 'content-density-user',
            component: 'ContentDensityUserComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(contentDensityUserComponentScssSrc),
            fileName: 'content-density-user',
            path: 'content-density-user',
            component: 'ContentDensityUserComponent'
        }
    ];

    contentDensityStorageExampleFile: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(contentDensityStorageModule),
        fileName: 'content-density-storage-example'
    };
}
