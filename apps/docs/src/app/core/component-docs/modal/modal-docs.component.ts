import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as templateTs from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.ts';
import * as templateScss from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.scss';
import * as templateHtml from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.html';
import * as componentAsContentSrc from '!raw-loader!./examples/component-as-content/modal-component-as-content-example.component.ts';
import * as componentAsContentModule from '!raw-loader!./examples/component-as-content/modal-component-as-content-example.module.ts';
import * as contentSrc from '!raw-loader!./examples/component-as-content/modal-content.component.ts';
import * as modalInModalFirstTs from '!raw-loader!./examples/stackable-modals/modal-in-modal-first-example.component.ts';
import * as modalInModalComponent from '!raw-loader!./examples/stackable-modals/modal-in-modal-stacked-example.component.ts';
import * as modalInModalModule from '!raw-loader!./examples/stackable-modals/modal-in-modal-example.module.ts';
import * as modalInModalSecondComponent from '!raw-loader!./examples/stackable-modals/modal-in-modal-second-example.component.ts';
import * as fsModalSource from '!raw-loader!./examples/fullscreen-modal/modal-fullscreen-example.component.html';
import * as fsModalSourceT from '!raw-loader!./examples/fullscreen-modal/modal-fullscreen-example.component.ts';
import * as backdropT from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.ts';
import * as backdropH from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.html';
import * as backdropS from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.scss';
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
            fileName: 'modal-open-template-example',
            scssFileCode: templateScss
        },
        {
            language: 'typescript',
            code: templateTs,
            fileName: 'modal-open-template-example',
            component: 'ModalOpenTemplateExampleComponent'
        }
    ];

    componentAsContentSource: ExampleFile[] = [

        {
            language: 'typescript',
            code: contentSrc,
            name: 'Modal Content',
            secondFile: 'modal-content',
            fileName: 'modal-content',
            component: 'ModalContentComponent',
            imports: `import { ModalContentComponent } from './modal-content.component';`,
            entryComponent: 'ModalContentComponent, ModalComponentAsContentExampleComponent',
            declarationArray: 'ModalContentComponent'
        },
        {
            language: 'typescript',
            code: componentAsContentSrc,
            fileName: 'modal-component-as-content-example',
            component: 'ModalComponentAsContentExampleComponent',
        },
    ];

    modalInModalExample: ExampleFile[] = [

        {
            language: 'typescript',
            code: modalInModalSecondComponent,
            name: 'Second Modal',
            thirdFile: 'modal-in-modal-second-example',
            fileName: 'modal-in-modal-second-example',
            component: 'ModalInModalSecondComponent',
            imports: `import { ModalInModalFirstComponent } from './modal-in-modal-first-example.component';
            import { ModalInModalSecondComponent } from './modal-in-modal-second-example.component';`,
            declarationArray: 'ModalInModalComponent, ModalInModalFirstComponent,ModalInModalSecondComponent',
            entryComponent: 'ModalInModalComponent, ModalInModalFirstComponent, ModalInModalSecondComponent'
        },
        {
            language: 'typescript',
            code: modalInModalFirstTs,
            name: 'First Modal',
            secondFile: 'modal-in-modal-first-example',
            fileName: 'modal-in-modal-first-example',
            component: 'ModalInModalFirstComponent'
        },
        {
            language: 'typescript',
            code: modalInModalComponent,
            fileName: 'modal-in-modal-stacked-example',
            component: 'ModalInModalComponent'
        },
    ];

    fullScreenSource: ExampleFile[] = [
        {
            language: 'html',
            code: fsModalSource,
            fileName: 'modal-fullscreen-example',
        },
        {
            language: 'typescript',
            code: fsModalSourceT,
            fileName: 'modal-fullscreen-example',
            component: 'ModalFullscreenExampleComponent'
        }
    ];

    backdrop: ExampleFile[] = [
        {
            language: 'html',
            code: backdropH,
            fileName: 'backdrop-examples',
            scssFileCode: backdropS
        },
        {
            language: 'typescript',
            code: backdropT,
            fileName: 'backdrop-examples',
            component: 'BackdropExamplesComponent'
        }
    ];

    position: ExampleFile[] = [
        {
            language: 'html',
            code: positionH,
            fileName: 'modal-position-example'
        },
        {
            language: 'typescript',
            code: positionT,
            fileName: 'modal-position-example',
            component: 'ModalPositionExampleComponent'
        }
    ];

    container: ExampleFile[] = [
        {
            language: 'html',
            code: containerH,
            fileName: 'container'
        },
        {
            language: 'typescript',
            code: containerT,
            fileName: 'container',
            component: 'ContainerComponent'
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
