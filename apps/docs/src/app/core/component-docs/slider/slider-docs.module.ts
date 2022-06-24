import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { COMPONENTS } from './examples';
import { SliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';
import { DeprecatedSliderCozyDirective, SliderModule } from '@fundamental-ngx/core/slider';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

const routes: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        children: [
            { path: '', component: SliderDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } }
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
    providers: [moduleDeprecationsProvider(DeprecatedSliderCozyDirective)]
})
export class SliderDocsModule {}
