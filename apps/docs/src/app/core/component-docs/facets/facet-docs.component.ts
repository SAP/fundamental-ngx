import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as FacetGroupExample from '!raw-loader!./facet-examples/facet-group-example.component.html';
import * as FacetGroupExampleTsCode from '!raw-loader!./facet-examples/facet-group-example.component.ts';
import * as FormFacetExample from '!raw-loader!./facet-examples/form-facet-example.component.html';
import * as FormFacetExampleTsCode from '!raw-loader!./facet-examples/form-facet-example.component.ts';
import * as FormLinkFacetExample from '!raw-loader!./facet-examples/form-link-facet-example.component.html';
import * as FormLinkFacetExampleTsCode from '!raw-loader!./facet-examples/form-link-facet-example.component.ts';
import * as KeyValueFacetExample from '!raw-loader!./facet-examples/key-value-facet-example.component.html';
import * as KeyValueFacetExampleTsCode from '!raw-loader!./facet-examples/key-value-facet-example.component.ts';
import * as KeyValueFacetAlignmentExample from '!raw-loader!./facet-examples/key-value-facet-alignment-example.component.html';
import * as KeyValueFacetAlignmentExampleTsCode from '!raw-loader!./facet-examples/key-value-facet-alignment-example.component.ts';
import * as ImageFacetExample from '!raw-loader!./facet-examples/image-facet-example.component.html';
import * as ImageFacetExampleTsCode from '!raw-loader!./facet-examples/image-facet-example.component.ts';
import * as RatingIndicatorFacetExample from '!raw-loader!./facet-examples/rating-indicator-facet-example.component.html';
import * as RatingIndicatorFacetExampleTsCode from '!raw-loader!./facet-examples/rating-indicator-facet-example.component.ts';
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
        },
        {
            language: 'typescript',
            code: FacetGroupExampleTsCode,
            fileName: 'facet-group-example',
            component: 'FacetGroupExampleComponent'
        }
    ];
    formFacet: ExampleFile[] = [
        {
            language: 'html',
            code: FormFacetExample,
            fileName: 'form-facet-example'
        },
        {
            language: 'typescript',
            code: FormFacetExampleTsCode,
            fileName: 'form-facet-example',
            component: 'FormFacetExampleComponent'
        }
    ];
    formLinkFacet: ExampleFile[] = [
        {
            language: 'html',
            code: FormLinkFacetExample,
            fileName: 'form-link-facet-example'
        },
        {
            language: 'typescript',
            code: FormLinkFacetExampleTsCode,
            fileName: 'form-link-facet-example',
            component: 'FormLinkFacetExampleComponent'
        }
    ];
    keyValueFacet: ExampleFile[] = [
        {
            language: 'html',
            code: KeyValueFacetExample,
            fileName: 'key-value-facet-example'
        },
        {
            language: 'typescript',
            code: KeyValueFacetExampleTsCode,
            fileName: 'key-value-facet-example',
            component: 'KeyValueFacetExampleComponent'
        }
    ];

    keyValueFacetAlignment: ExampleFile[] = [
        {
            language: 'html',
            code: KeyValueFacetAlignmentExample,
            fileName: 'key-value-facet-alignment-example'
        },
        {
            language: 'typescript',
            code: KeyValueFacetAlignmentExampleTsCode,
            fileName: 'key-value-facet-alignment-example',
            component: 'KeyValueFacetAlignmentExampleComponent'
        }
    ];

    imageFacet: ExampleFile[] = [
        {
            language: 'html',
            code: ImageFacetExample,
            fileName: 'image-facet-example'
        },
        {
            language: 'typescript',
            code: ImageFacetExampleTsCode,
            fileName: 'image-facet-example',
            component: 'ImageFacetExampleComponent'
        }
    ];

    ratingIndicatorFacet: ExampleFile[] = [
        {
            language: 'html',
            code: RatingIndicatorFacetExample,
            fileName: 'rating-indicator-facet-example'
        },
        {
            language: 'typescript',
            code: RatingIndicatorFacetExampleTsCode,
            fileName: 'rating-indicator-facet-example',
            component: 'RatingIndicatorFacetExampleComponent'
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
