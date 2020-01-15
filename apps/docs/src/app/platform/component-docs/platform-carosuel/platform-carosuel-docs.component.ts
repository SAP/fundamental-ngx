import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as carosuelTsCode from '!raw-loader!./platform-carosuel-examples/platform-carosuel-examples.component.ts';
import * as carosuelScss from '!raw-loader!./platform-carosuel-examples/platform-carosuel-examples.component.scss';
import * as carosuelWithLoadingIndicatorExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-with-loading-indicator-example.component.html';
import * as carosuelWithErrorExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-with-error-example.component.html';
import * as carosuelNumberIndicatorExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-number-indicator-example.component.html';
import * as carosuelVideoExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-video-example.component.html';
import * as carosuelCaptionExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-caption-example.component.html';
import * as carosuelIntervalExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-interval-example.component.html';
import * as carosuelNavigationExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-navigation-example.component.html';
import * as carosuelWithTopIndicatorExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-indicator-on-top-example.component.html';
import * as carosuelNoControlExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-no-control-example.component.html';
import * as carosuelWithControlExample from '!raw-loader!./platform-carosuel-examples/platform-carosuel-with-control-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '../../../documentation/utilities/icons';

@Component({
    selector: 'app-carosuel',
    templateUrl: './platform-carosuel-docs.component.html'
})
export class PlatformCarosuelDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    animation: {
                        type: 'string',
                        enum: ['slide', 'fade']
                    },
                    indicatorPosition: {
                        type: 'string',
                        enum: ['bottom', 'top']
                    },
                    inMiddle: {
                        type: 'boolean'
                    },
                    interval: {
                        type: 'string'
                    },
                    isControls: {
                        type: 'boolean'
                    },
                    activeSlideIndex: {
                        type: 'string'
                    },
                    noWrap: {
                        type: 'boolean'
                    },
                    noPause: {
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
            animation: 'slide',
            indicatorPosition: '-1.75rem',
            inMiddle: false,
            interval: '2000',
            isControls: true,
            noWrap: false,
            noPause: true,
            activeSlideIndex: '1'

        }
    };



    carosuelWithLoadingIndicatorExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelWithLoadingIndicatorExample,
            fileName: 'platform-carosuel-with-loading-indicator-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelWithLoadingIndicatorExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelWithErrorExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelWithErrorExample,
            fileName: 'platform-carosuel-with-error-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelWithErrorExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelNumberIndicatorExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelNumberIndicatorExample,
            fileName: 'platform-carosuel-number-indicator-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelNumberIndicatorExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelVideoExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelVideoExample,
            fileName: 'platform-carosuel-video-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelVideoExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelCaptionExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelCaptionExample,
            fileName: 'platform-carosuel-caption-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelCaptionExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelNoControlExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelNoControlExample,
            fileName: 'platform-carosuel-no-control-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelNoControlExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelWithControlExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelWithControlExample,
            fileName: 'platform-carosuel-with-control-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelWithControlExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelWithTopIndicatorExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelWithTopIndicatorExample,
            fileName: 'platform-carosuel-indicator-on-top-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelIndicatorOnTopExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelNavigationExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelNavigationExample,
            fileName: 'platform-carosuel-navigation-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelNavigationExampleComponent',
            scssFileCode: carosuelScss
        }
    ];

    carosuelIntervalExample: ExampleFile[] = [
        {
            language: 'html',
            code: carosuelIntervalExample,
            fileName: 'platform-carosuel-interval-example',
            secondFile: 'platform-carosuel-examples',
            typescriptFileCode: carosuelTsCode,
            component: 'PlatformCarosuelIntervalExampleComponent',
            scssFileCode: carosuelScss
        }
    ];



    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('carosuel');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }

}



