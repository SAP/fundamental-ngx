import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { DateRange } from '@fundamental-ngx/core/calendar';
import {
    DialogBodyComponent,
    DialogCloseButtonComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent
} from '@fundamental-ngx/core/dialog';
import { MobileModeBase, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DatePicker } from '../date-picker.model';
import { FD_DATE_PICKER_COMPONENT, FD_DATE_PICKER_MOBILE_CONFIG } from '../tokens';

@Component({
    selector: 'fd-date-picker-mobile',
    templateUrl: './date-picker-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleComponent,
        NgTemplateOutlet,
        DialogFooterComponent,
        DialogComponent,
        DialogBodyComponent,
        DialogCloseButtonComponent,
        DialogHeaderComponent,
        ButtonBarComponent,
        InitialFocusDirective
    ]
})
export class DatePickerMobileComponent<D> extends MobileModeBase<DatePicker<D>> {
    /** @hidden */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @hidden */
    private _selectedBackup: D | Array<D> | DateRange<D> | Array<DateRange<D>>;

    /** @hidden */
    constructor(
        @Inject(FD_DATE_PICKER_MOBILE_CONFIG)
        public datePickerConfig: { calendarTemplate: TemplateRef<any>; controlTemplate: TemplateRef<any> },
        @Inject(FD_DATE_PICKER_COMPONENT) datePickerComponent: DatePicker<D>
    ) {
        super(datePickerComponent, MobileModeControl.DATE_PICKER);

        this._component.isOpenChange.subscribe((isOpen) => {
            this._toggleDialog(isOpen);
        });
    }

    /** @hidden */
    _getShowCalendarLegend(): boolean {
        const show = this._component.showCalendarLegend;
        if (typeof show === 'boolean') {
            return show;
        }

        return (show as any)?.() || false;
    }

    /** @hidden */
    _getLegendCol(): boolean {
        const col = this._component.legendCol;
        if (typeof col === 'boolean') {
            return col;
        }

        return (col as any)?.() || false;
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
            this._selectedBackup = this._component.getSelectedDate();
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

        this._selectedBackup = this._component.getSelectedDate();

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
