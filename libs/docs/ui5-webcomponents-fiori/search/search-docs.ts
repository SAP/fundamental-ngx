import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ActionsSample } from './examples/actions-sample';
import { AdvancedFilteringSample } from './examples/advanced-filtering-sample';
import { BylineItemsSample } from './examples/byline-items-sample';
import { LoadingSample } from './examples/loading-sample';
import { ScopesSample } from './examples/scopes-sample';
import { ShowMoreSample } from './examples/show-more-sample';
import { SuggestionsSample } from './examples/suggestions-sample';

const suggestionsSampleTs = 'suggestions-sample.ts';
const suggestionsSampleHtml = 'suggestions-sample.html';
const advancedFilteringSampleTs = 'advanced-filtering-sample.ts';
const advancedFilteringSampleHtml = 'advanced-filtering-sample.html';
const bylineItemsSampleTs = 'byline-items-sample.ts';
const bylineItemsSampleHtml = 'byline-items-sample.html';
const scopesSampleTs = 'scopes-sample.ts';
const scopesSampleHtml = 'scopes-sample.html';
const loadingSampleTs = 'loading-sample.ts';
const loadingSampleHtml = 'loading-sample.html';
const showMoreSampleTs = 'show-more-sample.ts';
const showMoreSampleHtml = 'show-more-sample.html';
const actionsSampleTs = 'actions-sample.ts';
const actionsSampleHtml = 'actions-sample.html';

@Component({
    selector: 'ui5-doc-search',
    templateUrl: './search-docs.html',
    standalone: true,
    imports: [
        CodeExampleComponent,
        ComponentExampleComponent,
        DescriptionComponent,
        DocsSectionTitleComponent,
        SeparatorComponent,
        SuggestionsSample,
        AdvancedFilteringSample,
        BylineItemsSample,
        ScopesSample,
        LoadingSample,
        ActionsSample,
        ShowMoreSample
    ]
})
export class SearchDocs {
    suggestionsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(suggestionsSampleTs),
            originalFileName: 'suggestions-sample',
            component: 'SuggestionsSample',
            typescriptFileCode: getAssetFromModuleAssets(suggestionsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(suggestionsSampleHtml),
            originalFileName: 'suggestions-sample',
            component: 'SuggestionsSample'
        }
    ]);

    advancedFilteringExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(advancedFilteringSampleTs),
            originalFileName: 'advanced-filtering-sample',
            component: 'AdvancedFilteringSample',
            typescriptFileCode: getAssetFromModuleAssets(advancedFilteringSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(advancedFilteringSampleHtml),
            originalFileName: 'advanced-filtering-sample',
            component: 'AdvancedFilteringSample'
        }
    ]);

    bylineItemsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(bylineItemsSampleTs),
            originalFileName: 'byline-items-sample',
            component: 'BylineItemsSample',
            typescriptFileCode: getAssetFromModuleAssets(bylineItemsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineItemsSampleHtml),
            originalFileName: 'byline-items-sample',
            component: 'BylineItemsSample'
        }
    ]);

    scopesExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(scopesSampleTs),
            originalFileName: 'scopes-sample',
            component: 'ScopesSample',
            typescriptFileCode: getAssetFromModuleAssets(scopesSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(scopesSampleHtml),
            originalFileName: 'scopes-sample',
            component: 'ScopesSample'
        }
    ]);

    loadingExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(loadingSampleTs),
            originalFileName: 'loading-sample',
            component: 'LoadingSample',
            typescriptFileCode: getAssetFromModuleAssets(loadingSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(loadingSampleHtml),
            originalFileName: 'loading-sample',
            component: 'LoadingSample'
        }
    ]);

    showMoreExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(showMoreSampleTs),
            originalFileName: 'show-more-sample',
            component: 'ShowMoreSample',
            typescriptFileCode: getAssetFromModuleAssets(showMoreSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(showMoreSampleHtml),
            originalFileName: 'show-more-sample',
            component: 'ShowMoreSample'
        }
    ]);

    actionsExample = signal<ExampleFile[]>([
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(actionsSampleTs),
            originalFileName: 'actions-sample',
            component: 'ActionsSample',
            typescriptFileCode: getAssetFromModuleAssets(actionsSampleTs),
            scssFileCode: ''
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(actionsSampleHtml),
            originalFileName: 'actions-sample',
            component: 'ActionsSample'
        }
    ]);
}
