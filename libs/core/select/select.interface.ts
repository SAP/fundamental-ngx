import { ElementRef, EventEmitter, InjectionToken, QueryList, Signal } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MobileMode, MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { Subject } from 'rxjs';
import { OptionComponent } from './option/option.component';

export const SELECT_COMPONENT = new InjectionToken<SelectInterface>('SelectInterface');

/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface SelectInterface<TOption = any> extends MobileMode {
    typeaheadDebounceInterval: number;
    rtl$: Signal<boolean>;
    selected: OptionComponent;
    mobileConfig: MobileModeConfig;
    _options: QueryList<TOption>;
    _destroy: Subject<void>;
    _optionPanel: ElementRef;
    _isOpen: boolean;
    _calculatedMaxHeight: number;
    _liveAnnouncer: LiveAnnouncer;

    isOpenChange: EventEmitter<boolean>;
    valueChange: EventEmitter<any>;

    close(forceClose?: boolean, tabOut?: boolean): void;
    open(): void;
    focus(): void;
    blur(): void;
    _getItemHeight(): number;
    _getOptionScrollPosition(optionIndex: number, optionHeight: number, currentScrollPosition: number): void;
}
