import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    SeparatorComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { ActionBarBackExampleComponent } from './examples/action-bar-back-example.component';
import {
    ActionBarContextualMenuExampleComponent,
    ActionBarNoBackExampleComponent
} from './examples/action-bar-examples.component';
import { ActionBarLongStringTitleTruncationExampleComponent } from './examples/action-bar-long-string-title-truncation-example.component';
import { ActionBarMobileExampleComponent } from './examples/action-bar-mobile-example.component';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss'],
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ActionBarBackExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ActionBarLongStringTitleTruncationExampleComponent,
        ActionBarNoBackExampleComponent,
        ActionBarContextualMenuExampleComponent,
        ActionBarMobileExampleComponent
    ]
})
export class ActionBarDocsComponent {
    backButtonExample = [
        getExampleFile('action-bar-back-example.component.html'),
        getExampleFile('action-bar-back-example.component.ts', {
            component: 'ActionBarBackExampleComponent'
        })
    ];
    titleTruncationExample = [
        getExampleFile('action-bar-long-string-title-truncation-example.component.html'),
        getExampleFile('action-bar-long-string-title-truncation-example.component.ts', {
            component: 'ActionBarLongStringTitleTruncationExampleComponent'
        })
    ];
    noBackButtonExample = [getExampleFile('action-bar-no-back-example.component.html')];
    actionsContextualMenuHtml = [getExampleFile('action-bar-contextual-menu-example.component.html')];
    mobileViewHtml = [
        getExampleFile('action-bar-mobile-example.component.html'),
        getExampleFile('action-bar-mobile-example.component.ts', {
            component: 'ActionBarMobileExampleComponent'
        })
    ];
}
