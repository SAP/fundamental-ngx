import { Component } from '@angular/core';

import * as sliderBasicHtml from '!raw-loader!./examples/base/slider-basic-example.component.html';
import * as sliderBasicTs from '!raw-loader!./examples/base/slider-basic-example.component';
import * as sliderRangeHtml from '!raw-loader!./examples/range/slider-range-example.component.html';
import * as sliderRangeTs from '!raw-loader!./examples/range/slider-range-example.component';

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
                        enum: [
                            'single',
                            'range'
                        ]
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
