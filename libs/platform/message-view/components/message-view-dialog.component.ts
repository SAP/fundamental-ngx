import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogRef
} from '@fundamental-ngx/core/dialog';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdLanguageKeyIdentifier, FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MessagesListComponent, getIconForMessageType } from '@fundamental-ngx/platform/messages-shared';
import { MessageViewComponent } from '../message-view.component';

@Component({
    selector: 'fdp-message-view-dialog',
    templateUrl: './message-view-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        BarModule,
        SegmentedButtonComponent,
        FormsModule,
        ButtonComponent,
        ObjectStatusComponent,
        InitialFocusDirective,
        TemplateDirective,
        MessagesListComponent,
        FdTranslatePipe,
        TitleComponent
    ]
})
export class MessageViewDialogComponent {
    readonly dialogRef = inject(DialogRef);
    readonly messageView = inject(MessageViewComponent);

    /** @hidden Map message type to icon name */
    protected getIconForType(type: string): string {
        return getIconForMessageType(type);
    }

    /** @hidden Map message type to title translation key */
    protected getTitleKeyForType(type: string): FdLanguageKeyIdentifier {
        switch (type) {
            case 'error':
                return 'platformMessageView.errorButton';
            case 'success':
                return 'platformMessageView.successButton';
            case 'warning':
                return 'platformMessageView.warningButton';
            case 'information':
            default:
                return 'platformMessageView.informationButton';
        }
    }
}
