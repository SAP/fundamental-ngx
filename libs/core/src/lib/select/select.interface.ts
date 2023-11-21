import { DestroyRef, ElementRef, EventEmitter, InjectionToken, QueryList, Signal } from '@angular/core';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import { MobileMode, MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { Observable } from 'rxjs';
import { OptionsInterface } from './options.interface';

export const SELECT_COMPONENT = new InjectionToken<SelectInterface>('SelectInterface');

/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface SelectInterface<ValueType = any> extends MobileMode {
    typeaheadDebounceInterval: number;
    value: ValueType;
    mobileConfig: MobileModeConfig;
    _cvaDirective: CvaDirective<OptionsInterface<ValueType> | null>;
    _textDirection: Signal<'ltr' | 'rtl'>;
    _options: QueryList<OptionsInterface<ValueType>>;
    _destroyRef: DestroyRef;
    _optionPanel: ElementRef;
    _isOpen: boolean;
    _calculatedMaxHeight: number;
    _liveAnnouncer: LiveAnnouncer;

    isOpenChange: EventEmitter<boolean>;
    valueChange: Observable<ValueType>;

    close(forceClose?: boolean, tabOut?: boolean): void;
    open(): void;
    focus(): void;
    blur(): void;
    _getItemHeight(): number;
    _getOptionScrollPosition(optionIndex: number, optionHeight: number, currentScrollPosition: number): void;
}
