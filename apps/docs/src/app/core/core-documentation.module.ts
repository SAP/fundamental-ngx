import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';

import {ROUTES} from './core-documentation.routes';
import {SharedDocumentationModule} from '../documentation/shared-documentation.module';
import {StackblitzService} from '../documentation/core-helpers/stackblitz/stackblitz.service';
import {CoreDocumentationComponent} from './documentation/core-documentation.component';
import {HomeDocsComponent} from './component-docs/core-home/core-home.component';
import {NewComponentComponent} from './component-docs/new-component/new-component.component';

@NgModule({
    declarations: [
        HomeDocsComponent,
        NewComponentComponent,
        CoreDocumentationComponent
    ],
    imports: [
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        {provide: 'CURRENT_LIB', useValue: 'core'},
        StackblitzService
    ]
})
export class CoreDocumentationModule {
}
