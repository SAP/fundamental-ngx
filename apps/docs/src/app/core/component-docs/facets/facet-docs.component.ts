import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import FacetGroupExample from '!./facet-examples/facet-group-example.component.html?raw';
import FormFacetExample from '!./facet-examples/form-facet-example.component.html?raw';
import FormLinkFacetExample from '!./facet-examples/form-link-facet-example.component.html?raw';
import KeyValueFacetExample from '!./facet-examples/key-value-facet-example.component.html?raw';
import KeyValueFacetAlignmentExample from '!./facet-examples/key-value-facet-alignment-example.component.html?raw';
import ImageFacetExample from '!./facet-examples/image-facet-example.component.html?raw';
import RatingIndicatorFacetExample from '!./facet-examples/rating-indicator-facet-example.component.html?raw';
import CustomFacetExample from '!./facet-examples/custom-facet-example.component.html?raw';
import CustomFacetExampleTsCode from '!./facet-examples/custom-facet-example.component.ts?raw';

@Component({
    selector: 'app-facet',
    templateUrl: './facet-docs.component.html'
})
export class FacetDocsComponent {
    facetGroup: ExampleFile[] = [
        {
            language: 'html',
            code: FacetGroupExample,
            fileName: 'facet-group-example'
        }
    ];
    formFacet: ExampleFile[] = [
        {
            language: 'html',
            code: FormFacetExample,
            fileName: 'form-facet-example'
        }
    ];
    formLinkFacet: ExampleFile[] = [
        {
            language: 'html',
            code: FormLinkFacetExample,
            fileName: 'form-link-facet-example'
        }
    ];
    keyValueFacet: ExampleFile[] = [
        {
            language: 'html',
            code: KeyValueFacetExample,
            fileName: 'key-value-facet-example'
        }
    ];

    keyValueFacetAlignment: ExampleFile[] = [
        {
            language: 'html',
            code: KeyValueFacetAlignmentExample,
            fileName: 'key-value-facet-alignment-example'
        }
    ];

    imageFacet: ExampleFile[] = [
        {
            language: 'html',
            code: ImageFacetExample,
            fileName: 'image-facet-example'
        }
    ];

    ratingIndicatorFacet: ExampleFile[] = [
        {
            language: 'html',
            code: RatingIndicatorFacetExample,
            fileName: 'rating-indicator-facet-example'
        }
    ];

    customFacet: ExampleFile[] = [
        {
            language: 'html',
            code: CustomFacetExample,
            fileName: 'custom-facet-example'
        },
        {
            language: 'typescript',
            code: CustomFacetExampleTsCode,
            fileName: 'custom-facet-example',
            component: 'CustomFacetExampleComponent'
        }
    ];
}
