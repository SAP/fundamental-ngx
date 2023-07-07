import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

const sliderBasicTs = 'base/slider-basic-example.component.ts';
const sliderRangeTs = 'range/slider-range-example.component.ts';
const sliderTicksAndLabelsTs = 'ticks-and-labels/slider-ticks-and-labels-example.component.ts';
const sliderDisabledTs = 'disabled/slider-disabled-example.component.ts';
const customValuesTs = 'custom-values/slider-custom-values-example.component.ts';
const sliderTooltipTs = 'tooltip/slider-tooltip-example.component.ts';
const sliderCozyTs = 'cozy/slider-cozy-example.component.ts';
const sliderFormTs = 'form/slider-form-example.component.ts';

const sliderBasicHtml = 'base/slider-basic-example.component.html';
const sliderRangeHtml = 'range/slider-range-example.component.html';
const sliderTicksAndLabelsHtml = 'ticks-and-labels/slider-ticks-and-labels-example.component.html';
const sliderDisabledHtml = 'disabled/slider-disabled-example.component.html';
const customValuesHtml = 'custom-values/slider-custom-values-example.component.html';
const sliderTooltipHtml = 'tooltip/slider-tooltip-example.component.html';
const sliderCozyHtml = 'cozy/slider-cozy-example.component.html';
const sliderFormHtml = 'form/slider-form-example.component.html';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class SliderDocsComponent {
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
            disabled: false,
            vertical: false
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

    form: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sliderFormTs),
            fileName: 'slider-form-example',
            component: 'SliderFormExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(sliderFormHtml),
            fileName: 'slider-form-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('slider');
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
