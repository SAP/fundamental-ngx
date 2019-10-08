import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as templateTs from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.ts';
import * as templateHtml from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.html';
import * as componentAsContentSrc from '!raw-loader!./examples/component-as-content/modal-component-as-content-example.component.ts';
import * as contentSrc from '!raw-loader!./examples/component-as-content/modal-content.component.ts';
import * as modalInModalExample from '!raw-loader!./examples/stackable-modals/modal-in-modal-example.component.ts';
import * as modalInModalComponent from '!raw-loader!./examples/stackable-modals/modal-in-modal.component.ts';
import * as modalInModalSecondComponent from '!raw-loader!./examples/stackable-modals/modal-in-modal-second.component.ts';
import * as fsModalSource from '!raw-loader!./examples/fullscreen-modal/modal-fullscreen-example.component.html';
import * as fsModalSourceT from '!raw-loader!./examples/fullscreen-modal/modal-fullscreen-example.component.ts';
import * as backdropT from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.ts';
import * as backdropH from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.html';
import * as positionH from '!raw-loader!./examples/modal-position/modal-position-example.component.html';
import * as positionT from '!raw-loader!./examples/modal-position/modal-position-example.component.ts';
import * as containerH from '!raw-loader!./examples/container/container.component.html';
import * as containerT from '!raw-loader!./examples/container/container.component.ts';
import { ModalService } from '@fundamental-ngx/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { Schema } from '../../../schema/models/schema.model';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './modal-docs.component.html'
})
export class ModalDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    hasBackdrop: {
                        type: 'boolean'
                    },
                    backdropClickCloseable: {
                        type: 'boolean'
                    },
                    escKeyCloseable: {
                        type: 'boolean'
                    },
                    focusTrapped: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    },
                    height: {
                        type: 'string'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            hasBackdrop: true,
            backdropClickCloseable: true,
            escKeyCloseable: true,
            focusTrapped: true,
            width: '40%',
            height: '40%'
        }
    };

    templateModal: ExampleFile[] = [
        {
            language: 'html',
            code: templateHtml,
            fileName: ''
        },
        {
            language: 'typescript',
            code: templateTs,
            fileName: ''
        }
    ];

    componentAsContentSource: ExampleFile[] = [
        {
            language: 'typescript',
            code: componentAsContentSrc,
            fileName: ''
        },
        {
            language: 'typescript',
            code: contentSrc,
            name: 'Modal Content',
            fileName: ''
        }
    ];

    modalInModalExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: modalInModalExample,
            fileName: ''
        },
        {
            language: 'typescript',
            code: modalInModalComponent,
            name: 'First Modal',
            fileName: ''
        },
        {
            language: 'typescript',
            code: modalInModalSecondComponent,
            name: 'Second Modal',
            fileName: ''
        }
    ];

    fullScreenSource: ExampleFile[] = [
        {
            language: 'html',
            code: fsModalSource,
            fileName: ''
        },
        {
            language: 'typescript',
            code: fsModalSourceT,
            fileName: ''
        }
    ];

    backdrop: ExampleFile[] = [
        {
            language: 'html',
            code: backdropH,
            fileName: ''
        },
        {
            language: 'typescript',
            code: backdropT,
            fileName: ''
        }
    ];

    position: ExampleFile[] = [
        {
            language: 'html',
            code: positionH,
            fileName: ''
        },
        {
            language: 'typescript',
            code: positionT,
            fileName: ''
        }
    ];

    container: ExampleFile[] = [
        {
            language: 'html',
            code: containerH,
            fileName: ''
        },
        {
            language: 'typescript',
            code: containerT,
            fileName: ''
        }
    ];

    constructor(
        private schemaFactory: SchemaFactoryService,
        private modalService: ModalService,
        private route: ActivatedRoute
    ) {
        this.schema = this.schemaFactory.getComponent('modal');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }

    openModal(template): void {
        this.modalService.open(template, this.data.properties);
    }
}
