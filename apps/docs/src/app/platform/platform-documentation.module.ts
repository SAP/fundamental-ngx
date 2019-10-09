import { NgModule } from '@angular/core';
import { SharedDocumentationModule } from '../documentation/shared-documentation.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './platform-documentation.routes';
import { PlatformDocumentationComponent } from './documentation/platform-documentation.component';
import { PlatformHomeComponent } from './component-docs/platform-home/platform-home.component';
import { MarkdownModule } from 'ngx-markdown';
import { ButtonDocsComponent } from '../platform/component-docs/button/button-docs.component';
import { ButtonHeaderComponent } from '../platform/component-docs/button/button-header/button-header.component';
import {
    ButtonIconsExampleComponent,
    ButtonOptionsExampleComponent,
    ButtonSizesExampleComponent,
    ButtonStateExampleComponent,
    ButtonTypesExampleComponent
} from '../platform/component-docs/button/examples/button-examples.component';

@NgModule({
    declarations: [
        PlatformDocumentationComponent,
        PlatformHomeComponent,
        ButtonDocsComponent,
        ButtonIconsExampleComponent,
        ButtonOptionsExampleComponent,
        ButtonSizesExampleComponent,
        ButtonTypesExampleComponent,
        ButtonStateExampleComponent,
        ButtonHeaderComponent

    ],
    imports: [
        SharedDocumentationModule,
        MarkdownModule.forChild(),
        RouterModule.forChild(ROUTES)
    ]
})
export class PlatformDocumentationModule { }
