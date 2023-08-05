import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformSliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';

import { CommonModule } from '@angular/common';
import { SliderBasicExampleComponent } from './examples/base/slider-basic-example.component';
import { SliderRangeExampleComponent } from './examples/range/slider-range-example.component';
import { SliderTicksAndLabelsExampleComponent } from './examples/ticks-and-labels/slider-ticks-and-labels-example.component';
import { SliderDisabledExampleComponent } from './examples/disabled/slider-disabled-example.component';
import { SliderCustomValuesExampleComponent } from './examples/custom-values/slider-custom-values-example.component';
import { SliderTooltipExampleComponent } from './examples/tooltip/slider-tooltip-example.component';
import { SliderCozyExampleComponent } from './examples/cozy/slider-cozy-example.component';
import { SliderFormFieldExampleComponent } from './examples/form-field/slider-form-field-example.component';

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
        FdpFormGroupModule,
        CommonModule
    ],
    exports: [RouterModule],
    declarations: [
        SliderHeaderComponent,
        PlatformSliderDocsComponent,
        SliderBasicExampleComponent,
        SliderRangeExampleComponent,
        SliderTicksAndLabelsExampleComponent,
        SliderDisabledExampleComponent,
        SliderCustomValuesExampleComponent,
        SliderTooltipExampleComponent,
        SliderCozyExampleComponent,
        SliderFormFieldExampleComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [currentComponentProvider('slider')]
})
export class PlatformSliderDocsModule {}
