import { Component } from '@angular/core';
import { getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss']
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
