import { Component } from '@angular/core';
import { getExampleFile } from '@fundamental-ngx/docs/shared';
import { ActionBarMobileExampleComponent } from './examples/action-bar-mobile-example.component';
import {
    ActionBarNoBackExampleComponent,
    ActionBarContextualMenuExampleComponent
} from './examples/action-bar-examples.component';
import { ActionBarLongStringTitleTruncationExampleComponent } from './examples/action-bar-long-string-title-truncation-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ActionBarBackExampleComponent } from './examples/action-bar-back-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-action-bar',
    templateUrl: './action-bar-docs.component.html',
    styleUrls: ['action-bar-docs.component.scss'],
    standalone: true,
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
