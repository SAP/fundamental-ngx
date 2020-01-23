import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ROUTES } from './core-documentation.routes';
import { declarations, entryComponents } from './components';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { TabFilterExampleComponent } from './component-docs/tabs/examples/tab-filter-example/tab-filter-example.component';
import { TabCounterComponent } from './component-docs/tabs/examples/tab-counter/tab-counter.component';

@NgModule({
    declarations: [
        declarations,
        TabFilterExampleComponent,
        TabCounterComponent,
    ],

    entryComponents: entryComponents,
    imports: [
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        { provide: 'CURRENT_LIB', useValue: 'core' }
    ]
})
export class CoreDocumentationModule { }
