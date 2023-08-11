import { InjectionToken } from '@angular/core';
import { DateTimePicker } from './datetime-picker.model';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

export const FD_DATETIME_PICKER_COMPONENT = new InjectionToken<DateTimePicker<any>>('FdDateTimePickerComponent');
export const FD_DATETIME_PICKER_MOBILE_CONFIG = new InjectionToken<MobileModeConfig>('FdDateTimePickerMobileConfig');
