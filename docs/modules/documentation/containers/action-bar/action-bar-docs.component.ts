import { Component } from '@angular/core';

import * as backButtonExample from '!raw-loader!./examples/action-bar-back-example.component.html';
import * as contextualMenuExample from '!raw-loader!./examples/action-bar-contextual-menu-example.component.html';
import * as mobileExample from '!raw-loader!./examples/action-bar-mobile-example.component.html';
import * as noBackButtonExample from '!raw-loader!./examples/action-bar-no-back-example.component.html';

@Component({
    selector: 'app-toolbar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss']
})
export class ActionBarDocsComponent {
    backButtonHtml = backButtonExample;

    noBackButtonHtml = noBackButtonExample;

    actionsContextualMenuHtml = contextualMenuExample;

    mobileViewHtml = mobileExample;
}
