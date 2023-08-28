import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { PlatformSliderModule } from '@fundamental-ngx/platform/slider';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { PlatformSliderDocsComponent } from './slider-docs.component';
import { SliderHeaderComponent } from './slider-header/slider-header.component';

import { CommonModule } from '@angular/common';
import { SliderBasicExampleComponent } from './examples/base/slider-basic-example.component';
import { SliderCozyExampleComponent } from './examples/cozy/slider-cozy-example.component';
import { SliderCustomValuesExampleComponent } from './examples/custom-values/slider-custom-values-example.component';
import { SliderDisabledExampleComponent } from './examples/disabled/slider-disabled-example.component';
import { SliderFormFieldExampleComponent } from './examples/form-field/slider-form-field-example.component';
import { SliderRangeExampleComponent } from './examples/range/slider-range-example.component';
import { SliderTicksAndLabelsExampleComponent } from './examples/ticks-and-labels/slider-ticks-and-labels-example.component';
import { SliderTooltipExampleComponent } from './examples/tooltip/slider-tooltip-example.component';

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
        CommonModule,
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
    exports: [RouterModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [currentComponentProvider('slider')]
})
export class PlatformSliderDocsModule {}
