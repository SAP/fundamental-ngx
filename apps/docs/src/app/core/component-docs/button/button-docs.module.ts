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
    ButtonToggledExampleComponent,
    ButtonTypesExampleComponent
} from './examples/button-examples.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CarouselModule } from '@fundamental-ngx/core/carousel';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ButtonModule, CarouselModule],
    exports: [RouterModule],
    declarations: [
        ButtonDocsComponent,
        ButtonHeaderComponent,
        ButtonTypesExampleComponent,
        ButtonSizesExampleComponent,
        ButtonIconsExampleComponent,
        ButtonStateExampleComponent,
        ButtonMenuExampleComponent,
        ButtonToggledExampleComponent
    ]
})
export class ButtonDocsModule {}
