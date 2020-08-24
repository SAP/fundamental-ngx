import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ButtonHeaderComponent } from './button-header/button-header.component';
import { ButtonDocsComponent } from './button-docs.component';
import {
    ButtonIconsExampleComponent,
    ButtonMenuExampleComponent,
    ButtonSizesExampleComponent,
    ButtonStateExampleComponent,
    ButtonTypesExampleComponent
} from './examples/button-examples.component';
import { ButtonModule, CarouselModule } from '@fundamental-ngx/core';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

const routes: Routes = [
    {
        path: '',
        component: ButtonHeaderComponent,
        children: [
            { path: '', component: ButtonDocsComponent },
            {
                path: 'api',
                component: ApiComponent,
                data: { content: API_FILES.button }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, ButtonModule, CarouselModule],
    exports: [RouterModule],
    declarations: [
        ButtonDocsComponent,
        ButtonHeaderComponent,
        ButtonTypesExampleComponent,
        ButtonSizesExampleComponent,
        ButtonIconsExampleComponent,
        ButtonStateExampleComponent,
        ButtonMenuExampleComponent
    ]
})
export class ButtonDocsModule { }
