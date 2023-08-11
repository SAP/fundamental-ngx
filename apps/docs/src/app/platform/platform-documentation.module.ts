import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MarkdownModule } from 'ngx-markdown';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CURRENT_LIB, SharedDocumentationModule, StackblitzService } from '@fundamental-ngx/docs/shared';
import { ROUTES } from './platform-documentation.routes';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { PlatformSchemaModule } from '@fundamental-ngx/docs/platform/schema';

@NgModule({
    declarations: [PlatformDocumentationComponent, PlatformHomeComponent, NewComponentComponent],
    imports: [
        ScrollingModule,
        AvatarModule,
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES),
        PlatformSchemaModule
    ],
    providers: [{ provide: CURRENT_LIB, useValue: 'platform' }, StackblitzService]
})
export class PlatformDocumentationModule {}
