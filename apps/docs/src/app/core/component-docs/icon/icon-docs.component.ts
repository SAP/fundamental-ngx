import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as iconSrc from '!raw-loader!./examples/icon-example.component.html';
import * as iconTNTSrc from '!raw-loader!./examples/icon-tnt-example.component.html';
import * as iconBusinessSuiteInAppSymbolsSrc from '!raw-loader!./examples/icon-businessSuiteInAppSymbols-example.component.html';

@Component({
    selector: 'app-icon',
    templateUrl: './icon-docs.component.html'
})
export class IconDocsComponent {
    iconExample: ExampleFile[] = [
        {
            language: 'html',
            code: iconSrc,
            fileName: 'icon-example',
            component: 'IconExampleComponent'
        }
    ];

    iconTNTExample: ExampleFile[] = [
        {
            language: 'html',
            code: iconTNTSrc,
            fileName: 'icon-example',
            component: 'IconTNTExampleComponent'
        }
    ];

    iconBusinessSuiteInAppSymbolsExample: ExampleFile[] = [
        {
            language: 'html',
            code: iconBusinessSuiteInAppSymbolsSrc,
            fileName: 'icon-example',
            component: 'IconBusinessSuiteInAppSymbolsExampleComponent'
        }
    ];
}
