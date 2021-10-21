import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as sliSrc from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-example.component.html';
import * as borderLessSLISrc from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component.html';
import * as borderLessSLITs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component.ts';
import * as sliWithSecondaryType from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-secondary-type-example.component.html';
import * as sliWithInvertedSecondaryType from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-inverted-secondary-type-example.component.html';
import * as sliWithFooter from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-footer-example.component.html';
import * as sliWithFooterTs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-footer-example.component';
import * as sliWithGroupHeader from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-group-header-example.component.html';
import * as sliWithSelection from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-selection-example.component.html';
import * as sliWithSelectionTs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-selection-example.component.ts';
import * as sliWithSingleSelection from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component.html';
import * as sliWithSingleSelectionTs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component.ts';
import * as sliWithNavigation from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-navigation-example.component.html';
import * as sliWithNavigationTs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-navigation-example.component';
import * as sli from '!raw-loader!./platform-standard-list-item-examples/platform-non-byline-standard-list-item-example.component.html';

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
