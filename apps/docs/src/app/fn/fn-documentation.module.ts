import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MarkdownModule } from 'ngx-markdown';

import { ROUTES } from './fn-documentation.routes';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { StackblitzService } from '../documentation/core-helpers/stackblitz/stackblitz.service';
import { CoreDocumentationComponent } from './documentation/fn-documentation.component';
import { HomeDocsComponent } from './component-docs/fn-home/fn-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import {
    COMBOBOX_MOBILE_CONFIG,
    MENU_MOBILE_CONFIG,
    MULTI_INPUT_MOBILE_CONFIG,
    POPOVER_MOBILE_CONFIG,
    SELECT_MOBILE_CONFIG
} from '../documentation/utilities/consts';
import { DocsThemeService } from '../documentation/services/docs-theme.service';
import { CURRENT_LIB } from '../documentation/utilities/libraries';

@NgModule({
    declarations: [HomeDocsComponent, NewComponentComponent, CoreDocumentationComponent],
    imports: [SharedDocumentationModule, MarkdownModule.forChild(), RouterModule.forChild(ROUTES), ScrollingModule],
    providers: [
        StackblitzService,
        DocsThemeService,
        { provide: CURRENT_LIB, useValue: 'fn' },
        { provide: MOBILE_MODE_CONFIG, useValue: MENU_MOBILE_CONFIG, multi: true },
        { provide: MOBILE_MODE_CONFIG, useValue: SELECT_MOBILE_CONFIG, multi: true },
        { provide: MOBILE_MODE_CONFIG, useValue: COMBOBOX_MOBILE_CONFIG, multi: true },
        { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true },
        { provide: MOBILE_MODE_CONFIG, useValue: POPOVER_MOBILE_CONFIG, multi: true }
    ]
})
export class FnDocumentationModule {}
