import { Component } from '@angular/core';

import listSrc from '!./examples/list-example.component.html?raw';
import listSecondarySrc from '!./examples/list-secondary-example.component.html?raw';
import iconListSrc from '!./examples/list-icon-example.component.html?raw';
import complexList from '!./examples/list-complex-example.component.html?raw';
import actionListH from '!./examples/list-action-example/list-action-example.component.html?raw';
import actionListTs from '!./examples/list-action-example/list-action-example.component.ts?raw';
import borderLessListHtml from '!./examples/list-borderless-example/list-borderless-example.component.html?raw';
import dndListTs from '!./examples/list-dnd-example/list-dnd-example.component.ts?raw';
import dndListH from '!./examples/list-dnd-example/list-dnd-example.component.html?raw';
import keyboardListTs from '!./examples/list-keyboard-example/list-keyboard-example.component.ts?raw';
import keyboardListH from '!./examples/list-keyboard-example/list-keyboard-example.component.html?raw';
import listIndicatorH from '!./examples/list-nav-indicator-example/list-nav-indicator-example.component.html?raw';
import listNavH from '!./examples/list-navigation-example/list-navigation-example.component.html?raw';
import listSelectionH from '!./examples/list-selection-example/list-selection-example.component.html?raw';
import listSelectionTs from '!./examples/list-selection-example/list-selection-example.component.ts?raw';
import listFilterTs from '!./examples/list-data-example/list-data-example.component.ts?raw';
import listFilterH from '!./examples/list-data-example/list-data-example.component.html?raw';
import listSortPipe from '!../../../documentation/core-helpers/pipes/sort.pipe.ts?raw';
import infiniteScrollSrcHtml from '!./examples/list-infinite-scroll-example.component.html?raw';
import infiniteScrollSrcTs from '!./examples/list-infinite-scroll-example.component.ts?raw';
import listInteractiveHtml from '!./examples/list-interactive-example/list-interactive-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-list',
    templateUrl: './list-docs.component.html'
})
export class ListDocsComponent {
    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: listSrc,
            fileName: 'list-example'
        }
    ];

    secondaryList: ExampleFile[] = [
        {
            language: 'html',
            code: listSecondarySrc,
            fileName: 'list-example-secondary'
        }
    ];

    iconList: ExampleFile[] = [
        {
            language: 'html',
            code: iconListSrc,
            fileName: 'list-icon-example'
        }
    ];

    listComplex: ExampleFile[] = [
        {
            language: 'html',
            code: complexList,
            fileName: 'list-complex-example'
        }
    ];

    listBorderLess: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessListHtml,
            fileName: 'list-borderless-example'
        }
    ];

    listAction: ExampleFile[] = [
        {
            language: 'html',
            code: actionListH,
            fileName: 'list-action-example'
        },
        {
            language: 'typescript',
            code: actionListTs,
            fileName: 'list-action-example',
            component: 'ListActionExampleComponent'
        }
    ];

    listDnd: ExampleFile[] = [
        {
            language: 'html',
            code: dndListH,
            fileName: 'list-dnd-example'
        },
        {
            language: 'typescript',
            code: dndListTs,
            fileName: 'list-dnd-example',
            component: 'ListDndExampleComponent'
        }
    ];

    listData: ExampleFile[] = [
        {
            language: 'html',
            code: listFilterH,
            fileName: 'list-data-example'
        },
        {
            language: 'typescript',
            code: listFilterTs,
            fileName: 'list-data-example',
            component: 'ListDataExampleComponent'
        },
        {
            language: 'typescript',
            component: 'SortByPipe',
            code: listSortPipe,
            pipe: true,
            fileName: 'sort',
            name: 'Sort Pipe'
        }
    ];

    keyboardList: ExampleFile[] = [
        {
            language: 'html',
            code: keyboardListH,
            fileName: 'list-keyboard-example'
        },
        {
            language: 'typescript',
            code: keyboardListTs,
            fileName: 'list-keyboard-example',
            component: 'ListKeyboardExampleComponent'
        }
    ];

    listSelect: ExampleFile[] = [
        {
            language: 'html',
            code: listSelectionH,
            fileName: 'list-selection-example'
        },
        {
            language: 'typescript',
            code: listSelectionTs,
            fileName: 'list-selection-example',
            component: 'ListSelectionExampleComponent'
        }
    ];

    listNavIndicator: ExampleFile[] = [
        {
            language: 'html',
            code: listIndicatorH,
            fileName: 'list-nav-indicator-example'
        }
    ];

    listNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: listNavH,
            fileName: 'list-navigation-example'
        }
    ];

    listInteractive: ExampleFile[] = [
        {
            language: 'html',
            code: listInteractiveHtml,
            fileName: 'list-interactive-example'
        }
    ];

    infiniteScrollCode: ExampleFile[] = [
        {
            language: 'html',
            code: infiniteScrollSrcHtml,
            fileName: 'list-infinite-scroll-example'
        },
        {
            language: 'typescript',
            code: infiniteScrollSrcTs,
            fileName: 'list-infinite-scroll-example',
            component: 'ListInfiniteScrollExampleComponent'
        }
    ];
}
