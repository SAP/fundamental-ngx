import { Component, OnInit } from '@angular/core';
import * as listSrc from '!raw-loader!./platform-list-examples/platform-list-example.component.html';
import * as borderLessListSrc from '!raw-loader!./platform-list-examples/platform-borderless-list-example.component.html';
import * as borderLessListTs from '!raw-loader!./platform-list-examples/platform-list-border-less-example.component.ts';
import * as groupHeaderListTs from '!raw-loader!./platform-list-examples/platform-list-with-group-header-example.component.ts';
import * as listWithDeleteButton from '!raw-loader!./platform-list-examples/platform-list-with-delete-button-example.component.html';
import * as listWithFooter from '!raw-loader!./platform-list-examples/platform-list-with-footer-example.component.html';
import * as listWithGroupHeader from '!raw-loader!./platform-list-examples/platform-list-with-group-header-example.component.html';
import * as listWithItemCounter from '!raw-loader!./platform-list-examples/platform-list-with-item-counter-example.component.html';
import * as listWithSelection from '!raw-loader!./platform-list-examples/platform-list-with-selection-example.component.html';
import * as listWithSingleSelection from '!raw-loader!./platform-list-examples/platform-list-with-single-selection-example.component.html';
import * as listWithNavigation from '!raw-loader!./platform-list-examples/platform-list-with-navigation-example.component.html';
import * as listWithInfiniteScroll from '!raw-loader!./platform-list-examples/platform-list-with-infinite-scroll-example.component.html';
import * as listWithInfiniteScrollTs from '!raw-loader!./platform-list-examples/platform-list-with-infinite-scroll-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-list',
    templateUrl: './platform-list-docs.component.html'
})
export class PlatformListDocsComponent implements OnInit {
    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: listSrc,
            fileName: 'platform-list-example',
        }
    ];

    borderLesssList: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessListSrc,
            fileName: 'platform-borderless-list-example',
        },
        {
            language: 'typescript',
            component: 'PlatformListBorderLessExampleComponent',
            code: borderLessListTs,
            fileName: 'platform-borderless-list-example'
        }
    ];

    listWithDeleteButton: ExampleFile[] = [
        {
            language: 'html',
            code: listWithDeleteButton,
            fileName: 'platform-list-with-delete-button-example',
        }
    ];

    listWithFooter: ExampleFile[] = [
        {
            language: 'html',
            code: listWithFooter,
            fileName: 'platform-list-with-footer-example',
        }
    ];

    listWithGroupHeader: ExampleFile[] = [
        {
            language: 'html',
            code: listWithGroupHeader,
            fileName: 'platform-list-with-group-header-example',
        },
        {
            language: 'typescript',
            component: 'PlatformListWithGroupHeaderExampleComponent',
            code: groupHeaderListTs,
            fileName: 'platform-list-with-group-header-example'
        }
    ];

    listWithItemCounter: ExampleFile[] = [
        {
            language: 'html',
            code: listWithItemCounter,
            fileName: 'platform-list-with-item-counter-example',
        }
    ];

    listWithSelection: ExampleFile[] = [
        {
            language: 'html',
            code: listWithSelection,
            fileName: 'platform-list-with-selection-example',
        }
    ];

    listWithSingleSelection: ExampleFile[] = [
        {
            language: 'html',
            code: listWithSingleSelection,
            fileName: 'platform-list-with-single-selection-example',
        }
    ];

    listWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: listWithNavigation,
            fileName: 'platform-list-with-navigation-example',
        }
    ];

    listWithInfiniteScroll: ExampleFile[] = [
        {
            language: 'html',
            code: listWithInfiniteScroll,
            fileName: 'platform-list-with-infinite-scroll-example',
        },
        {
            language: 'typescript',
            component: 'PlatformListWithInfiniteScrollExampleComponent',
            code: listWithInfiniteScrollTs,
            fileName: 'platform-list-with-infinite-scroll-example'
        }
    ];


    ngOnInit() { }
    constructor() { }
}
