import { Component } from '@angular/core';
import * as VerticalNavigationDefaultExample from '!raw-loader!./examples/vertical-navigation-default-example.component.html';
import * as VerticalNavigationCondensedExample from '!raw-loader!./examples/vertical-navigation-condensed-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-vertical-navigation',
    templateUrl: './vertical-navigation-docs.component.html'
})
export class VerticalNavigationDocsComponent {
    defaultVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: VerticalNavigationDefaultExample,
            fileName: 'vertical-navigation-default-example'
        }
    ];
    condensedVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: VerticalNavigationCondensedExample,
            fileName: 'vertical-navigation-condensed-example'
        }
    ];

}
