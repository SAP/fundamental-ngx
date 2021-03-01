import { EventEmitter, InjectionToken, QueryList, ElementRef } from '@angular/core';

import { OptionComponent } from './option/option.component';
import { FdSelectChange } from './select.component';
import { DialogConfig } from '../dialog/utils/dialog-config.class';
import { MobileMode } from '../utils/interfaces/mobile-control.interface';
import { MobileModeConfig } from '../utils/public_api';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export const SELECT_COMPONENT = new InjectionToken<SelectInterface>('SelectInterface');

/**
 * Select Interface to have typing and avoid circular dependency between
 * SelectComponent <==> SelectMobileComponent
 */
export interface SelectInterface extends MobileMode {

    typeaheadDebounceInterval: number;
    selected: OptionComponent;
    mobileConfig: MobileModeConfig;
    _options: QueryList<any>;
    _destroy: any;
    _optionPanel: ElementRef;
    _isOpen: boolean;
    _calculatedMaxHeight: number;
    _liveAnnouncer: LiveAnnouncer;

    isOpenChange: EventEmitter<boolean>;
    valueChange: EventEmitter<FdSelectChange>;

    close(forceClose?: boolean): void;
    open(): void;
    focus(): void;
    _isRtl(): boolean;
    _getItemHeight(): number;
    _getOptionScrollPosition( optionIndex: number,
        optionHeight: number,
        currentScrollPosition: number,
        panelHeight: number): void;
}
