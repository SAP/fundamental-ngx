import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ButtonHeaderComponent } from './button-header/button-header.component';
import { ButtonDocsComponent } from './button-docs.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { ButtonTypesExampleComponent } from './examples/button-types-example.component';
import { ButtonIconsExampleComponent } from './examples/button-icons-example.component';
import { ButtonMenuExampleComponent } from './examples/button-menu-example.component';
import { ButtonSizesExampleComponent } from './examples/button-sizes-example.component';
import { ButtonStateExampleComponent } from './examples/button-state-example.component';
import { ButtonToggledExampleComponent } from './examples/button-toggled-example.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ButtonModule,
        CarouselModule,
        ButtonDocsComponent,
        ButtonHeaderComponent,
        ButtonTypesExampleComponent,
        ButtonSizesExampleComponent,
        ButtonIconsExampleComponent,
        ButtonStateExampleComponent,
        ButtonMenuExampleComponent,
        ButtonToggledExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('button')]
})
export class ButtonDocsModule {}
