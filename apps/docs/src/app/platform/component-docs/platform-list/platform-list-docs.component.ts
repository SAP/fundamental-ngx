import { Component } from '@angular/core';
import listSrc from '!./platform-list-examples/platform-list-example.component.html?raw';
import borderLessListSrc from '!./platform-list-examples/platform-list-border-less-example.component.html?raw';
import borderLessListTs from '!./platform-list-examples/platform-list-border-less-example.component?raw';
import listWithDeleteButton from '!./platform-list-examples/platform-list-with-delete-button-example.component.html?raw';
import listWithButtonsHtml from '!./platform-list-examples/platform-list-with-buttons-example.component.html?raw';
import listWithButtonsTs from '!./platform-list-examples/platform-list-with-buttons-example.component?raw';
import listWithDeleteButtonTs from '!./platform-list-examples/platform-list-with-delete-button-example.component?raw';
import listWithFooter from '!./platform-list-examples/platform-list-with-footer-example.component.html?raw';
import listWithFooterTs from '!./platform-list-examples/platform-list-with-footer-example.component?raw';
import listWithGroupHeader from '!./platform-list-examples/platform-list-with-group-header-example.component.html?raw';
import listWithItemCounter from '!./platform-list-examples/platform-list-with-item-counter-example.component.html?raw';
import listWithItemCounterTs from '!./platform-list-examples/platform-list-with-item-counter-example.component?raw';
import listWithSelection from '!./platform-list-examples/platform-list-with-selection-example.component.html?raw';
import listWithSelectionTs from '!./platform-list-examples/platform-list-with-selection-example.component?raw';
import listWithSingleSelection from '!./platform-list-examples/platform-list-with-single-selection-example.component.html?raw';
import listWithSingleSelectionTs from '!./platform-list-examples/platform-list-with-single-selection-example.component?raw';
import listWithNavigation from '!./platform-list-examples/platform-list-with-navigation-example.component.html?raw';
import listWithNavigationTs from '!./platform-list-examples/platform-list-with-navigation-example.component?raw';
import listWithInfiniteScroll from '!./platform-list-examples/platform-list-with-infinite-scroll-example.component.html?raw';
import listWithInfiniteScrollTs from '!./platform-list-examples/platform-list-with-infinite-scroll-example.component?raw';
import listWithMoreButton from '!./platform-list-examples/platform-list-with-more-button-example.component.html?raw';
import listWithMoreButtonTs from '!./platform-list-examples/platform-list-with-more-button-example.component?raw';
import listWithNoData from '!./platform-list-examples/platform-list-with-nodata-example.component.html?raw';
import listWithUnRead from '!./platform-list-examples/platform-list-with-unread-example.component.html?raw';

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

    listWithUnRead: ExampleFile[] = [
        {
            language: 'html',
            code: listWithUnRead,
            fileName: 'platform-list-with-unread-example'
        }
    ];
}
