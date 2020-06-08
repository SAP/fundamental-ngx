import { NgModule } from '@angular/core';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './platform-documentation.routes';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { MarkdownModule } from 'ngx-markdown';
import { NewComponentComponent } from '../platform/component-docs/new-component/new-component.component';
import { SchemaModule } from '../schema/schema.module';
import { PLATFORM_COMPONENT_SCHEMAS } from './component-docs/schemas';
import { StackblitzService } from '../documentation/core-helpers/stackblitz/stackblitz.service';
import { ImageModule } from '@fundamental-ngx/core';
import { PlatformButtonModule, 
         PlatformActionBarModule,
         PlatformLinkModule, 
         PlatformMenuModule, 
         PlatformSearchFieldModule, 
         PlatformSelectModule,
         PlatformInfoLabelModule,
         PlatformMenuButtonModule,
         PlatformSplitMenuButtonModule,
         PlatformRadioGroupModule,
         PlatformActionButtonGroupModule,
       } from '@fundamental-ngx/platform';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [PlatformDocumentationComponent, PlatformHomeComponent, NewComponentComponent],
    imports: [
        ImageModule,
        PlatformButtonModule,
        PlatformActionBarModule,
        PlatformActionButtonGroupModule,
        PlatformLinkModule,
        PlatformInfoLabelModule,
        PlatformMenuModule,
        PlatformMenuButtonModule,
        PlatformSearchFieldModule,
        PlatformSelectModule,
        PlatformSplitMenuButtonModule,
        PlatformRadioGroupModule,
        SharedDocumentationModule,
        SchemaModule.forRoot(PLATFORM_COMPONENT_SCHEMAS),
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES),
        ScrollingModule
    ],
    providers: [{ provide: 'CURRENT_LIB', useValue: 'platform' }, StackblitzService]
})
export class PlatformDocumentationModule {}
