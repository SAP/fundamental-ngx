import { Component, OnInit } from '@angular/core';
import { Icons } from '../../../documentation/utilities/icons';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as listSrc from '!raw-loader!./platform-list-examples/platform-list-example.component.html';
import * as borderLessListSrc from '!raw-loader!./platform-list-examples/platform-borderless-list-example.component.html';
import * as listWithButton from '!raw-loader!./platform-list-examples/platform-list-with-button-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-list',
    templateUrl: './platform-list-docs.component.html'
})
export class PlatformListDocsComponent implements OnInit {

    // static schema: any = {
    //     properties: {
    //         properties: {
    //             type: 'object',
    //             properties: {
    //                 items: {
    //                     type: ''
    //                 },
    //                 action: {
    //                     type: 'object',
    //                     properties: {
    //                         icon: {
    //                             type: 'string',
    //                             enum: Icons
    //                         },
    //                         label: {
    //                             type: 'string'
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     },
    //     type: 'object'
    // };

    // schema: Schema;

    // data: any = {
    //     properties: {
    //         items: ['List Item 1', 'List Item 2', 'List Item 3', 'List Item 4'],
    //         action: {
    //             icon: 'edit',
    //             label: 'Delete'
    //         }
    //     }
    // };

    simpleList: ExampleFile[] = [
        {
            language: 'html',
            code: listSrc,
            fileName: 'platform-list-example',
        }
    ];

    borderLesssList: ExampleFile[] = [
        {
            language: 'html',
            code: borderLessListSrc,
            fileName: 'platform-borderless-list-example',
        }
    ];

    listWithButton: ExampleFile[] = [
        {
            language: 'html',
            code: listWithButton,
            fileName: 'platform-list-with-button-example',
        }
    ];
    ngOnInit() { }
    constructor() { }

    // constructor(private schemaFactory: SchemaFactoryService) {
    //     this.schema = this.schemaFactory.getComponent('list');
    // }

    // onSchemaValues(data) {
    //     this.data = data;
    // }

}
