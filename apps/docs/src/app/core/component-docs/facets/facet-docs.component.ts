import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as FacetGroupExample from '!raw-loader!./facet-examples/facet-group-example.component.html';
import * as FormFacetExample from '!raw-loader!./facet-examples/form-facet-example.component.html';
import * as FormLinkFacetExample from '!raw-loader!./facet-examples/form-link-facet-example.component.html';
import * as KeyValueFacetExample from '!raw-loader!./facet-examples/key-value-facet-example.component.html';
import * as KeyValueFacetAlignmentExample from '!raw-loader!./facet-examples/key-value-facet-alignment-example.component.html';
import * as ImageFacetExample from '!raw-loader!./facet-examples/image-facet-example.component.html';
import * as RatingIndicatorFacetExample from '!raw-loader!./facet-examples/rating-indicator-facet-example.component.html';
import * as CustomFacetExample from '!raw-loader!./facet-examples/custom-facet-example.component.html';
import * as CustomFacetExampleTsCode from '!raw-loader!./facet-examples/custom-facet-example.component.ts';

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
