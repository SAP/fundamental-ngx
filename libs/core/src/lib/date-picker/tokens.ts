import { InjectionToken } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { DatePicker } from './date-picker.model';

export const FD_DATE_PICKER_COMPONENT = new InjectionToken<DatePicker<any>>('FdDatePickerComponent');
export const FD_DATE_PICKER_MOBILE_CONFIG = new InjectionToken<MobileModeConfig>('FdDatePickerMobileConfig');
