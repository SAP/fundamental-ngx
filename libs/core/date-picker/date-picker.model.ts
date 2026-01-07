import { EventEmitter, InputSignal, InputSignalWithTransform } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

export interface DatePicker<D> extends MobileMode {
    selectedDate: Nullable<D>;
    specialDaysRules?: SpecialDayRule<D>[];
    showCalendarLegend?: boolean | InputSignal<boolean> | InputSignalWithTransform<boolean, unknown>;
    legendCol?: boolean | InputSignal<boolean> | InputSignalWithTransform<boolean, unknown>;
    isOpenChange: EventEmitter<boolean>;
    dialogApprove(): void;
    dialogDismiss(value: D | Array<D> | DateRange<D> | Array<DateRange<D>>): void;
    getSelectedDate(): D | Array<D> | DateRange<D> | Array<DateRange<D>>;
}
