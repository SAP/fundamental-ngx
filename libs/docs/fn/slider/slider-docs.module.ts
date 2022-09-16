import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';

import { COMPONENTS } from './examples';
import { SliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';
import { SliderModule } from '@fundamental-ngx/fn/slider';
import { ButtonModule } from '@fundamental-ngx/fn/button';

const routes: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        children: [
            { path: '', component: SliderDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('fnSlider') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SharedDocumentationPageModule,
        ButtonModule,
        SliderModule,
        FormsModule
    ],
    exports: [RouterModule],
    declarations: [SliderHeaderComponent, SliderDocsComponent, ...COMPONENTS],
    providers: [currentComponentProvider('slider')]
})
export class SliderDocsModule {}
