import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as sideNavigationSrc from '!raw-loader!./examples/side-navigation-example.component.html';
import * as sideNavigationTscode from '!raw-loader!./examples/side-navigation-examples.component.ts';
import * as sideNavigationScsscode from '!raw-loader!./examples/side-navigation-examples.component.scss';
import * as sideNavigationCollapsedSrc from '!raw-loader!./examples/side-navigation-collapsed-example.component.html';
import * as sideNavigationCollapsedSrcScss from '!raw-loader!./examples/side-navigation-collapsed-example.component.scss';
import * as sideNavigationIconsSrc from '!raw-loader!./examples/side-navigation-icons-example.component.html';
import * as sideNavigationIconsSrcScss from '!raw-loader!./examples/side-navigation-icons-example.component.scss';
import * as sideNavigationLevelsSrc from '!raw-loader!./examples/side-navigation-levels-example.component.html';
import * as sideNavigationTitlesSrc from '!raw-loader!./examples/side-navigation-titles-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
})
export class SideNavigationDocsComponent implements OnInit {
    oneLevelSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationSrc,
            fileName: 'side-navigation-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationExampleComponent',
            scssFileCode: sideNavigationScsscode
        }
    ];

    titlesSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationTitlesSrc,
            fileName: 'side-navigation-titles-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationTitlesExampleComponent',
            scssFileCode: sideNavigationScsscode
        }
    ];

    multiLevelsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationLevelsSrc,
            fileName: 'side-navigation-levels-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationLevelsExampleComponent',
            scssFileCode: sideNavigationScsscode
        }
    ];

    iconsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationIconsSrc,
            fileName: 'side-navigation-icons-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationIconsExampleComponent',
            scssFileCode: sideNavigationIconsSrcScss
        }
    ];

    collapsedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCollapsedSrc,
            fileName: 'side-navigation-collapsed-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationCollapsedExampleComponent',
            scssFileCode: sideNavigationCollapsedSrcScss

        }
    ];

    ngOnInit() { }
}
