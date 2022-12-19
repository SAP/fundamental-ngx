import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const FacetGroupExample = 'facet-group-example.component.html';
const FormFacetExample = 'form-facet-example.component.html';
const FormLinkFacetExample = 'form-link-facet-example.component.html';
const KeyValueFacetExample = 'key-value-facet-example.component.html';
const KeyValueFacetAlignmentExample = 'key-value-facet-alignment-example.component.html';
const ImageFacetExample = 'image-facet-example.component.html';
const RatingIndicatorFacetExample = 'rating-indicator-facet-example.component.html';
const CustomFacetExample = 'custom-facet-example.component.html';
const CustomFacetExampleTsCode = 'custom-facet-example.component.ts';
const FacetLoadingExample = 'facet-loading-example.component.html';

@Component({
    selector: 'app-facet',
    templateUrl: './facet-docs.component.html'
})
export class FacetsDocsComponent {
    facetGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FacetGroupExample),
            fileName: 'facet-group-example'
        }
    ];
    formFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FormFacetExample),
            fileName: 'form-facet-example'
        }
    ];
    formLinkFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FormLinkFacetExample),
            fileName: 'form-link-facet-example'
        }
    ];
    keyValueFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(KeyValueFacetExample),
            fileName: 'key-value-facet-example'
        }
    ];

    keyValueFacetAlignment: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(KeyValueFacetAlignmentExample),
            fileName: 'key-value-facet-alignment-example'
        }
    ];

    imageFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(ImageFacetExample),
            fileName: 'image-facet-example'
        }
    ];

    ratingIndicatorFacet: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(RatingIndicatorFacetExample),
            fileName: 'rating-indicator-facet-example'
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
        }
    ];
}
