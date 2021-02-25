import { Component } from '@angular/core';

import * as sliderBasicHtml from '!raw-loader!./examples/base/slider-basic-example.component.html';
import * as sliderBasicTs from '!raw-loader!./examples/base/slider-basic-example.component';
import * as sliderRangeHtml from '!raw-loader!./examples/range/slider-range-example.component.html';
import * as sliderRangeTs from '!raw-loader!./examples/range/slider-range-example.component';
import * as sliderFormFieldHtml from '!raw-loader!./examples/form-field/slider-form-field-example.component.html';
import * as sliderFormFieldTs from '!raw-loader!./examples/form-field/slider-form-field-example.component';
import * as sliderTicksAndLabelsHtml from '!raw-loader!./examples/ticks-and-labels/slider-ticks-and-labels-example.component.html';
import * as sliderTicksAndLabelsTs from '!raw-loader!./examples/ticks-and-labels/slider-ticks-and-labels-example.component';
import * as sliderDisabledHtml from '!raw-loader!./examples/disabled/slider-disabled-example.component.html';
import * as sliderDisabledTs from '!raw-loader!./examples/disabled/slider-disabled-example.component';
import * as customValuesHtml from '!raw-loader!./examples/custom-values/slider-custom-values-example.component.html';
import * as customValuesTs from '!raw-loader!./examples/custom-values/slider-custom-values-example.component';
import * as sliderTooltipHtml from '!raw-loader!./examples/tooltip/slider-tooltip-example.component.html';
import * as sliderTooltipTs from '!raw-loader!./examples/tooltip/slider-tooltip-example.component';
import * as sliderCozyHtml from '!raw-loader!./examples/cozy/slider-cozy-example.component.html';
import * as sliderCozyTs from '!raw-loader!./examples/cozy/slider-cozy-example.component';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { Schema } from '../../../schema/models/schema.model';

@Component({
    selector: 'app-slider',
    templateUrl: './slider-docs.component.html'
})
export class PlatformSliderDocsComponent {
    static schema: Schema = {
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

    formField: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderFormFieldTs,
            fileName: 'slider-form-field-example',
            component: 'SliderFormFieldExampleComponent'
        },
        {
            language: 'html',
            code: sliderFormFieldHtml,
            fileName: 'slider-form-field-example'
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
