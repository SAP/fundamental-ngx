import { OnInit, Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as platformFormLayoutContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-recommended-example.component.html';
import * as platformFormLayoutContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-recommended-example.component.ts';
import * as platformPossibleFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-possible-example.component.html';
import * as platformPossibleFormContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-possible-example.component.ts';
import * as platformNotRecommendedFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-not-recommended-example.component.html';
import * as platformNotRecommendedFormContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-not-recommended-example.component.ts';
import * as platformComplexFormContainerSrc from '!raw-loader!./platform-form-container-examples/platform-form-container-complex-example.component.html';
import * as platformComplexFormContainerTsCode from '!raw-loader!./platform-form-container-examples/platform-form-container-complex-example.component.ts';

@Component({
    selector: 'app-form-container',
    templateUrl: './platform-form-container-docs.component.html'
})
export class PlatformFormContainerDocsComponent {
    formContainerRecommended: ExampleFile[] = [
        {
            language: 'html',
            code: platformFormLayoutContainerSrc,
            fileName: 'platform-form-container-recommended-example'
        },
        {
            language: 'typescript',
            code: platformFormLayoutContainerTsCode,
            fileName: 'platform-form-container-recommended-example',
            component: 'PlatformFormContainerRecommendedExampleComponent'
        }
    ];

    formContainerPossible: ExampleFile[] = [
        {
            language: 'html',
            code: platformPossibleFormContainerSrc,
            fileName: 'platform-form-container-possible-example'
        },
        {
            language: 'typescript',
            code: platformPossibleFormContainerTsCode,
            fileName: 'platform-form-container-possible-example',
            component: 'PlatformFormContainerPossibleExampleComponent'
        }
    ];

    formContainerNotRecommended: ExampleFile[] = [
        {
            language: 'html',
            code: platformNotRecommendedFormContainerSrc,
            fileName: 'platform-form-container-not-recommended-example'
        },
        {
            language: 'typescript',
            code: platformNotRecommendedFormContainerTsCode,
            fileName: 'platform-form-container-not-recommended-example',
            component: 'PlatformFormContainerNotRecommendedExampleComponent'
        }
    ];
    formContainerComplex: ExampleFile[] = [
        {
            language: 'html',
            code: platformComplexFormContainerSrc,
            fileName: 'platform-form-container-complex-example'
        },
        {
            language: 'typescript',
            code: platformComplexFormContainerTsCode,
            fileName: 'platform-form-container-complex-example',
            component: 'PlatformFormContainerComplexExampleComponent'
        }
    ];
}
