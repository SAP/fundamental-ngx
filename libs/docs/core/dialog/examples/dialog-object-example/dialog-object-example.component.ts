import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogDefaultContent, DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-dialog-object-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dialog-object-example.component.html',
    imports: [ButtonComponent, BarModule, InputGroupModule, InitialFocusDirective]
})
export class DialogObjectExampleComponent {
    @ViewChild('dialogContent', { read: TemplateRef })
    dialogContent: TemplateRef<any>;

    @ViewChild('dialogSubHeader', { read: TemplateRef })
    dialogSubHeader: TemplateRef<any>;

    closeReason = '';

    private _dialogReference: DialogRef;

    constructor(
        private _dialogService: DialogService,
        private _cdr: ChangeDetectorRef
    ) {}

    openDialog(): void {
        const object: DialogDefaultContent = {
            title: 'Dialog Title',
            content: this.dialogContent,
            subHeader: this.dialogSubHeader,
            approveButton: 'Ok',
            approveButtonAriaLabel: 'Ok Emphasized',
            approveButtonCallback: () => this._dialogReference.close('Approved'),
            cancelButton: 'Cancel',
            cancelButtonCallback: () => this._dialogReference.close('Canceled'),
            closeButtonCallback: () => this._dialogReference.dismiss('Dismissed'),
            closeButtonTitle: 'close',
            closeButtonAriaLabel: 'dismiss'
        };

        this._dialogReference = this._dialogService.open(object, {
            focusTrapped: true
        });

        this._dialogReference.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Dialog closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.closeReason = 'Dialog dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
