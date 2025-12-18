import { InjectionToken, InputSignal } from '@angular/core';

export interface FdCardMainHeaderComponent {
    interactive: InputSignal<boolean>;
}

export const FD_CARD = new InjectionToken('FdCardComponent');
export const FD_CARD_MAIN_HEADER = new InjectionToken<FdCardMainHeaderComponent>('FdCardMainHeaderComponent');
export const FD_CARD_TITLE = new InjectionToken('FdCardTitleDirective');
export const FD_CARD_SUBTITLE = new InjectionToken('FdCardSubtitleDirective');
export const FD_CARD_SECOND_SUBTITLE = new InjectionToken('FdCardSecondSubtitleDirective');
export const FD_CARD_COUNTER = new InjectionToken('FdCardCounterDirective');
export const FD_CARD_HEADER_ACTION = new InjectionToken('FdCardHeaderActionDirective');
export const FD_CARD_KPI_HEADER = new InjectionToken('FdCardKpiHeaderComponent');
export const FD_CARD_MEDIA_HEADING = new InjectionToken('FdCardMediaHeadingComponent');
