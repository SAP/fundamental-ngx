import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as sideNavigationSrc from '!raw-loader!./examples/side-navigation-example.component.html';
import * as sideNavigationCollapsedSrc from '!raw-loader!./examples/side-navigation-collapsed-example.component.html';
import * as sideNavigationIconsSrc from '!raw-loader!./examples/side-navigation-icons-example.component.html';
import * as sideNavigationLevelsSrc from '!raw-loader!./examples/side-navigation-levels-example.component.html';
import * as sideNavigationTitlesSrc from '!raw-loader!./examples/side-navigation-titles-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
})
export class SideNavigationDocsComponent implements OnInit {
    oneLevelSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationSrc
        }
    ];

    titlesSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationTitlesSrc
        }
    ];

    multiLevelsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationLevelsSrc
        }
    ];

    iconsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationIconsSrc
        }
    ];

    collapsedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCollapsedSrc
        }
    ];

    ngOnInit() {}
}
