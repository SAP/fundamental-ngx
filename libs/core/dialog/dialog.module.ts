import { NgModule } from '@angular/core';
import { TemplateModule } from '@fundamental-ngx/cdk/utils';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarMiddleDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogDefaultComponent } from './dialog-default/dialog-default.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogFullScreenTogglerButtonComponent } from './dialog-full-screen-toggler-button/dialog-full-screen-toggler-button.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogComponent } from './dialog.component';
import { DialogTemplateDirective } from './directives/dialog-template.directive';
import { DialogTitleDirective } from './directives/dialog-title.directive';
import { provideDialogService } from './provide-dialog-service';

const declarations = [
    DialogComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogDefaultComponent,
    DialogContainerComponent,
    DialogCloseButtonComponent,
    DialogTitleDirective,
    DialogFullScreenTogglerButtonComponent,
    DialogTemplateDirective
];

/**
 * @deprecated
 * Use following imports instead:
 * `DialogComponent`,
 * `DialogBodyComponent`,
 * `DialogFooterComponent`,
 * `DialogHeaderComponent`,
 * `DialogCloseButtonComponent`,
 * `DialogTitleDirective`,
 * `DialogFullScreenTogglerButtonComponent`
 *
 * in order to provide dialog service, use `provideDialogService()`
 */
@NgModule({
    imports: [
        declarations,
        // Keeping these two items for backwards compatibility.
        TemplateModule,
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        TitleComponent
    ],
    exports: [
        declarations,
        // Keeping these two items for backwards compatibility.
        TemplateModule,
        BarComponent,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        BarElementDirective,
        ButtonBarComponent,
        TitleComponent
    ],
    providers: [provideDialogService()]
})
export class DialogModule {}
