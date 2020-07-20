import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { ROUTES } from './core-documentation.routes';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { StackblitzService } from '../documentation/core-helpers/stackblitz/stackblitz.service';
import { CoreDocumentationComponent } from './documentation/core-documentation.component';
import { HomeDocsComponent } from './component-docs/core-home/core-home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';
import {
    MOBILE_MODE_CONFIG,
    MobileModeControlName,
    MobileModeToken
} from '@fundamental-ngx/core';

const COMBOBOX_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.COMBOBOX,
    config: {title: 'COMBO TITLE'}
};
const SELECT_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.SELECT,
    config: {title: 'SELECT TITLE'}
};
const MULTI_INPUT_MOBILE_CONFIG: MobileModeToken = {
    controlName: MobileModeControlName.MULTI_INPUT,
    config: {title: 'MULTI TITLE'}
};

@NgModule({
    declarations: [HomeDocsComponent, NewComponentComponent, CoreDocumentationComponent],
    imports: [SharedDocumentationModule, MarkdownModule.forChild(), RouterModule.forChild(ROUTES)],
    providers: [{provide: 'CURRENT_LIB', useValue: 'core'}, StackblitzService,
        {provide: MOBILE_MODE_CONFIG, useValue: COMBOBOX_MOBILE_CONFIG, multi: true},
        {provide: MOBILE_MODE_CONFIG, useValue: SELECT_MOBILE_CONFIG, multi: true},
        {provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true}
    ]
})
export class CoreDocumentationModule {
}
