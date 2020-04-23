import { Component, OnInit } from '@angular/core';
import * as sliSrc from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-example.component.html';
import * as borderLessSLISrc from '!raw-loader!./platform-standard-list-item-examples/platform-borderless-standard-list-item-example.component.html';
import * as borderLessSLITs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-border-less-example.component.ts';
import * as groupHeaderSLITs from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-group-header-example.component.ts';
import * as sliWithSecondaryType from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-secondary-type-example.component.html';
import * as sliWithFooter from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-footer-example.component.html';
import * as sliWithGroupHeader from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-group-header-example.component.html';
import * as sliWithSelection from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-selection-example.component.html';
import * as sliWithSingleSelection from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-single-selection-example.component.html';
import * as sliWithNavigation from '!raw-loader!./platform-standard-list-item-examples/platform-standard-list-item-with-navigation-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-standard-list-item',
    templateUrl: './platform-standard-list-item-docs.component.html'
})
export class PlatformStandardListItemDocsComponent implements OnInit {
    simpleSLI: ExampleFile[] = [
        {
            language: 'html',
            code: sliSrc,
            fileName: 'platform-standard-list-item-example',
        }
    ];

    borderLessSLI: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessSLISrc,
            fileName: 'platform-borderless-standard-list-item-example',
        },
        {
            language: 'typescript',
            component: 'PlatformListBorderLessExampleComponent',
            code: borderLessSLITs,
            fileName: 'platform-borderless-standard-list-item-example'
        }
    ];

    sliWithSecondaryType: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithSecondaryType,
            fileName: 'platform-standard-list-item-with-secondary-type-example',
        }
    ];

    sliWithFooter: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithFooter,
            fileName: 'platform-standard-list-item-with-footer-example',
        }
    ];

    sliWithGroupHeader: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithGroupHeader,
            fileName: 'platform-standard-list-item-with-group-header-example',
        },
        {
            language: 'typescript',
            component: 'PlatformListWithGroupHeaderExampleComponent',
            code: groupHeaderSLITs,
            fileName: 'platform-standard-list-item-with-group-header-example'
        }
    ];

    sliWithSelection: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithSelection,
            fileName: 'platform-standard-list-item-with-selection-example',
        }
    ];

    sliWithSingleSelection: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithSingleSelection,
            fileName: 'platform-standard-list-item-with-single-selection-example',
        }
    ];

    sliWithNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: sliWithNavigation,
            fileName: 'platform-standard-list-item-with-navigation-example',
        }
    ];


    ngOnInit() { }
    constructor() { }

}
