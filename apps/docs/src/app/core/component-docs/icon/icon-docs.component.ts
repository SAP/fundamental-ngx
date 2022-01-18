import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import iconSrc from '!./examples/icon-example.component.html?raw';
import iconTNTSrc from '!./examples/icon-tnt-example.component.html?raw';
import iconBusinessSuiteInAppSymbolsSrc from '!./examples/icon-businessSuiteInAppSymbols-example.component.html?raw';

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
