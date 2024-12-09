import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { CustomFacetExampleComponent } from './examples/custom-facet-example.component';
import { FacetAlignmentExampleComponent } from './examples/facet-alignment-example.component';
import { FacetGroupExampleComponent } from './examples/facet-group-example.component';
import { FacetLoadingExampleComponent } from './examples/facet-loading-example.component';
import { FormFacetExampleComponent } from './examples/form-facet-example.component';

const FacetGroupExample = 'facet-group-example.component.html';
const FacetGroupExampleTs = 'facet-group-example.component.ts';
const FormFacetExample = 'form-facet-example.component.html';
const FormFacetExampleTs = 'form-facet-example.component.ts';
const KeyValueFacetAlignmentExample = 'facet-alignment-example.component.html';
const KeyValueFacetAlignmentExampleTs = 'facet-alignment-example.component.ts';
const CustomFacetExample = 'custom-facet-example.component.html';
const CustomFacetExampleTsCode = 'custom-facet-example.component.ts';
const FacetLoadingExample = 'facet-loading-example.component.html';
const FacetLoadingExampleTs = 'facet-loading-example.component.ts';

@Component({
    selector: 'app-facet',
    templateUrl: './facet-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        FacetGroupExampleComponent,
        CodeExampleComponent,
        FormFacetExampleComponent,
        FacetAlignmentExampleComponent,
        CustomFacetExampleComponent,
        RouterLink,
        FacetLoadingExampleComponent
    ]
})
export class FacetsDocsComponent {
    facetGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FacetGroupExample),
            fileName: 'facet-group-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(FacetGroupExampleTs),
            fileName: 'facet-group-example',
            component: 'FacetGroupExampleComponent'
        }
    ];
    formFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FormFacetExample),
            fileName: 'form-facet-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(FormFacetExampleTs),
            fileName: 'form-facet-example',
            component: 'FormFacetExampleComponent'
        }
    ];

    keyValueFacetAlignment: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(KeyValueFacetAlignmentExample),
            fileName: 'facet-alignment-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(KeyValueFacetAlignmentExampleTs),
            fileName: 'facet-alignment-example',
            component: 'FacetAlignmentExampleComponent'
        }
    ];

    customFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(CustomFacetExample),
            fileName: 'custom-facet-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(CustomFacetExampleTsCode),
            fileName: 'custom-facet-example',
            component: 'CustomFacetExampleComponent'
        }
    ];

    facetLoading: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FacetLoadingExample),
            fileName: 'facet-loading-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(FacetLoadingExampleTs),
            fileName: 'facet-loading-example',
            component: 'FacetLoadingExampleComponent'
        }
    ];
}
