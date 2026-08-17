import { InjectionToken, TemplateRef } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

/** DI token for the calendar-container component instance (used by the mobile companion). */
export const FD_CALENDAR_CONTAINER_COMPONENT = new InjectionToken<unknown>('FdCalendarContainerComponent');

/** DI token for the calendar-container mobile config + calendar template. */
export const FD_CALENDAR_CONTAINER_MOBILE_CONFIG = new InjectionToken<{
    mobileConfig: MobileModeConfig;
    calendarTemplate: TemplateRef<any>;
}>('FdCalendarContainerMobileConfig');
