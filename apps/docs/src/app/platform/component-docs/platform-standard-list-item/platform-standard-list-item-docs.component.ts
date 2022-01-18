import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import sliSrc from '!./platform-standard-list-item-examples/platform-standard-list-item-example.component.html?raw';
import borderLessSLISrc from '!./platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component.html?raw';
import borderLessSLITs from '!./platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component.ts?raw';
import sliWithSecondaryType from '!./platform-standard-list-item-examples/platform-standard-list-item-with-secondary-type-example.component.html?raw';
import sliWithInvertedSecondaryType from '!./platform-standard-list-item-examples/platform-standard-list-item-with-inverted-secondary-type-example.component.html?raw';
import sliWithFooter from '!./platform-standard-list-item-examples/platform-standard-list-item-with-footer-example.component.html?raw';
import sliWithFooterTs from '!./platform-standard-list-item-examples/platform-standard-list-item-with-footer-example.component?raw';
import sliWithGroupHeader from '!./platform-standard-list-item-examples/platform-standard-list-item-with-group-header-example.component.html?raw';
import sliWithSelection from '!./platform-standard-list-item-examples/platform-standard-list-item-with-selection-example.component.html?raw';
import sliWithSelectionTs from '!./platform-standard-list-item-examples/platform-standard-list-item-with-selection-example.component.ts?raw';
import sliWithSingleSelection from '!./platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component.html?raw';
import sliWithSingleSelectionTs from '!./platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component.ts?raw';
import sliWithNavigation from '!./platform-standard-list-item-examples/platform-standard-list-item-with-navigation-example.component.html?raw';
import sliWithNavigationTs from '!./platform-standard-list-item-examples/platform-standard-list-item-with-navigation-example.component?raw';
import sli from '!./platform-standard-list-item-examples/platform-non-byline-standard-list-item-example.component.html?raw';

@Component({
    selector: 'app-standard-list-item',
    templateUrl: './platform-standard-list-item-docs.component.html'
})
export class PlatformStandardListItemDocsComponent {
    simpleSLI: ExampleFile[] = [
        {
            language: 'html',
            code: sliSrc,
            fileName: 'platform-standard-list-item-example'
        }
    ];

    sli: ExampleFile[] = [
        {
            language: 'html',
            code: sli,
            fileName: 'platform-non-byline-standard-list-item-example'
        }
    ];
    borderLessSLI: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessSLISrc,
            fileName: 'platform-standard-list-item-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemBorderLessExampleComponent',
            code: borderLessSLITs,
            fileName: 'platform-standard-list-item-border-less-example'
        }
    ];

    sliWithSecondaryType: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithSecondaryType,
            fileName: 'platform-standard-list-item-with-secondary-type-example'
        }
    ];

    sliWithInvertedSecondaryType: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithInvertedSecondaryType,
            fileName: 'platform-standard-list-item-with-inverted-secondary-type-example'
        }
    ];

    sliWithFooter: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithFooter,
            fileName: 'platform-standard-list-item-with-footer-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithFooterExampleComponent',
            code: sliWithFooterTs,
            fileName: 'platform-standard-list-item-with-footer-example'
        }
    ];

    sliWithGroupHeader: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithGroupHeader,
            fileName: 'platform-standard-list-item-with-group-header-example'
        }
    ];

    sliWithSelection: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithSelection,
            fileName: 'platform-standard-list-item-with-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithSelectionExampleComponent',
            code: sliWithSelectionTs,
            fileName: 'platform-standard-list-item-with-selection-example'
        }
    ];

    sliWithSingleSelection: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithSingleSelection,
            fileName: 'platform-standard-list-item-with-single-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithSingleSelectExampleComponent',
            code: sliWithSingleSelectionTs,
            fileName: 'platform-standard-list-item-with-single-selection-example'
        }
    ];

    sliWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithNavigation,
            fileName: 'platform-standard-list-item-with-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformStandardListItemWithNavigationExampleComponent',
            code: sliWithNavigationTs,
            fileName: 'platform-standard-list-item-with-navigation-example'
        }
    ];
}
