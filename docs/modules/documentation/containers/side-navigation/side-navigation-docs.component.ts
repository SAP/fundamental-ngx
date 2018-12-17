import { Component, OnInit } from '@angular/core';

import * as sideNavigationSrc from '!raw-loader!./examples/side-navigation-example.component.html';
import * as sideNavigationCollapsedSrc from '!raw-loader!./examples/side-navigation-collapsed-example.component.html';
import * as sideNavigationIconsSrc from '!raw-loader!./examples/side-navigation-icons-example.component.html';
import * as sideNavigationLevelsSrc from '!raw-loader!./examples/side-navigation-levels-example.component.html';
import * as sideNavigationTitlesSrc from '!raw-loader!./examples/side-navigation-titles-example.component.html';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
})
export class SideNavigationDocsComponent implements OnInit {
    oneLevelSideNavHtml = sideNavigationSrc;

    titlesSideNavHtml = sideNavigationTitlesSrc;

    multiLevelsSideNavHtml = sideNavigationLevelsSrc;

    iconsSideNavHtml = sideNavigationIconsSrc;

    collapsedSideNavHtml = sideNavigationCollapsedSrc;

    constructor() {}

    ngOnInit() {}
}
