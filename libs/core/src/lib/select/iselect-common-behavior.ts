import { EventEmitter, ElementRef, QueryList } from '@angular/core';
import { ConnectedPosition, CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';

import { FdSelectChange } from './select.component';
import { OptionComponent } from './option/option.component';

/**
 * Common Interface to define shareable properties and method
 *
 * @hidden
 */
export interface MatSelectCommonBehavior {
    disabled: boolean;
    readonly: boolean;
    mobile: boolean;
    typeaheadDebounceInterval: number;
    maxHeight: string;
    readonly valueChange: EventEmitter<FdSelectChange>;
    readonly isOpenChange: EventEmitter<boolean>;
    readonly selected: OptionComponent;
    readonly empty: boolean;
    readonly panelOpen: boolean;
    readonly canClose: boolean;
    readonly canEmitValueChange: boolean;
    readonly focused: boolean;
    readonly calculatedMaxHeight: number;
    readonly positions: ConnectedPosition[];
    _compareWith: (o1: any, o2: any) => boolean;
    _controlElementRef: ElementRef;
    _triggerRect: ClientRect;
    _options: QueryList<OptionComponent>;
    _overlayDir: CdkConnectedOverlay;
    /**
     * Even we want to name this `_value` it breaks the bound we have set. _ prefix can be used
     * only for private properties and we are not going to make private property out of interface
     */
    _internalValue: any;
    _offsetY: number;
    _keyManager: ActiveDescendantKeyManager<OptionComponent>;
    _selectionModel: SelectionModel<OptionComponent>;

    onTouched: Function;

    onChange: Function;

    toggle(): void;

    open(): void;

    close(forceClose?: boolean): void;

    focus(): void;

    _onBlur(): void;

    _onFocus(): void;

    _onAttached(): void;

    _getAriaActiveDescendant(): string | null;

    _setSelectionByValue(value: any | any[]): void;

    _updateCalculatedHeight(): void;

    _initializeCommonBehavior(): void;

    _cleanupCommonBehavior(): void;

    _registerEventsAfterContentInit(): void;

    _handleKeydown(event: KeyboardEvent): void;

    _initializeSelection(): void;
}

