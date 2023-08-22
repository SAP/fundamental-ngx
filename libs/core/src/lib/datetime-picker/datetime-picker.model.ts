import { EventEmitter } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export interface DateTimePicker<D> extends MobileMode {
    date: Nullable<D>;
    isOpenChange: EventEmitter<boolean>;
    dialogApprove(): void;
    dialogDismiss(value: Nullable<D>): void;
}
