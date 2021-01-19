/**
* The MIT License
* Format: Copyright (c) 2010-2020 Google LLC. http://angular.io/license
* Upstream-Name: Angular material
* Upstream-Contact: fundamental@sap.com
* Source: https://github.com/angular/components
* Disclaimer:
*  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
*  associated documentation files (the "Software"), to deal in the Software without restriction,
*  including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
*  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
*  subject to the following conditions:
*  The above copyright notice and this permission notice shall be
*  included in all copies or substantial portions of the Software.
*  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
*  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
*  AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
*  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE

Files: **
Copyright (c) 2010-2020 Google LLC. http://angular.io/license
License: The MIT License
*
* */
import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, ElementRef, EventEmitter, isDevMode, NgZone, QueryList } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { defer, merge, Observable, Subject } from 'rxjs';
import { CdkConnectedOverlay, ConnectedPosition, ViewportRuler } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';
import { NgControl } from '@angular/forms';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, END, ENTER, hasModifierKey, HOME, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

import { FdOptionSelectionChange, OptionComponent } from '../option/option.component';
import { FdSelectChange } from '../select.component';
import { KeyUtil } from '../../utils/functions/key-util';

/**
 * by @Frank:
 * Common behaviors from Material Select Component to build Fundamental-ngx Select on top of it.
 * We need this solid foundation to deliver robust solution and only focus on additional Fiori 3 enhancement.
 * Even this seems to be implemented as one big mixins with single anonymous class all this is going to
 * breaking down
 * into several pieces in order to maximize reusability. Such as a possible candidates would be to separate
 * Keyboard Support, Overlay support and option panel positioning and maybe select behavior itself.
 */

/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export const SELECT_PANEL_VIEWPORT_PADDING = 5;

/** The height of the select items in `rem` units. */
export const SELECT_ITEM_HEIGHT_EM = 3;

/**
 * Dropdown Header identifier. Since existing logic is relaying on the options[] for the height calculation of
 * the panel existing native with LI does not fit into this structure.
 */
const SELECT_HEADER_IDENTIFIER = '.fd-list__group-header';

export type Constructor<T> = new (...args: any[]) => T;


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
    _compareWith: (o1: any, o2: any) => boolean;
    _controlElementRef: ElementRef;
    _triggerRect: ClientRect;
    _options: QueryList<OptionComponent>;
    _overlayDir: CdkConnectedOverlay;
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

    _getAriaActiveDescendant(): string | null;

    _setSelectionByValue(value: any | any[]): void;

    _updateCalculatedHeight(): void;

    _initializeCommonBehavior(): void;

    _cleanupCommonBehavior(): void;

    _registerEventsAfterContentInit(): void;

    _handleKeydown(event: KeyboardEvent): void;

    _initializeSelection(): void;
}


/** @hidden */
export type MatSelectCommonBehaviorCtor = Constructor<MatSelectCommonBehavior>;

/**
 * Constructor def
 */
export interface HasMatCommonBehavior {
    viewportRuler: ViewportRuler;
    elementRef: ElementRef;
    ngZone: NgZone;
    changeDetectorRef: ChangeDetectorRef;
    dir: Directionality;
    ngControl: NgControl;
    liveAnnouncer: LiveAnnouncer;
}

/**
 *
 * Base class for applying Material Select Common behaviors
 *
 * @hidden
 */
class MatSelectCommons {
    constructor(
        public viewportRuler: ViewportRuler,
        public elementRef: ElementRef,
        public ngZone: NgZone,
        public changeDetectorRef: ChangeDetectorRef,
        public dir: Directionality,
        public ngControl: NgControl,
        public liveAnnouncer: LiveAnnouncer
    ) {}
}


export const _MatSelectMixinCommons: MatSelectCommonBehaviorCtor & typeof MatSelectCommons = mixinMatSelectCommons(
    MatSelectCommons
);

