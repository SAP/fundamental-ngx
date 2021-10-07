import { EventEmitter, InjectionToken, QueryList, ElementRef } from '@angular/core';

import { ExperimentalOptionComponent } from './option/option.component';
import { FnSelectChange } from './select.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export const SELECT_COMPONENT = new InjectionToken<SelectInterface>('SelectInterface');

/**
 * Select Interface to have typing
 */
export interface SelectInterface {
    typeaheadDebounceInterval: number;
    selected: ExperimentalOptionComponent;
    _options: QueryList<any>;
    _destroy: any;
    _optionPanel: ElementRef;
    _isOpen: boolean;
    _calculatedMaxHeight: number;
    _liveAnnouncer: LiveAnnouncer;

    isOpenChange: EventEmitter<boolean>;
    valueChange: EventEmitter<FnSelectChange>;

    close(forceClose?: boolean): void;
    open(): void;
    focus(): void;
    blur(): void;
    _isRtl(): boolean;
    _getItemHeight(): number;
    _getOptionScrollPosition(optionIndex: number, optionHeight: number, currentScrollPosition: number): void;
}
