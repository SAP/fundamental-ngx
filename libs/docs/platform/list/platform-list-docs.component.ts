import { Component } from '@angular/core';
const listSrc = 'platform-list-example.component.html';
const borderLessListSrc = 'platform-list-border-less-example.component.html';
const borderLessListTs = 'platform-list-border-less-example.component.ts';
const listWithDeleteButton = 'platform-list-with-delete-button-example.component.html';
const listWithButtonsHtml = 'platform-list-with-buttons-example.component.html';
const listWithButtonsTs = 'platform-list-with-buttons-example.component.ts';
const listWithDeleteButtonTs = 'platform-list-with-delete-button-example.component.ts';
const listWithFooter = 'platform-list-with-footer-example.component.html';
const listWithFooterTs = 'platform-list-with-footer-example.component.ts';
const listWithGroupHeader = 'platform-list-with-group-header-example.component.html';
const listWithItemCounter = 'platform-list-with-item-counter-example.component.html';
const listWithItemCounterTs = 'platform-list-with-item-counter-example.component.ts';
const listWithSelection = 'platform-list-with-selection-example.component.html';
const listWithSelectionTs = 'platform-list-with-selection-example.component.ts';
const listWithSingleSelection = 'platform-list-with-single-selection-example.component.html';
const listWithSingleSelectionTs = 'platform-list-with-single-selection-example.component.ts';
const listWithNavigation = 'platform-list-with-navigation-example.component.html';
const listWithNavigationTs = 'platform-list-with-navigation-example.component.ts';
const listWithInfiniteScroll = 'platform-list-with-infinite-scroll-example.component.html';
const listWithInfiniteScrollTs = 'platform-list-with-infinite-scroll-example.component.ts';
const listWithMoreButton = 'platform-list-with-more-button-example.component.html';
const listWithMoreButtonTs = 'platform-list-with-more-button-example.component.ts';
const listWithNoData = 'platform-list-with-nodata-example.component.html';
const listWithUnRead = 'platform-list-with-unread-example.component.html';
const listWithFreeContentHtml = 'platform-list-free-content-example.component.html';
const listWithFreeContentTs = 'platform-list-free-content-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-list',
    templateUrl: './platform-list-docs.component.html'
})
export class PlatformListDocsComponent {
    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listSrc),
            fileName: 'platform-list-example'
        }
    ];

    borderLesssList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(borderLessListSrc),
            fileName: 'platform-list-border-less-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListBorderLessExampleComponent',
            code: getAssetFromModuleAssets(borderLessListTs),
            fileName: 'platform-list-border-less-example'
        }
    ];

    listWithDeleteButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithDeleteButton),
            fileName: 'platform-list-with-delete-button-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithDeleteButtonExampleComponent',
            code: getAssetFromModuleAssets(listWithDeleteButtonTs),
            fileName: 'platform-list-with-delete-button-example'
        }
    ];

    listWithButtons: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithButtonsHtml),
            fileName: 'platform-list-with-buttons-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listWithButtonsTs),
            fileName: 'platform-list-with-buttons-example',
            component: 'PlatformListWithButtonsExampleComponent'
        }
    ];

    listWithFooter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithFooter),
            fileName: 'platform-list-with-footer-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listWithFooterTs),
            fileName: 'platform-list-with-footer-example',
            component: 'PlatformListWithFooterExampleComponent'
        }
    ];

    listWithGroupHeader: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithGroupHeader),
            fileName: 'platform-list-with-group-header-example'
        }
    ];

    listWithItemCounter: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithItemCounter),
            fileName: 'platform-list-with-item-counter-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listWithItemCounterTs),
            fileName: 'platform-list-with-item-counter-example',
            component: 'PlatformListWithItemCounterExampleComponent'
        }
    ];

    listWithSelection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithSelection),
            fileName: 'platform-list-with-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithSelectionExampleComponent',
            code: getAssetFromModuleAssets(listWithSelectionTs),
            fileName: 'platform-list-with-selection-example'
        }
    ];

    listWithSingleSelection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithSingleSelection),
            fileName: 'platform-list-with-single-selection-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithSingleSelectionExampleComponent',
            code: getAssetFromModuleAssets(listWithSingleSelectionTs),
            fileName: 'platform-list-with-single-selection-example'
        }
    ];

    listWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithNavigation),
            fileName: 'platform-list-with-navigation-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithNavigationExampleComponent',
            code: getAssetFromModuleAssets(listWithNavigationTs),
            fileName: 'platform-list-with-navigation-example'
        }
    ];

    listWithInfiniteScroll: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithInfiniteScroll),
            fileName: 'platform-list-with-infinite-scroll-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithInfiniteScrollExampleComponent',
            code: getAssetFromModuleAssets(listWithInfiniteScrollTs),
            fileName: 'platform-list-with-infinite-scroll-example'
        }
    ];
    listWithMoreButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithMoreButton),
            fileName: 'platform-list-with-more-button-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListWithMoreButtonExampleComponent',
            code: getAssetFromModuleAssets(listWithMoreButtonTs),
            fileName: 'platform-list-with-more-button-example'
        }
    ];

    listWithNoData: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithNoData),
            fileName: 'platform-list-with-nodata-example'
        }
    ];

    listWithUnRead: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithUnRead),
            fileName: 'platform-list-with-unread-example'
        }
    ];

    listWithFreeContent: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listWithFreeContentHtml),
            fileName: 'platform-list-free-content-example'
        },
        {
            language: 'typescript',
            component: 'PlatformListFreeContentExampleComponent',
            code: getAssetFromModuleAssets(listWithFreeContentTs),
            fileName: 'platform-list-free-content-example'
        }
    ];
}
