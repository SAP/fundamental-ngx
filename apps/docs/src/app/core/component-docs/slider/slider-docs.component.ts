import { Component } from '@angular/core';

import * as sliderBasicHtml from '!raw-loader!./examples/base/slider-basic-example.component.html';
import * as sliderBasicTs from '!raw-loader!./examples/base/slider-basic-example.component';
import * as sliderRangeHtml from '!raw-loader!./examples/range/slider-range-example.component.html';
import * as sliderRangeTs from '!raw-loader!./examples/range/slider-range-example.component';
import * as sliderTicksHtml from '!raw-loader!./examples/ticks/slider-ticks-example.component.html';
import * as sliderTicksTs from '!raw-loader!./examples/ticks/slider-ticks-example.component';
import * as sliderTicksAndLabelsHtml from '!raw-loader!./examples/ticks-and-labels/slider-ticks-and-labels-example.component.html';
import * as sliderTicksAndLabelsTs from '!raw-loader!./examples/ticks-and-labels/slider-ticks-and-labels-example.component';
import * as sliderDisabledHtml from '!raw-loader!./examples/disabled/slider-disabled-example.component.html';
import * as sliderDisabledTs from '!raw-loader!./examples/disabled/slider-disabled-example.component';

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
                    range: {
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
            range: 'single',
            disabled: false
        }
    };

    value: number | [number, number] = 50;
    rangeValue: [number, number] = [0, 100];
    singleValue = 50;

    basic: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderBasicTs,
            fileName: 'slider-basic-example'
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
            fileName: 'slider-range-example'
        },
        {
            language: 'html',
            code: sliderRangeHtml,
            fileName: 'slider-range-example'
        }
    ];

    ticks: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderTicksTs,
            fileName: 'slider-ticks-example'
        },
        {
            language: 'html',
            code: sliderTicksHtml,
            fileName: 'slider-ticks-example'
        }
    ];

    ticksAndLabels: ExampleFile[] = [
        {
            language: 'typescript',
            code: sliderTicksAndLabelsTs,
            fileName: 'slider-ticks-and-labels-example'
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
            fileName: 'slider-disabled-example'
        },
        {
            language: 'html',
            code: sliderDisabledHtml,
            fileName: 'slider-disabled-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('slider');
    }

    onSchemaValues(data): void {
        if (data.properties.range === 'range') {
            this.singleValue = this.value as number;
            this.value = this.rangeValue;
        } else {
            this.rangeValue = this.value as [number, number];
            this.value = this.singleValue;
        }

        this.data = data;
    }
}
