import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleModule } from '@fundamental-ngx/core/title';
import { DateTimePicker } from '../datetime-picker.model';
import { FD_DATETIME_PICKER_COMPONENT, FD_DATETIME_PICKER_MOBILE_CONFIG } from '../tokens';

@Component({
    selector: 'fd-datetime-picker-mobile',
    templateUrl: './datetime-picker-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DialogModule,
        TitleModule,
        CdkScrollable,
        ScrollbarDirective,
        NgTemplateOutlet,
        BarModule,
        InitialFocusDirective
    ]
})
export class DatetimePickerMobileComponent<D> extends MobileModeBase<DateTimePicker<D>> {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    private _selectedBackup: Nullable<D>;

    /** @hidden */
    constructor(
        @Inject(FD_DATETIME_PICKER_MOBILE_CONFIG)
        public dateTimePickerConfig: { pickerTemplate: TemplateRef<any> },
        @Inject(FD_DATETIME_PICKER_COMPONENT) datePickerComponent: DateTimePicker<D>
    ) {
        super(datePickerComponent, MobileModeControl.DATETIME_PICKER);

        this._component.isOpenChange.subscribe((isOpen) => {
            this._toggleDialog(isOpen);
        });
    }

    /** @hidden */
    handleApprove(): void {
        this.dialogRef.close();
        this._component.dialogApprove();
    }

    /** @hidden */
    handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component.dialogDismiss(this._selectedBackup);
    }

    /** @hidden */
    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = this._component.date!;
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
    }

    /** @hidden */
    private _open(): void {
        this.dialogRef = this._dialogService.open(this.dialogTemplate, {
            mobile: true,
            backdropClickCloseable: false,
            disablePaddings: true,
            ...this.dialogConfig,
            container: this._elementRef.nativeElement
        });

        this._selectedBackup = this._component.date;

        const refSub = this.dialogRef.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            error: (type) => {
                if (type === 'escape') {
                    this._component.dialogDismiss(this._selectedBackup);
                    refSub.unsubscribe();
                }
            }
        });
    }
}
