import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ROUTES } from './core-documentation.routes';
import { declarations, entryComponents } from './components';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { StackblitzService } from '../documentation/core-helpers/stackblitz/stackblitz.service';

@NgModule({
    declarations: [
        declarations,
    ],

    entryComponents: entryComponents,
    imports: [
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES)
    ],
    providers: [
        { provide: 'CURRENT_LIB', useValue: 'core' },
        StackblitzService
    ]
})
export class CoreDocumentationModule { }
