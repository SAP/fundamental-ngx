import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {ModalDocsHeaderComponent} from './modal-docs-header/modal-docs-header.component';
import {ModalDocsComponent} from './modal-docs.component';
import {ContainerComponent} from './examples/container/container.component';
import {ModalInModalComponent} from './examples/stackable-modals/modal-in-modal-stacked-example.component';
import {ModalContentComponent} from './examples/component-as-content/modal-content.component';
import {BackdropExamplesComponent} from './examples/backdrop-examples/backdrop-examples.component';
import {ModalInModalFirstComponent} from './examples/stackable-modals/modal-in-modal-first-example.component';
import {ModalInModalSecondComponent} from './examples/stackable-modals/modal-in-modal-second-example.component';
import {ModalPositionExampleComponent} from './examples/modal-position/modal-position-example.component';
import {ModalFullscreenExampleComponent} from './examples/fullscreen-modal/modal-fullscreen-example.component';
import {ModalOpenTemplateExampleComponent} from './examples/template-as-content/modal-open-template-example.component';
import {ModalComponentAsContentExampleComponent} from './examples/component-as-content/modal-component-as-content-example.component';
import { ModalModule, ModalService } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: ModalDocsHeaderComponent,
        children: [
            { path: '', component: ModalDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.modal } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        ModalModule
    ],
    exports: [RouterModule],
    declarations: [
        ModalDocsComponent,
        ContainerComponent,
        ModalInModalComponent,
        ModalContentComponent,
        ModalDocsHeaderComponent,
        BackdropExamplesComponent,
        ModalInModalFirstComponent,
        ModalInModalSecondComponent,
        ModalPositionExampleComponent,
        ModalFullscreenExampleComponent,
        ModalOpenTemplateExampleComponent,
        ModalComponentAsContentExampleComponent
    ],
    entryComponents: [
        ModalContentComponent,
        ModalInModalComponent,
        ModalInModalFirstComponent,
        ModalInModalSecondComponent
    ],
    providers: [
        ModalService
    ]
})
export class ModalDocsModule {
}
