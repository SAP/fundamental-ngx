import { Component } from '@angular/core';
import VerticalNavigationDefaultExample from '!./examples/vertical-navigation-default-example.component.html?raw';
import VerticalNavigationGroupingExample from '!./examples/vertical-navigation-grouping-example.component.html?raw';
import VerticalNavigationCondensedExample from '!./examples/vertical-navigation-condensed-example.component.html?raw';
import VerticalNavigationNoIconsExample from '!./examples/vertical-navigation-no-icons-example.component.html?raw';
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
    noIconsVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: VerticalNavigationNoIconsExample,
            fileName: 'vertical-navigation-no-icons-example'
        }
    ];
    groupingVerticalNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: VerticalNavigationGroupingExample,
            fileName: 'vertical-navigation-grouping-example'
        }
    ];
}
