import { Component } from '@angular/core';

const sliderBasicHtml = 'base/slider-basic-example.component.html';
const sliderBasicTs = 'base/slider-basic-example.component.ts';
const sliderRangeHtml = 'range/slider-range-example.component.html';
const sliderRangeTs = 'range/slider-range-example.component.ts';
const sliderFormFieldHtml = 'form-field/slider-form-field-example.component.html';
const sliderFormFieldTs = 'form-field/slider-form-field-example.component.ts';
const sliderTicksAndLabelsHtml = 'ticks-and-labels/slider-ticks-and-labels-example.component.html';
const sliderTicksAndLabelsTs = 'ticks-and-labels/slider-ticks-and-labels-example.component.ts';
const sliderDisabledHtml = 'disabled/slider-disabled-example.component.html';
const sliderDisabledTs = 'disabled/slider-disabled-example.component.ts';
const customValuesHtml = 'custom-values/slider-custom-values-example.component.html';
const customValuesTs = 'custom-values/slider-custom-values-example.component.ts';
const sliderTooltipHtml = 'tooltip/slider-tooltip-example.component.html';
const sliderTooltipTs = 'tooltip/slider-tooltip-example.component.ts';
const sliderCozyHtml = 'cozy/slider-cozy-example.component.html';
const sliderCozyTs = 'cozy/slider-cozy-example.component.ts';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class PlatformSliderDocsComponent {
    schema: Schema;

    data: any = {
        properties: {
            min: 0,
            max: 100,
            step: 10,
            jump: 20,
            hideProgressBar: false,
            showTicks: true,
            showTicksLabels: true,
            mode: 'single',
            disabled: false
        }
    };

    currentMode = 'single';
    value: number | [number, number] = 50;
    rangeValue: [number, number] = [0, 100];
    singleValue = 50;

    basic: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderBasicTs),
            fileName: 'slider-basic-example',
            component: 'SliderBasicExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderBasicHtml),
            fileName: 'slider-basic-example'
        }
    ];

    tooltip: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderTooltipTs),
            fileName: 'slider-tooltip-example',
            component: 'SliderTooltipExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderTooltipHtml),
            fileName: 'slider-tooltip-example'
        }
    ];

    range: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderRangeTs),
            fileName: 'slider-range-example',
            component: 'SliderRangeExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderRangeHtml),
            fileName: 'slider-range-example'
        }
    ];

    formField: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderFormFieldTs),
            fileName: 'slider-form-field-example',
            component: 'SliderFormFieldExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderFormFieldHtml),
            fileName: 'slider-form-field-example'
        }
    ];

    ticksAndLabels: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderTicksAndLabelsTs),
            fileName: 'slider-ticks-and-labels-example',
            component: 'SliderTicksAndLabelsExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderTicksAndLabelsHtml),
            fileName: 'slider-ticks-and-labels-example'
        }
    ];

    disabled: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderDisabledTs),
            fileName: 'slider-disabled-example',
            component: 'SliderDisabledExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderDisabledHtml),
            fileName: 'slider-disabled-example'
        }
    ];

    customValues: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customValuesTs),
            fileName: 'slider-custom-values-example',
            component: 'SliderCustomValuesExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(customValuesHtml),
            fileName: 'slider-custom-values-example'
        }
    ];

    cozy: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderCozyTs),
            fileName: 'slider-cozy-example',
            component: 'SliderCozyExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderCozyHtml),
            fileName: 'slider-cozy-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('fdp-slider');
    }

    onSchemaValues(data): void {
        this.data = data;

        if (this.currentMode === data.properties.mode) {
            return;
        }

        this.currentMode = data.properties.mode;

        if (this.currentMode === 'range') {
            this.singleValue = this.value as number;
            this.value = [...this.rangeValue];
        } else {
            this.rangeValue = [...(this.value as [number, number])];
            this.value = this.singleValue;
        }
    }
}
