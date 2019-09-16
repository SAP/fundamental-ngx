import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as imageShapesSrc from '!raw-loader!./examples/image-shapes-example.component.html';
import * as imageSizesSrc from '!raw-loader!./examples/image-sizes-example.component.html';
import { ExampleFile } from '../../core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-image',
    templateUrl: './image-docs.component.html'
})
export class ImageDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    size: {
                        type: 'string',
                        enum: ['s', 'm', 'l']
                    },
                    photo: {
                        type: 'string'
                    },
                    isCircle: {
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
            size: 'l',
            photo: 'https://placeimg.com/400/400/nature',
            isCircle: false
        }
    };

    imageSizesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: imageSizesSrc
        }
    ];

    imageShapesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: imageShapesSrc
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('image');
    }

    ngOnInit() {}
    onSchemaValues(data) {
        this.data = data;
    }
}
