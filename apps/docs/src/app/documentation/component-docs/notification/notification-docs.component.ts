import { Component } from '@angular/core';

import * as componentAsContentTs from '!raw-loader!./examples/component-as-content/notification-component-as-content-example.component.ts';
import * as contentTs from '!raw-loader!./examples/component-as-content/notification-content.component.ts';
import * as groupTs from '!raw-loader!./examples/group-notification/notification-group-template-example.component.ts';
import * as groupH from '!raw-loader!./examples/group-notification/notification-group-template-example.component.html';
import * as optionsTs from '!raw-loader!./examples/notification-options/notification-options-example.component.ts';
import * as optionsH from '!raw-loader!./examples/notification-options/notification-options-example.component.html';
import * as templateTs from '!raw-loader!./examples/template-as-content/notification-open-template-example.component.ts';
import * as templateH from '!raw-loader!./examples/template-as-content/notification-open-template-example.component.html';
import * as objectTs from '!raw-loader!./examples/notification-as-object.component.ts';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { NotificationService } from '@fundamental-ngx/core';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-notification',
    templateUrl: './notification-docs.component.html'
})
export class NotificationDocsComponent {

    componentAsContent: ExampleFile[] = [
        {
            language: 'typescript',
            code: componentAsContentTs,
            name: 'Usage of Component'
        },
        {
            language: 'typescript',
            code: contentTs,
            name: 'Content'
        }
    ];

    groups: ExampleFile[] = [
        {
            language: 'typescript',
            code: groupTs
        },
        {
            language: 'html',
            code: groupH
        }
    ];

    options: ExampleFile[] = [
        {
            language: 'typescript',
            code: optionsTs
        },
        {
            language: 'html',
            code: optionsH
        },
        {
            language: 'typescript',
            code: contentTs,
            name: 'Content'
        }
    ];

    template: ExampleFile[] = [
        {
            language: 'typescript',
            code: templateTs
        },
        {
            language: 'html',
            code: templateH
        },
    ];

    object: ExampleFile[] = [
        {
            language: 'typescript',
            code: objectTs
        }
    ]


    // static schema: any = {
    //     properties: {
    //         properties: {
    //             type: 'object',
    //             properties: {
    //                 hasBackdrop: {
    //                     type: 'boolean'
    //                 },
    //                 backdropClickCloseable: {
    //                     type: 'boolean'
    //                 },
    //                 escKeyCloseable: {
    //                     type: 'boolean'
    //                 },
    //                 focusTrapped: {
    //                     type: 'boolean'
    //                 },
    //                 width: {
    //                     type: 'string'
    //                 },
    //                 height: {
    //                     type: 'string'
    //                 }
    //             }
    //         }
    //     },
    //     type: 'object'
    // };
    //
    // schema: Schema;
    //
    // data: any = {
    //     properties: {
    //         hasBackdrop: true,
    //         backdropClickCloseable: true,
    //         escKeyCloseable: true,
    //         focusTrapped: true,
    //         width: '40%',
    //         height: '40%',
    //     }
    // };
    //
    // templateModal: ExampleFile[] = [
    //     {
    //         language: 'html',
    //         code: templateHtml
    //     },
    //     {
    //         language: 'typescript',
    //         code: templateTs
    //     }
    // ];
    //
    // componentAsContentSource: ExampleFile[] = [
    //     {
    //         language: 'typescript',
    //         code: componentAsContentSrc,
    //     },
    //     {
    //         language: 'typescript',
    //         code: contentSrc,
    //         name: 'Modal Content'
    //     }
    // ];
    //
    // modalInModalExample: ExampleFile[] = [
    //     {
    //         language: 'typescript',
    //         code: modalInModalExample,
    //     },
    //     {
    //         language: 'typescript',
    //         code: modalInModalComponent,
    //         name: 'First Modal'
    //     },
    //     {
    //         language: 'typescript',
    //         code: modalInModalSecondComponent,
    //         name: 'Second Modal'
    //     }
    // ];
    //
    // fullScreenSource: ExampleFile[] = [
    //     {
    //         language: 'html',
    //         code: fsModalSource,
    //     },
    //     {
    //         language: 'typescript',
    //         code: fsModalSourceT
    //     }
    // ];
    //
    // backdrop: ExampleFile[] = [
    //     {
    //         language: 'html',
    //         code: backdropH,
    //     },
    //     {
    //         language: 'typescript',
    //         code: backdropT
    //     }
    // ];
    //
    // position: ExampleFile[] = [
    //     {
    //         language: 'html',
    //         code: positionH,
    //     },
    //     {
    //         language: 'typescript',
    //         code: positionT
    //     }
    // ];
    //
    // container: ExampleFile[] = [
    //     {
    //         language: 'html',
    //         code: containerH,
    //     },
    //     {
    //         language: 'typescript',
    //         code: containerT
    //     }
    // ];
    //
    // constructor(private schemaFactory: SchemaFactoryService, private modalService: ModalService) {
    //     this.schema = this.schemaFactory.getComponent('modal');
    // }
    //
    // onSchemaValues(data) {
    //     this.data = data;
    // }
    //
    // openModal(template): void {
    //     this.modalService.open(template, this.data.properties);
    // }

    schema: Schema;

    constructor(private schemaFactory: SchemaFactoryService, private notificationService: NotificationService) {
        this.schema = this.schemaFactory.getComponent('modal');
    }

}
