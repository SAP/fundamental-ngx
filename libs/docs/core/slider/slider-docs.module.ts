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
import { API_FILES } from '@fundamental-ngx/docs/core/shared';

import { COMPONENTS } from './examples';
import { SliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';
import { DeprecatedSliderCozyDirective, SliderModule } from '@fundamental-ngx/core/slider';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';

const routes: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        children: [
            { path: '', component: SliderDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('coreSlider') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SharedDocumentationPageModule,
        SliderModule,
        FormsModule
    ],
    exports: [RouterModule],
    declarations: [SliderHeaderComponent, SliderDocsComponent, ...COMPONENTS],
    providers: [moduleDeprecationsProvider(DeprecatedSliderCozyDirective), currentComponentProvider('slider')]
})
export class SliderDocsModule {}
