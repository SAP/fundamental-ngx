import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FdpFormGroupModule, PlatformSliderModule } from '@fundamental-ngx/platform';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { API_FILES } from '../../api-files';

import { COMPONENTS } from './examples';
import { PlatformSliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';

const routes: Routes = [
    {
        path: '',
        component: SliderHeaderComponent,
        children: [
            { path: '', component: PlatformSliderDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.slider } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformSliderModule,
        FormsModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [SliderHeaderComponent, PlatformSliderDocsComponent, ...COMPONENTS],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformSliderDocsModule {}