export function mixinMatSelectCommons<T extends Constructor<HasMatCommonBehavior>>(
    base: T
): MatSelectCommonBehaviorCtor & T {
    return class extends base {
        disabled: boolean;
        mobile: boolean;
        readonly: boolean;
        canClose: boolean;
        canEmitValueChange: boolean;
        typeaheadDebounceInterval: number;
        maxHeight: string;
        /**
         * Tells if the panel is open
         */
        panelOpen = false;

        /**
         * Making true will not unselect the missing or defined value
         */
        unselectMissingOption: boolean;

         /**
         * Event emitted when the selected value of the select changes.
         */
        readonly valueChange: EventEmitter<FdSelectChange>;

        /**
         * Event emitted when the popover open state changes
         */
        readonly isOpenChange: EventEmitter<boolean>;

        /***
        * Handle to Value Accessor that is expected to be implemented by host class
        */
       onTouched: Function;

       /***
       * Handle to Value Accessor that is expected to be implemented by host class
       */
       onChange: Function;

        /*** @hidden */
        _controlElementRef: ElementRef;

        /*** @hidden */
        _options: QueryList<OptionComponent>;

        /*** @hidden */
        _optionPanel: ElementRef;

        /*** @hidden */
        _overlayDir: CdkConnectedOverlay;

        /**
         * Verifes outside click tigger overlay close
         * It needs to be removed as it is not select basic feature.
         * @hidden
         */
        _closeOnOutsideClick: boolean;

        /**
         * Handles selection interaction logic
         * MatSelectCommonBehavior interface propertie
         * @hidden
         */
         _selectionModel: SelectionModel<OptionComponent>;

        /**
         * @hidden
         * MatSelectCommonBehavior interface propertie
         */
        _triggerRect: ClientRect;

        /**
         * Handles keyboard events
         * MatSelectCommonBehavior interface propertie
         * @hidden
         */
        _keyManager: ActiveDescendantKeyManager<OptionComponent>;

        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         *
         * In current implemenation we keep 0 as we dont want any panel centering here.
         *MatSelectCommonBehavior interface propertie
         * @hidden
         */
        _offsetY = 0;

        /** @hidden
         * MatSelectCommonBehavior interface propertie
        */
        _internalValue: any;

        /** @hidden */
        _calculatedMaxHeight: number;

        /**
         * @hidden
         */
        private _controlElemFontSize = 0;

        /**
         * The value of the select panel's transform-origin property.
         * @hidden
         */
        private _transformOrigin = 'top';

        /** @hidden
         * Triggers when component is destroyed
         */
        private readonly _destroy = new Subject<void>();

        /**
         * Used by overlay panel to tell scroll position
         * @hidden
         */
        private _scrollTop = 0;

        /** @hidden */
        private _focused = false;

        /**@hidden
         * Stored calculated maxHeight from Option Panel
         */
        private _maxHeight: number;

        /**
         * Combined stream of all of the child options' change events.
         */
        readonly _optionSelectionChanges: Observable<FdOptionSelectionChange> = defer(() => {
            const _options = this._options;

            if (_options) {
                return _options.changes.pipe(
                    startWith(_options),
                    switchMap(() => merge(..._options.map((option) => option.selectionChange)))
                );
            }

            return this.ngZone.onStable.asObservable().pipe(
                take(1),
                switchMap(() => this._optionSelectionChanges)
            );
        }) as Observable<FdOptionSelectionChange>;

        constructor(...args: any[]) {
            super(...args);
        }

        get calculatedMaxHeight(): number {
            return this._maxHeight || this._calculatedMaxHeight;
        }

        /**
         * Returns true if select has any value selected
         */
        get empty(): boolean {
            return !this._selectionModel || this._selectionModel.isEmpty();
        }

        get focused(): boolean {
            return this._focused || this.panelOpen;
        }

        get selected(): OptionComponent {
            return this._selectionModel.selected[0];
        }

        /** Focuses select control. */
        focus(): void {
            if (this._controlElementRef) {
                (this._controlElementRef.nativeElement as HTMLElement).focus();
            }
        }

        /** Toggles the open state of the select. */
        toggle(): void {
            this.panelOpen ? this.close() : this.open();
        }

        /** Opens the select popover body. */
        open(): void {
            if (this.disabled || this.readonly || !this._options || !this._getItemCount() || this.panelOpen) {
                return;
            }
            this._triggerRect = this._controlElementRef.nativeElement.getBoundingClientRect();
            this.panelOpen = true;

            this._controlElemFontSize = parseInt(
                getComputedStyle(this._controlElementRef.nativeElement).fontSize || '0',
                10
            );

            this._keyManager.withHorizontalOrientation(null);
            this._highlightCorrectOption();
            this.changeDetectorRef.markForCheck();

            this.isOpenChange.emit(true);
            // Set the font size on the panel element once it exists.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    if (
                        this._controlElemFontSize &&
                        this._overlayDir &&
                        this._overlayDir.overlayRef &&
                        this._overlayDir.overlayRef.overlayElement
                    ) {
                        this._overlayDir.overlayRef.overlayElement.style.fontSize = `${this._controlElemFontSize}px`;
                    }
                });
        }


        /**
         * Closes the select popover body. Close has special behavior to support mobile mobile where we display
         * option values inside a full screen dialog and there are several modes. Usually canClose is true if we are
         * not in mobile mode or mobile mode has only cancel button available. If inside mobile mode we also have
         * confirmation button then we dont want to close the option values after every selection.
         * @param forceClose: Do close dialog regardless if the dialog is dismissible or not.
         */
        close(forceClose: boolean = false): void {
            if (this.panelOpen && (forceClose || this.canClose)) {
                this.panelOpen = false;
                this._keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
                this.changeDetectorRef.markForCheck();
                this.onTouched();

                this.isOpenChange.emit(false);
            }
        }

         /**
         * Function to compare the option values with the selected values. The first argument
         * is a value from an option. The second is a value from the selection. A boolean
         * should be returned.
         *
         *
         * Default comparision function to identify which option to display
         *
         * @hidden
        */
       _compareWith = (o1: any, o2: any) => o1 === o2;

        /** @hidden */
        _initializeCommonBehavior(): void {
            this._selectionModel = new SelectionModel<OptionComponent>(false);
            this.viewportRuler
                .change()
                .pipe(takeUntil(this._destroy))
                .subscribe(() => {
                    if (this.panelOpen) {
                        this._triggerRect = this._controlElementRef.nativeElement.getBoundingClientRect();
                        this.changeDetectorRef.markForCheck();
                    }
                });
            this._updateCalculatedHeight();
        }

        /** @hidden */
        _cleanupCommonBehavior(): void {
            this._destroy.next();
            this._destroy.complete();
        }

        /** @hidden */
        _registerEventsAfterContentInit(): void {
            this._initKeyManager();

            this._selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe((event) => {
                event.added.forEach((option) => option.select());
                event.removed.forEach((option) => option.deselect());
            });

            this._options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
                this._resetOptions();
                this._initializeSelection();
            });
        }

        /**
         * Handles all keydown events on the select.
         *
         * @hidden
         */
        _handleKeydown(event: KeyboardEvent): void {
            if (!this.disabled && !this.readonly) {
                this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
            }
        }

        /**
         * Determines the `aria-activedescendant` to be set on the host.
         *
         * @hidden
         */
        _getAriaActiveDescendant(): string | null {
            if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
                return this._keyManager.activeItem.id;
            }

            return null;
        }

        /** @hidden */
        _initializeSelection(): void {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(() => {
                this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._internalValue);
            });
        }

        /** @hidden */
        _setSelectionByValue(value: any | any[]): void {
            this._selectionModel.clear();
            const correspondingOption = this._selectValue(value);

            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this._keyManager.setActiveItem(correspondingOption);
            } else if (!this.panelOpen) {
                // Otherwise reset the highlighted option. Note that we only want to do this while
                // closed, because doing it while open can shift the user's focus unnecessarily.
                this._keyManager.setActiveItem(-1);
            }

            this.changeDetectorRef.markForCheck();
        }

        /** @hidden */
        _onFocus(): void {
            if (!this.disabled) {
                this._focused = true;
                this.changeDetectorRef.markForCheck();
            }
        }

        /** @hidden */
        _onBlur(): void {
            this._focused = false;

            if (!this.disabled && !this.panelOpen) {
                this.onTouched();
                this.changeDetectorRef.markForCheck();
            }
        }

        /**
         * Expose expose outside of this mixin to give component ability
         * to update caluclatedMaxHeight if needed
         * @hidden
         */
        _updateCalculatedHeight(): void {
            this._calculatedMaxHeight = window.innerHeight * 0.45;
        }

        /** @hidden */
        private _resetOptions(): void {
            const changedOrDestroyed = merge(this._options.changes, this._destroy);

            this._optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe((event) => {
                this._onSelect(event.source, event.isUserInput);

                if (event.isUserInput && this.panelOpen) {
                    this.close();
                    this.focus();
                }
            });

            // Listen to changes in the internal state of the _options and react accordingly.
            // Handles cases like the labels of the selected _options changing.
            merge(...this._options.map((option) => option._stateChanges))
                .pipe(takeUntil(changedOrDestroyed))
                .subscribe(() => {
                    this.changeDetectorRef.markForCheck();
                });
        }

        /** @hidden */
        private _selectValue(value: any): OptionComponent | undefined {
            const correspondingOption = this._options.find((option: OptionComponent) => {
                try {
                    // Treat null as a special reset value.
                    return option.value != null && this._compareWith(option.value, value);
                } catch (error) {
                    if (isDevMode()) {
                        // Notify developers of errors in their comparator.
                        console.warn(error);
                    }
                    return false;
                }
            });

            if (correspondingOption) {
                this._selectionModel.select(correspondingOption);
            }

            return correspondingOption;
        }

        /**
         * Sets up a key manager to listen to keyboard events on the overlay panel.
         *
         * @hidden
         */
        private _initKeyManager(): void {
            this._keyManager = new ActiveDescendantKeyManager<OptionComponent>(this._options)
                .withTypeAhead(this.typeaheadDebounceInterval)
                .withVerticalOrientation()
                .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr')
                .withAllowedModifierKeys(['shiftKey']);

            this._keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
                this.focus();
                this.close();
            });

            this._keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
                if (this.panelOpen && this._optionPanel) {
                    this._scrollActiveOptionIntoView();
                } else if (!this.panelOpen && this._keyManager.activeItem) {
                    this._keyManager.activeItem._selectViaInteraction();
                }
            });
        }

        /** @hidden */
        private _isRtl(): boolean {
            return this.dir ? this.dir.value === 'rtl' : false;
        }

        /** @hidden */
        private _scrollActiveOptionIntoView(): void {
            const activeOptionIndex = this._keyManager.activeItemIndex || 0;

            this._optionPanel.nativeElement.scrollTop = this._getOptionScrollPosition(
                activeOptionIndex,
                this._getItemHeight(),
                this._optionPanel.nativeElement.scrollTop,
                this._calculatedMaxHeight
            );
        }

        /**
         * Calculates element position to which to scroll  in order for option to be into view
         * @param optionIndex Index of the option to be scrolled into the view.
         * @param optionHeight Height of the options.
         * @param currentScrollPosition Current scroll position of the panel.
         * @param panelHeight Height of the panel.
         *
         * @hidden
         */
        private _getOptionScrollPosition(
            optionIndex: number,
            optionHeight: number,
            currentScrollPosition: number,
            panelHeight: number
        ): number {
            const optionOffset = optionIndex * optionHeight;
            if (optionOffset < currentScrollPosition) {
                return optionOffset;
            }
            if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
                return Math.max(0, optionOffset - panelHeight + optionHeight);
            }
            return currentScrollPosition;
        }

        /** @hidden */
        private _getItemHeight(): number {
            // also include border with default value 1.
            return this._controlElemFontSize * SELECT_ITEM_HEIGHT_EM + 1;
        }

        /**
         * Invoked when an option is clicked.
         * @hidden
         */
        private _onSelect(option: OptionComponent, isUserInput: boolean): void {
            const wasSelected = this._selectionModel.isSelected(option);
            if ((option.value === null || option.value === undefined) &&
            this.unselectMissingOption) {
                option.deselect();
                this._selectionModel.clear();
                this._emitSelectChange(option.value);
            } else {
                if (wasSelected !== option.selected) {
                    option.selected ? this._selectionModel.select(option) : this._selectionModel.deselect(option);
                }
                if (isUserInput) {
                    this._keyManager.setActiveItem(option);
                }
            }

            if (wasSelected !== this._selectionModel.isSelected(option) || this.mobile) {
                this._emitSelectChange();
            }
        }

        /** @hidden */
        private _emitSelectChange(defaultVal?: any): void {
            if (this.canEmitValueChange) {
                this._internalValue = this._selectionModel.selected
                    ? (this.selected as OptionComponent).value
                    : defaultVal;
                this.valueChange.emit(this._internalValue);
                this.onChange(this._internalValue);
                this.changeDetectorRef.markForCheck();
            }
        }

        /** @hidden */
        private _getItemCount(): number {
            if (this._optionPanel && this._headerElements().length > 0) {
                return this._options.length + this._headerElements().length;
            }
            return this._options.length;
        }

        /** @hidden */
        private _getOptionIndex(option: OptionComponent): number | undefined {
            return this._options.reduce((result: number | undefined, current: OptionComponent, index: number) => {
                if (result !== undefined) {
                    return result;
                }

                return option === current ? index : undefined;
            }, undefined);
        }

        /**
         * Sets the transform origin point based on the selected option.
         *
         * @hidden
         */
        private _getOriginBasedOnOption(): string {
            const itemHeight = this._getItemHeight();
            const optionHeightAdjustment = (itemHeight - this._triggerRect.height) / 2;
            const originY = Math.abs(this._offsetY) - optionHeightAdjustment + itemHeight / 2;
            return `50% ${originY}px 0px`;
        }

        /** @hidden */
        private _highlightCorrectOption(): void {
            if (this._keyManager) {
                if (this.empty) {
                    this._keyManager.setFirstItemActive();
                } else {
                    this._keyManager.setActiveItem(this.selected);
                }
            }
        }

        /**
         * Handles keyboard events while the select is closed.
         *
         * @hidden
         */
        private _handleClosedKeydown(event: KeyboardEvent): void {
            const isArrowKey = KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW]);
            const isOpenKey = KeyUtil.isKeyCode(event, [ENTER, SPACE]);
            const manager = this._keyManager;

            // Open the select on ALT + arrow key to match the native <select>
            if ((!manager.isTyping() && isOpenKey && !hasModifierKey(event)) || (event.altKey && isArrowKey)) {
                event.preventDefault(); // prevents the page from scrolling down when pressing space
                this.open();
            } else {
                const previouslySelectedOption = this.selected;

                if (KeyUtil.isKeyCode(event, [HOME, END])) {
                    KeyUtil.isKeyCode(event, HOME) ? manager.setFirstItemActive() : manager.setLastItemActive();
                    event.preventDefault();
                } else {
                    manager.onKeydown(event);
                }
                const selectedOption = this.selected;

                // Since the value has changed, we need to announce it ourselves.
                if (selectedOption && previouslySelectedOption !== selectedOption) {
                    // We set a duration on the live announcement, because we want the live element to be
                    // cleared after a while so that users can't navigate to it using the arrow keys.
                    this.liveAnnouncer.announce((selectedOption as OptionComponent).viewValue, 10000);
                }
            }
        }

        /**
         * Handles keyboard events when the selected is open.
         *
         * @hidden
         */
        private _handleOpenKeydown(event: KeyboardEvent): void {
            const manager = this._keyManager;
            const isArrowKey = KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW]);
            const isTyping = manager.isTyping();

            if (KeyUtil.isKeyCode(event, [HOME, END])) {
                event.preventDefault();
                KeyUtil.isKeyCode(event, HOME) ? manager.setFirstItemActive() : manager.setLastItemActive();
            } else if (isArrowKey && event.altKey) {
                // Close the select on ALT + arrow key to match the native <select>
                event.preventDefault();
                this.close();
                // Don't do anything in this case if the user is typing,
                // because the typing sequence can include the space key.
            } else if (
                !isTyping &&
                KeyUtil.isKeyCode(event, [ENTER, SPACE]) &&
                manager.activeItem &&
                !hasModifierKey(event)
            ) {
                event.preventDefault();
                manager.activeItem._selectViaInteraction();
            } else {
                manager.onKeydown(event);
            }
        }

        /**
         * In order to calculate overlay position as well as to be able scroll to the element we need
         * to know proper height of the option panel when maxHeight binding is used. We cannot use this
         * property directly as it can come in different units, but instead we asked _optionPanel what is the set
         * height if any.
         *
         *
         * @hidden
         */
        private _updateMaxHeight(): void {
            if (this.maxHeight && this._optionPanel) {
                this._maxHeight = this._optionPanel.nativeElement.offsetHeight;
            }
        }

        /**
         * @hidden
         */
        private _headerElements(): NodeListOf<Element> {
            return this._optionPanel.nativeElement.querySelectorAll(SELECT_HEADER_IDENTIFIER);
        }
    };


}
