import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MarkdownModule } from 'ngx-markdown';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { ROUTES } from './platform-documentation.routes';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { SchemaModule } from '../schema/schema.module';
import { PLATFORM_COMPONENT_SCHEMAS } from './component-docs/schemas';
import { StackblitzService } from '../documentation/core-helpers/stackblitz/stackblitz.service';
import { DocsThemeService } from '../documentation/services/docs-theme.service';
import { CURRENT_LIB } from '../documentation/utilities/libraries';

@NgModule({
    declarations: [PlatformDocumentationComponent, PlatformHomeComponent, NewComponentComponent],
    imports: [
        ScrollingModule,
        AvatarModule,
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES),
        SchemaModule.forRoot(PLATFORM_COMPONENT_SCHEMAS)
    ],
    providers: [{ provide: CURRENT_LIB, useValue: 'platform' }, StackblitzService, DocsThemeService]
})
export class PlatformDocumentationModule {}
