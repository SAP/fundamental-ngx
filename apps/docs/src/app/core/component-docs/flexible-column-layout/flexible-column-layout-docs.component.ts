import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as defaultFlexibleColumnLayoutHtml from '!raw-loader!./examples/default/flexible-column-layout-example.component.html';
import * as defaultFlexibleColumnLayoutTs from '!raw-loader!./examples/default/flexible-column-layout-example.component.ts';
import * as defaultFlexibleColumnLayoutScss from '!raw-loader!./examples/default/flexible-column-layout-example.component.scss';

@Component({
    selector: 'fd-flexible-column-layout-docs',
    templateUrl: './flexible-column-layout-docs.component.html'
})
export class FlexibleColumnLayoutDocsComponent {
    defaultFlexibleColumnLayout: ExampleFile[] = [
        {
            language: 'html',
            code: defaultFlexibleColumnLayoutHtml,
            fileName: 'flexible-column-layout-example',
            scssFileCode: defaultFlexibleColumnLayoutScss
        },
        {
            language: 'typescript',
            component: 'FlexibleColumnLayoutExampleComponent',
            code: defaultFlexibleColumnLayoutTs,
            fileName: 'flexible-column-layout-example'
        }
    ];
}
