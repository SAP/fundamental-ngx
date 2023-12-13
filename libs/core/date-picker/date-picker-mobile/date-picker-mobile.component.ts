import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    Inject,
    Optional,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import {
    MOBILE_MODE_CONFIG,
    MobileModeBase,
    MobileModeConfigToken,
    MobileModeControl
} from '@fundamental-ngx/core/mobile-mode';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleModule } from '@fundamental-ngx/core/title';
import { DatePicker } from '../date-picker.model';
import { FD_DATE_PICKER_COMPONENT, FD_DATE_PICKER_MOBILE_CONFIG } from '../tokens';

@Component({
    selector: 'fd-date-picker-mobile',
    templateUrl: './date-picker-mobile.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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
export class DatePickerMobileComponent<D> extends MobileModeBase<DatePicker<D>> {
    /** @ignore */
    @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

    /** @ignore */
    private _selectedBackup: D | DateRange<D>;

    /** @ignore */
    constructor(
        elementRef: ElementRef,
        dialogService: DialogService,
        private readonly _destroyRef: DestroyRef,
        @Inject(FD_DATE_PICKER_MOBILE_CONFIG)
        public datePickerConfig: { calendarTemplate: TemplateRef<any>; controlTemplate: TemplateRef<any> },
        @Inject(FD_DATE_PICKER_COMPONENT) datePickerComponent: DatePicker<D>,
        @Optional() @Inject(MOBILE_MODE_CONFIG) mobileModes: MobileModeConfigToken[]
    ) {
        super(elementRef, dialogService, datePickerComponent, MobileModeControl.DATE_PICKER, mobileModes);

        this._component.isOpenChange.subscribe((isOpen) => {
            this._toggleDialog(isOpen);
        });
    }

    /** @ignore */
    handleApprove(): void {
        this.dialogRef.close();
        this._component.dialogApprove();
    }

    /** @ignore */
    handleDismiss(): void {
        this.dialogRef.dismiss();
        this._component.dialogDismiss(this._selectedBackup);
    }

    /** @ignore */
    private _toggleDialog(open: boolean): void {
        if (open) {
            this._selectedBackup = this._component.selectedDate!;
            if (!this._dialogService.hasOpenDialogs()) {
                this._open();
            }
        }
    }

    /** @ignore */
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
