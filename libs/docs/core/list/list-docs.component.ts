import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const listSortPipe = 'sort.pipe.ts';
const listSrc = 'list-example.component.html';
const listSecondarySrc = 'list-secondary-example.component.html';
const iconListSrc = 'list-icon-example.component.html';
const complexList = 'list-complex-example.component.html';
const actionListH = 'list-action-example/list-action-example.component.html';
const actionListTs = 'list-action-example/list-action-example.component.ts';
const borderLessListHtml = 'list-borderless-example/list-borderless-example.component.html';
const dndListTs = 'list-dnd-example/list-dnd-example.component.ts';
const dndListH = 'list-dnd-example/list-dnd-example.component.html';
const keyboardListTs = 'list-keyboard-example/list-keyboard-example.component.ts';
const keyboardListH = 'list-keyboard-example/list-keyboard-example.component.html';
const listIndicatorH = 'list-nav-indicator-example/list-nav-indicator-example.component.html';
const listNavH = 'list-navigation-example/list-navigation-example.component.html';
const listSelectionH = 'list-selection-example/list-selection-example.component.html';
const listSelectionTs = 'list-selection-example/list-selection-example.component.ts';
const listFilterTs = 'list-data-example/list-data-example.component.ts';
const listFilterH = 'list-data-example/list-data-example.component.html';
const infiniteScrollSrcHtml = 'list-infinite-scroll-example.component.html';
const infiniteScrollSrcTs = 'list-infinite-scroll-example.component.ts';
const listInteractiveHtml = 'list-interactive-example/list-interactive-example.component.html';

@Component({
    selector: 'app-list',
    templateUrl: './list-docs.component.html'
})
export class ListDocsComponent {
    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listSrc),
            fileName: 'list-example'
        }
    ];

    secondaryList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listSecondarySrc),
            fileName: 'list-example-secondary'
        }
    ];

    iconList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconListSrc),
            fileName: 'list-icon-example'
        }
    ];

    listComplex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(complexList),
            fileName: 'list-complex-example'
        }
    ];

    listBorderLess: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(borderLessListHtml),
            fileName: 'list-borderless-example'
        }
    ];

    listAction: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(actionListH),
            fileName: 'list-action-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(actionListTs),
            fileName: 'list-action-example',
            component: 'ListActionExampleComponent'
        }
    ];

    listDnd: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dndListH),
            fileName: 'list-dnd-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dndListTs),
            fileName: 'list-dnd-example',
            component: 'ListDndExampleComponent'
        }
    ];

    listData: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listFilterH),
            fileName: 'list-data-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listFilterTs),
            fileName: 'list-data-example',
            component: 'ListDataExampleComponent'
        },
        {
            language: 'typescript',
            component: 'SortByPipe',
            code: getAssetFromModuleAssets(listSortPipe, undefined, 'shared'),
            pipe: true,
            fileName: 'sort',
            name: 'Sort Pipe'
        }
    ];

    keyboardList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(keyboardListH),
            fileName: 'list-keyboard-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(keyboardListTs),
            fileName: 'list-keyboard-example',
            component: 'ListKeyboardExampleComponent'
        }
    ];

    listSelect: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listSelectionH),
            fileName: 'list-selection-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(listSelectionTs),
            fileName: 'list-selection-example',
            component: 'ListSelectionExampleComponent'
        }
    ];

    listNavIndicator: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listIndicatorH),
            fileName: 'list-nav-indicator-example'
        }
    ];

    listNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listNavH),
            fileName: 'list-navigation-example'
        }
    ];

    listInteractive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(listInteractiveHtml),
            fileName: 'list-interactive-example'
        }
    ];

    infiniteScrollCode: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(infiniteScrollSrcHtml),
            fileName: 'list-infinite-scroll-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(infiniteScrollSrcTs),
            fileName: 'list-infinite-scroll-example',
            component: 'ListInfiniteScrollExampleComponent'
        }
    ];
}
