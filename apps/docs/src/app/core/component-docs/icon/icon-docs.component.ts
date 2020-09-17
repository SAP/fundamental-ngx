import { Component } from '@angular/core';

import * as iconSrc from '!raw-loader!./examples/icon-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as iconTsCode from '!raw-loader!./examples/icon-example.component.ts';
import * as iconScssCode from '!raw-loader!./examples/icon-example.component.scss';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html'
})
export class IconDocsComponent {

    data: any = {
        properties: {
            glyphs: 'accelerated'
        },
        modifier: {
            block: 'default'
        }
    };

    iconExample: ExampleFile[] = [
        {
            language: 'html',
            code: iconSrc,
            fileName: 'icon-example',
            typescriptFileCode: iconTsCode,
            component: 'IconExampleComponent',
            scssFileCode: iconScssCode
        }
    ];
}
