import { Component } from '@angular/core';

import * as listSrc from '!raw-loader!./examples/list-example.component.html';
import * as listSecondarySrc from '!raw-loader!./examples/list-secondary-example.component.html';
import * as iconListSrc from '!raw-loader!./examples/list-icon-example.component.html';
import * as complexList from '!raw-loader!./examples/list-complex-example.component.html';
import * as actionListH from '!raw-loader!./examples/list-action-example/list-action-example.component.html';
import * as actionListTs from '!raw-loader!./examples/list-action-example/list-action-example.component.ts';
import * as borderLessListHtml from '!raw-loader!./examples/list-borderless-example/list-borderless-example.component.html';
import * as dndListTs from '!raw-loader!./examples/list-dnd-example/list-dnd-example.component.ts';
import * as dndListH from '!raw-loader!./examples/list-dnd-example/list-dnd-example.component.html';
import * as keyboardListTs from '!raw-loader!./examples/list-keyboard-example/list-keyboard-example.component.ts';
import * as keyboardListH from '!raw-loader!./examples/list-keyboard-example/list-keyboard-example.component.html';
import * as listIndicatorH from '!raw-loader!./examples/list-nav-indicator-example/list-nav-indicator-example.component.html';
import * as listNavH from '!raw-loader!./examples/list-navigation-example/list-navigation-example.component.html';
import * as listSelectionH from '!raw-loader!./examples/list-selection-example/list-selection-example.component.html';
import * as listSelectionTs from '!raw-loader!./examples/list-selection-example/list-selection-example.component.ts';
import * as listFilterTs from '!raw-loader!./examples/list-data-example/list-data-example.component.ts';
import * as listFilterH from '!raw-loader!./examples/list-data-example/list-data-example.component.html';
import * as listSortPipe from '!raw-loader!../../../documentation/core-helpers/pipes/sort.pipe.ts';
import * as infiniteScrollSrcHtml from '!raw-loader!./examples/list-infinite-scroll-example.component.html';
import * as infiniteScrollSrcTs from '!raw-loader!./examples/list-infinite-scroll-example.component.ts';
import * as listInteractiveHtml from '!raw-loader!./examples/list-interactive-example/list-interactive-example.component.html';
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
            fileName: 'list-complex-example'
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
            component: 'listDataExampleComponent'
        },
        {
            language: 'typescript',
            component: 'SortPipe',
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
