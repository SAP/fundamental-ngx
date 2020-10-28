import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SliderModule } from '@fundamental-ngx/core';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { SliderDocsComponent } from './slider-docs.component';
import {
    SliderBasicExampleComponent,
    SliderPlaygroundExampleComponent,
    SliderRangeExampleComponent, SliderTicksAndLabelsExampleComponent, SliderTicksExampleComponent
} from './examples/slider-examples.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { FormsModule } from '@angular/forms';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, SharedDocumentationPageModule, SliderModule, FormsModule],
    exports: [RouterModule],
    declarations: [
        SliderHeaderComponent,
        SliderDocsComponent,
        SliderBasicExampleComponent,
        SliderRangeExampleComponent,
        SliderTicksExampleComponent,
        SliderTicksAndLabelsExampleComponent,
        SliderPlaygroundExampleComponent
    ]
})
export class SliderDocsModule {
}
