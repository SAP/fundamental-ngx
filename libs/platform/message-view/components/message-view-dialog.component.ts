import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogBodyComponent, DialogComponent, DialogFooterComponent, DialogRef } from '@fundamental-ngx/core/dialog';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MessagesListComponent } from '@fundamental-ngx/platform/messages-shared';
import { MessageViewComponent } from '../message-view.component';

@Component({
    selector: 'fdp-message-view-dialog',
    templateUrl: './message-view-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        DialogComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        BarModule,
        SegmentedButtonComponent,
        FormsModule,
        ButtonComponent,
        ObjectStatusComponent,
        InitialFocusDirective,
        MessagesListComponent,
        FdTranslatePipe
    ]
})
export class MessageViewDialogComponent {
    readonly dialogRef = inject(DialogRef);
    readonly messageView = inject(MessageViewComponent);
}
