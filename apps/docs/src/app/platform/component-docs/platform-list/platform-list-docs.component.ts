import { Component } from '@angular/core';
import * as listSrc from '!raw-loader!./platform-list-examples/platform-list-example.component.html';
import * as borderLessListSrc from '!raw-loader!./platform-list-examples/platform-list-border-less-example.component.html';
import * as borderLessListTs from '!raw-loader!./platform-list-examples/platform-list-border-less-example.component';
import * as listWithDeleteButton from '!raw-loader!./platform-list-examples/platform-list-with-delete-button-example.component.html';
import * as listWithButtonsHtml from '!raw-loader!./platform-list-examples/platform-list-with-buttons-example.component.html';
import * as listWithButtonsTs from '!raw-loader!./platform-list-examples/platform-list-with-buttons-example.component';
import * as listWithDeleteButtonTs from '!raw-loader!./platform-list-examples/platform-list-with-delete-button-example.component';
import * as listWithFooter from '!raw-loader!./platform-list-examples/platform-list-with-footer-example.component.html';
import * as listWithFooterTs from '!raw-loader!./platform-list-examples/platform-list-with-footer-example.component';
import * as listWithGroupHeader from '!raw-loader!./platform-list-examples/platform-list-with-group-header-example.component.html';
import * as listWithItemCounter from '!raw-loader!./platform-list-examples/platform-list-with-item-counter-example.component.html';
import * as listWithItemCounterTs from '!raw-loader!./platform-list-examples/platform-list-with-item-counter-example.component';
import * as listWithSelection from '!raw-loader!./platform-list-examples/platform-list-with-selection-example.component.html';
import * as listWithSelectionTs from '!raw-loader!./platform-list-examples/platform-list-with-selection-example.component';
import * as listWithSingleSelection from '!raw-loader!./platform-list-examples/platform-list-with-single-selection-example.component.html';
import * as listWithSingleSelectionTs from '!raw-loader!./platform-list-examples/platform-list-with-single-selection-example.component';
import * as listWithNavigation from '!raw-loader!./platform-list-examples/platform-list-with-navigation-example.component.html';
import * as listWithNavigationTs from '!raw-loader!./platform-list-examples/platform-list-with-navigation-example.component';
import * as listWithInfiniteScroll from '!raw-loader!./platform-list-examples/platform-list-with-infinite-scroll-example.component.html';
import * as listWithInfiniteScrollTs from '!raw-loader!./platform-list-examples/platform-list-with-infinite-scroll-example.component';
import * as listWithMoreButton from '!raw-loader!./platform-list-examples/platform-list-with-more-button-example.component.html';
import * as listWithMoreButtonTs from '!raw-loader!./platform-list-examples/platform-list-with-more-button-example.component';
import * as listWithNoData from '!raw-loader!./platform-list-examples/platform-list-with-nodata-example.component.html';
import * as listWithUnRead from '!raw-loader!./platform-list-examples/platform-list-with-unread-example.component.html';
import * as listWithNoSeperator from '!raw-loader!./platform-list-examples/platform-list-with-no-seperator-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-list',
    templateUrl: './platform-list-docs.component.html'
})
export class PlatformListDocsComponent {
    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: listSrc,
            fileName: 'platform-list-example'
        }
    ];

    borderLesssList: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessListSrc,
            fileName: 'platform-list-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListBorderLessExampleComponent',
            code: borderLessListTs,
            fileName: 'platform-list-border-less-example'
        }
    ];

    listWithDeleteButton: ExampleFile[] = [
        {
            language: 'html',
            code: listWithDeleteButton,
            fileName: 'platform-list-with-delete-button-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithDeleteButtonExampleComponent',
            code: listWithDeleteButtonTs,
            fileName: 'platform-list-with-delete-button-example'
        }
    ];

    listWithButtons: ExampleFile[] = [
        {
            language: 'html',
            code: listWithButtonsHtml,
            fileName: 'platform-list-with-buttons-example'
        },
        {
            language: 'typescript',
            code: listWithButtonsTs,
            fileName: 'platform-list-with-buttons-example',
            component: 'PlatformListWithButtonsExampleComponent'
        }
    ];

    listWithFooter: ExampleFile[] = [
        {
            language: 'html',
            code: listWithFooter,
            fileName: 'platform-list-with-footer-example'
        },
        {
            language: 'typescript',
            code: listWithFooterTs,
            fileName: 'platform-list-with-footer-example',
            component: 'PlatformListWithFooterExampleComponent'
        }
    ];

    listWithGroupHeader: ExampleFile[] = [
        {
            language: 'html',
            code: listWithGroupHeader,
            fileName: 'platform-list-with-group-header-example'
        }
    ];

    listWithItemCounter: ExampleFile[] = [
        {
            language: 'html',
            code: listWithItemCounter,
            fileName: 'platform-list-with-item-counter-example'
        },
        {
            language: 'typescript',
            code: listWithItemCounterTs,
            fileName: 'platform-list-with-item-counter-example',
            component: 'PlatformListWithItemCounterExampleComponent'
        }
    ];

    listWithSelection: ExampleFile[] = [
        {
            language: 'html',
            code: listWithSelection,
            fileName: 'platform-list-with-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithSelectionExampleComponent',
            code: listWithSelectionTs,
            fileName: 'platform-list-with-selection-example'
        }
    ];

    listWithSingleSelection: ExampleFile[] = [
        {
            language: 'html',
            code: listWithSingleSelection,
            fileName: 'platform-list-with-single-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithSingleSelectionExampleComponent',
            code: listWithSingleSelectionTs,
            fileName: 'platform-list-with-single-selection-example'
        }
    ];

    listWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: listWithNavigation,
            fileName: 'platform-list-with-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithNavigationExampleComponent',
            code: listWithNavigationTs,
            fileName: 'platform-list-with-navigation-example'
        }
    ];

    listWithInfiniteScroll: ExampleFile[] = [
        {
            language: 'html',
            code: listWithInfiniteScroll,
            fileName: 'platform-list-with-infinite-scroll-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithInfiniteScrollExampleComponent',
            code: listWithInfiniteScrollTs,
            fileName: 'platform-list-with-infinite-scroll-example'
        }
    ];
    listWithMoreButton: ExampleFile[] = [
        {
            language: 'html',
            code: listWithMoreButton,
            fileName: 'platform-list-with-more-button-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithMoreButtonExampleComponent',
            code: listWithMoreButtonTs,
            fileName: 'platform-list-with-more-button-example'
        }
    ];

    listWithNoData: ExampleFile[] = [
        {
            language: 'html',
            code: listWithNoData,
            fileName: 'platform-list-with-nodata-example'
        }
    ];

    listWithNoSeperator: ExampleFile[] = [
        {
            language: 'html',
            code: listWithNoSeperator,
            fileName: 'platform-list-with-no-seperator-example'
        }
    ];

    listWithUnRead: ExampleFile[] = [
        {
            language: 'html',
            code: listWithUnRead,
            fileName: 'platform-list-with-unread-example'
        }
    ];
}
