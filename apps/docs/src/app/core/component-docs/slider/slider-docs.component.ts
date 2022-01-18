import { Component } from '@angular/core';

import sliderBasicHtml from '!./examples/base/slider-basic-example.component.html?raw';
import sliderBasicTs from '!./examples/base/slider-basic-example.component?raw';
import sliderRangeHtml from '!./examples/range/slider-range-example.component.html?raw';
import sliderRangeTs from '!./examples/range/slider-range-example.component?raw';
import sliderTicksAndLabelsHtml from '!./examples/ticks-and-labels/slider-ticks-and-labels-example.component.html?raw';
import sliderTicksAndLabelsTs from '!./examples/ticks-and-labels/slider-ticks-and-labels-example.component?raw';
import sliderDisabledHtml from '!./examples/disabled/slider-disabled-example.component.html?raw';
import sliderDisabledTs from '!./examples/disabled/slider-disabled-example.component?raw';
import customValuesHtml from '!./examples/custom-values/slider-custom-values-example.component.html?raw';
import customValuesTs from '!./examples/custom-values/slider-custom-values-example.component?raw';
import sliderTooltipHtml from '!./examples/tooltip/slider-tooltip-example.component.html?raw';
import sliderTooltipTs from '!./examples/tooltip/slider-tooltip-example.component?raw';
import sliderCozyHtml from '!./examples/cozy/slider-cozy-example.component.html?raw';
import sliderCozyTs from '!./examples/cozy/slider-cozy-example.component?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { Schema } from '../../../schema/models/schema.model';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class SliderDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    mode: {
                        type: 'string',
                        enum: ['single', 'range']
                    },
                    min: {
                        type: 'integer'
                    },
                    max: {
                        type: 'integer'
                    },
                    step: {
                        type: 'integer'
                    },
                    jump: {
                        type: 'integer'
                    },
                    hideProgressBar: {
                        type: 'boolean'
                    },
                    showTicks: {
                        type: 'boolean'
                    },
                    showTicksLabels: {
                        type: 'boolean'
                    },
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

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
            code: sliderBasicTs,
            fileName: 'slider-basic-example',
            component: 'SliderBasicExampleComponent'
        },
        {
            language: 'html',
            code: sliderBasicHtml,
            fileName: 'slider-basic-example'
        }
    ];

    tooltip: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderTooltipTs,
            fileName: 'slider-tooltip-example',
            component: 'SliderTooltipExampleComponent'
        },
        {
            language: 'html',
            code: sliderTooltipHtml,
            fileName: 'slider-tooltip-example'
        }
    ];

    range: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderRangeTs,
            fileName: 'slider-range-example',
            component: 'SliderRangeExampleComponent'
        },
        {
            language: 'html',
            code: sliderRangeHtml,
            fileName: 'slider-range-example'
        }
    ];

    ticksAndLabels: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderTicksAndLabelsTs,
            fileName: 'slider-ticks-and-labels-example',
            component: 'SliderTicksAndLabelsExampleComponent'
        },
        {
            language: 'html',
            code: sliderTicksAndLabelsHtml,
            fileName: 'slider-ticks-and-labels-example'
        }
    ];

    disabled: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderDisabledTs,
            fileName: 'slider-disabled-example',
            component: 'SliderDisabledExampleComponent'
        },
        {
            language: 'html',
            code: sliderDisabledHtml,
            fileName: 'slider-disabled-example'
        }
    ];

    customValues: ExampleFile[] = [
        {
            language: 'typescript',
            code: customValuesTs,
            fileName: 'slider-custom-values-example',
            component: 'SliderCustomValuesExampleComponent'
        },
        {
            language: 'html',
            code: customValuesHtml,
            fileName: 'slider-custom-values-example'
        }
    ];

    cozy: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderCozyTs,
            fileName: 'slider-cozy-example',
            component: 'SliderCozyExampleComponent'
        },
        {
            language: 'html',
            code: sliderCozyHtml,
            fileName: 'slider-cozy-example'
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
