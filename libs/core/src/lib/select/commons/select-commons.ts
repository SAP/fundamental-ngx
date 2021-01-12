/** The MIT License
* Copyright (c) 2014-2016 Google, Inc. http://angularjs.org
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
* associated documentation files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
* INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
* AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*
* */
import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { FdOptionSelectionChange, OptionComponent } from '../option/option.component';
import { FdSelectChange } from '../select.component';
import { ChangeDetectorRef, ElementRef, EventEmitter, isDevMode, NgZone, QueryList, Input } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { defer, merge, Observable, Subject } from 'rxjs';
import { CdkConnectedOverlay, ConnectedPosition, ViewportRuler } from '@angular/cdk/overlay';
import { SelectionModel } from '@angular/cdk/collections';
import { NgControl } from '@angular/forms';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, END, ENTER, hasModifierKey, HOME, SPACE, UP_ARROW } from '@angular/cdk/keycodes';


 import { KeyUtil } from '../../utils/functions/key-util';

/**
 * Common behaviors from Material Select Component to build Fundamental-ngx Select on top of it. We need this solid
 * foundation to deliver robust solution and only focus on additional Fiori 3 enhancement.
 *
 * Even this seems to be implemented as one big mixins with single anonymous class all this is going to be broking down
 * into several pieces in order to maximize reusability. Such as a possible candidates would be to separate
 * Keyboard Support, Overlay support and option panel positioning and maybe select behavior itself.
 *
 * @Hidden
 */

/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export const SELECT_PANEL_VIEWPORT_PADDING = 5;

/** The height of the select items in `em` units. */
export const SELECT_ITEM_HEIGHT_EM = 3;

/**
 * Dropdown Header identifier. Since existing logic is relaying on the options[] for the height calculation of
 * the panel existing native with LI does not fit into this structure.
 *
 * We need to improve this implementation to have something like fd-option-header that we can query and provide
 * more readable structure instead of allowing user to mix <fd-option> with LI element on the same level.
 *
 * todo: This should temporary solution used only for current calculation until we introduce fd-option-header
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
    compareWith: (o1: any, o2: any) => boolean;
    controlElementRef: ElementRef;
    options: QueryList<OptionComponent>;
    readonly valueChange: EventEmitter<FdSelectChange>;
    readonly openedChange: EventEmitter<boolean>;
    readonly selected: OptionComponent;
    readonly empty: boolean;
    readonly panelOpen: boolean;
    readonly canClose: boolean;
    readonly canEmitValueChange: boolean;
    readonly focused: boolean;
    readonly calculatedMaxHeight: number;
    readonly positions: ConnectedPosition[];

    /**
     * Even we want to name this `_value` it breaks the bound we have set. _ prefix can be used
     * only for private properties and we are not going to make private property out of interface
     */
    internalValue: any;
    offsetY: number;
    triggerRect: ClientRect;
    onTouched: Function;
    onChange: Function;
    overlayDir: CdkConnectedOverlay;
    keyManager: ActiveDescendantKeyManager<OptionComponent>;
    selectionModel: SelectionModel<OptionComponent>;

    toggle(): void;

    open(): void;

    close(forceClose?: boolean): void;

    focus(): void;

    initializeCommonBehavior(): void;

    initializeSelection(): void;

    cleanupCommonBehavior(): void;

    registerEventsAfterContentInit(): void;

    handleKeydown(event: KeyboardEvent): void;

    onFocus(): void;

    onBlur(): void;

    onAttached(): void;

    getAriaActiveDescendant(): string | null;

    setSelectionByValue(value: any | any[]): void;

    updateCalculatedHeight(): void;
}

/**
 * @hidden
 */
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
        controlElementRef: ElementRef;
        options: QueryList<OptionComponent>;
        optionPanel: ElementRef;
        overlayDir: CdkConnectedOverlay;

        /**
         * Tells if the panel is open
         */
        panelOpen = false;

        /**
         * Verifes outside click tigger overlay close
         * @hidden
         */
        closeOnOutsideClick: boolean;

        /**
         * Handles selection interaction logic
         * @hidden
         */
        selectionModel: SelectionModel<OptionComponent>;

        /**
         * @hidden
         */
        triggerRect: ClientRect;

        /**
         * Handles keyboard events
         *
         * @hidden
         */
        keyManager: ActiveDescendantKeyManager<OptionComponent>;

        /**
         *
         * @hidden
         */
        private _controlElemFontSize = 0;

        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         *
         * In current implemenation we keep 0 as we dont want any panel centering here.
         *
         * @hidden
         */
        offsetY = 0;

        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         *
         * @hidden
         */

        /**
         * The value of the select panel's transform-origin property.
         * @hidden
         */
        private _transformOrigin = 'top';

        /** @hidden */
        private _calculatedMaxHeight: number;

        /** @hidden */
        internalValue: any;

        /**
         * Triggers when component is destroyed
         */
        private readonly _destroy = new Subject<void>();

        /**
         * Used by overlay panel to tell scroll position
         *
         * @hidden
         */
        private _scrollTop = 0;
        private _focused = false;

        /**
         * Stored calculated maxHeight from Option Panel
         */
        private _maxHeight: number;

        /**
         * Combined stream of all of the child options' change events.
         */
        readonly optionSelectionChanges: Observable<FdOptionSelectionChange> = defer(() => {
            const options = this.options;

            if (options) {
                return options.changes.pipe(
                    startWith(options),
                    switchMap(() => merge(...options.map((option) => option.selectionChange)))
                );
            }

            return this.ngZone.onStable.asObservable().pipe(
                take(1),
                switchMap(() => this.optionSelectionChanges)
            );
        }) as Observable<FdOptionSelectionChange>;

        /**
         * Handle to Value Accessor that is expected to be implemented by host class
         */
        onTouched: Function;
        onChange: Function;

        /**
         * Event emitted when the selected value of the select changes.
         */
        readonly valueChange: EventEmitter<FdSelectChange>;

        /**
         * Event emitted when the popover open state changes
         */
        readonly openedChange: EventEmitter<boolean>;

        get calculatedMaxHeight(): number {
            return this._maxHeight || this._calculatedMaxHeight;
        }

        /**
         * Returns true if select has any value selected
         */
        get empty(): boolean {
            return !this.selectionModel || this.selectionModel.isEmpty();
        }

        get focused(): boolean {
            return this._focused || this.panelOpen;
        }

        get selected(): OptionComponent {
            return this.selectionModel.selected[0];
        }

        /** @hidden */
        get positions(): ConnectedPosition[] {
            return [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom'
                }
            ];
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
        compareWith = (o1: any, o2: any) => o1 === o2;

        constructor(...args: any[]) {
            super(...args);
        }

        /** Focuses select control. */
        focus(): void {
            if (this.controlElementRef) {
                (this.controlElementRef.nativeElement as HTMLElement).focus();
            }
        }

        /** Toggles the open state of the select. */
        toggle(): void {
            this.panelOpen ? this.close() : this.open();
        }

        /** Opens the select popover body. */
        open(): void {
            if (this.disabled || this.readonly || !this.options || !this._getItemCount() || this.panelOpen) {
                return;
            }
            this.triggerRect = this.controlElementRef.nativeElement.getBoundingClientRect();
            this.panelOpen = true;

            this._controlElemFontSize = parseInt(
                getComputedStyle(this.controlElementRef.nativeElement).fontSize || '0',
                10
            );

            this.keyManager.withHorizontalOrientation(null);
            this._calculateOverlayPosition();
            this._highlightCorrectOption();
            this.changeDetectorRef.markForCheck();

            this.openedChange.emit(true);
            // Set the font size on the panel element once it exists.
            this.ngZone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    if (
                        this._controlElemFontSize &&
                        this.overlayDir &&
                        this.overlayDir.overlayRef &&
                        this.overlayDir.overlayRef.overlayElement
                    ) {
                        this.overlayDir.overlayRef.overlayElement.style.fontSize = `${this._controlElemFontSize}px`;
                    }
                });
        }

        /** @hidden */
        initializeCommonBehavior(): void {
            this.selectionModel = new SelectionModel<OptionComponent>(false);
            this.viewportRuler
                .change()
                .pipe(takeUntil(this._destroy))
                .subscribe(() => {
                    if (this.panelOpen) {
                        this.triggerRect = this.controlElementRef.nativeElement.getBoundingClientRect();
                        this.changeDetectorRef.markForCheck();
                    }
                });
            this.updateCalculatedHeight();
        }

        /** @hidden */
        cleanupCommonBehavior(): void {
            this._destroy.next();
            this._destroy.complete();
        }

        /** @hidden */
        registerEventsAfterContentInit(): void {
            this._initKeyManager();

            this.selectionModel.changed.pipe(takeUntil(this._destroy)).subscribe((event) => {
                event.added.forEach((option) => option.select());
                event.removed.forEach((option) => option.deselect());
            });

            this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
                this._resetOptions();
                this.initializeSelection();
            });
        }

        /**
         * Closes the select popover body. Close has special behavior to support mobile mobile where we display
         * option values inside a full screen dialog and there are several modes. Usually canClose is true if we are
         * not in mobile mode or mobile mode has only cancel button available. If inside mobile mode we also have
         * confirmation button then we dont want to close the option values after every selection.
         *
         * @param forceClose: Do close dialog regardless if the dialog is dismissible or not.
         */
        close(forceClose: boolean = false): void {
            if (this.panelOpen && (forceClose || this.canClose)) {
                this.panelOpen = false;
                this.keyManager.withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr');
                this.changeDetectorRef.markForCheck();
                this.onTouched();

                this.openedChange.emit(false);
            }
        }

        /**
         * Handles all keydown events on the select.
         *
         * @hidden
         */
        handleKeydown(event: KeyboardEvent): void {
            if (!this.disabled && !this.readonly) {
                this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
            }
        }

        /**
         *
         * Callback that is invoked when the overlay panel has been attached.
         *
         * @hidden
         */
        onAttached(): void {
            this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
                this.changeDetectorRef.detectChanges();
                this.updateMaxHeight();
                this._calculateOverlayOffsetX();

                /**
                 * todo: remove when fd-option-header exists and we dont need to calculate extra headers
                 *      this._calculateOverlayPosition();
                 *      this.changeDetectorRef.markForCheck();
                 */
                this._calculateOverlayPosition();
                this.changeDetectorRef.markForCheck();
                this.optionPanel.nativeElement.scrollTop = this._scrollTop;
            });
        }

        /**
         * Determines the `aria-activedescendant` to be set on the host.
         *
         * @hidden
         */
        getAriaActiveDescendant(): string | null {
            if (this.panelOpen && this.keyManager && this.keyManager.activeItem) {
                return this.keyManager.activeItem.id;
            }

            return null;
        }

        /** @hidden */
        initializeSelection(): void {
            // Defer setting the value in order to avoid the "Expression
            // has changed after it was checked" errors from Angular.
            Promise.resolve().then(() => {
                this.setSelectionByValue(this.ngControl ? this.ngControl.value : this.internalValue);
            });
        }

        /** @hidden */
        setSelectionByValue(value: any | any[]): void {
            this.selectionModel.clear();
            const correspondingOption = this._selectValue(value);

            // Shift focus to the active item. Note that we shouldn't do this in multiple
            // mode, because we don't know what option the user interacted with last.
            if (correspondingOption) {
                this.keyManager.setActiveItem(correspondingOption);
            } else if (!this.panelOpen) {
                // Otherwise reset the highlighted option. Note that we only want to do this while
                // closed, because doing it while open can shift the user's focus unnecessarily.
                this.keyManager.setActiveItem(-1);
            }

            this.changeDetectorRef.markForCheck();
        }

        /** @hidden */
        onFocus(): void {
            if (!this.disabled) {
                this._focused = true;
                this.changeDetectorRef.markForCheck();
            }
        }

        /** @hidden */
        onBlur(): void {
            this._focused = false;

            if (!this.disabled && !this.panelOpen) {
                this.onTouched();
                this.changeDetectorRef.markForCheck();
            }
        }

        /**
         * Expose expose outside of this mixin to give component ability to update caluclatedMaxHeight if needed
         *
         * @hidden
         */
        updateCalculatedHeight(): void {
            this._calculatedMaxHeight = window.innerHeight * 0.45;
        }

        /** @hidden */
        private _resetOptions(): void {
            const changedOrDestroyed = merge(this.options.changes, this._destroy);

            this.optionSelectionChanges.pipe(takeUntil(changedOrDestroyed)).subscribe((event) => {
                this._onSelect(event.source, event.isUserInput);

                if (event.isUserInput && this.panelOpen) {
                    this.close();
                    this.focus();
                }
            });

            // Listen to changes in the internal state of the options and react accordingly.
            // Handles cases like the labels of the selected options changing.
            merge(...this.options.map((option) => option._stateChanges))
                .pipe(takeUntil(changedOrDestroyed))
                .subscribe(() => {
                    this.changeDetectorRef.markForCheck();
                });
        }

        /** @hidden */
        private _selectValue(value: any): OptionComponent | undefined {
            const correspondingOption = this.options.find((option: OptionComponent) => {
                try {
                    // Treat null as a special reset value.
                    return option.value != null && this.compareWith(option.value, value);
                } catch (error) {
                    if (isDevMode()) {
                        // Notify developers of errors in their comparator.
                        console.warn(error);
                    }
                    return false;
                }
            });

            if (correspondingOption) {
                this.selectionModel.select(correspondingOption);
            }

            return correspondingOption;
        }

        /**
         * Sets up a key manager to listen to keyboard events on the overlay panel.
         *
         * @hidden
         */
        private _initKeyManager(): void {
            this.keyManager = new ActiveDescendantKeyManager<OptionComponent>(this.options)
                .withTypeAhead(this.typeaheadDebounceInterval)
                .withVerticalOrientation()
                .withHorizontalOrientation(this._isRtl() ? 'rtl' : 'ltr')
                .withAllowedModifierKeys(['shiftKey']);

            this.keyManager.tabOut.pipe(takeUntil(this._destroy)).subscribe(() => {
                this.focus();
                this.close();
            });

            this.keyManager.change.pipe(takeUntil(this._destroy)).subscribe(() => {
                if (this.panelOpen && this.optionPanel) {
                    this._scrollActiveOptionIntoView();
                } else if (!this.panelOpen && this.keyManager.activeItem) {
                    this.keyManager.activeItem.selectViaInteraction();
                }
            });
        }

        /** @hidden */
        private _isRtl(): boolean {
            return this.dir ? this.dir.value === 'rtl' : false;
        }

        /** @hidden */
        private _scrollActiveOptionIntoView(): void {
            const activeOptionIndex = this.keyManager.activeItemIndex || 0;

            this.optionPanel.nativeElement.scrollTop = this._getOptionScrollPosition(
                activeOptionIndex,
                this._getItemHeight(),
                this.optionPanel.nativeElement.scrollTop,
                this.calculatedMaxHeight
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
         *
         * @hidden
         */
        private _onSelect(option: OptionComponent, isUserInput: boolean): void {
            const wasSelected = this.selectionModel.isSelected(option);

            if (option.value == null) {
                option.deselect();
                this.selectionModel.clear();
                this._emitSelectChange(option.value);
            } else {
                if (wasSelected !== option.selected) {
                    option.selected ? this.selectionModel.select(option) : this.selectionModel.deselect(option);
                }
                if (isUserInput) {
                    this.keyManager.setActiveItem(option);
                }
            }

            if (wasSelected !== this.selectionModel.isSelected(option) || this.mobile) {
                this._emitSelectChange();
            }
        }

        /** @hidden */
        private _emitSelectChange(defaultVal?: any): void {
            if (this.canEmitValueChange) {
                this.internalValue = this.selectionModel.selected
                    ? (this.selected as OptionComponent).value
                    : defaultVal;
                this.valueChange.emit(this.internalValue);
                this.onChange(this.internalValue);
                this.changeDetectorRef.markForCheck();
            }
        }

        /** @hidden */
        private _getItemCount(): number {
            if (this.optionPanel && this._headerElements().length > 0) {
                return this.options.length + this._headerElements().length;
            }
            return this.options.length;
        }

        /** @hidden */
        private _calculateOverlayPosition(): void {
            const itemHeight = this._getItemHeight();
            const items = this._getItemCount();
            const panelHeight = Math.min(items * itemHeight, this.calculatedMaxHeight);
            const scrollContainerHeight = items * itemHeight;

            // The farthest the panel can be scrolled before it hits the bottom
            const maxScroll = scrollContainerHeight - panelHeight;

            // If no value is selected we open the popup to the first item.
            const selectedOptionOffset =
                // tslint:disable-next-line:no-non-null-assertion
                this.empty ? 0 : this._getOptionIndex(this.selected)!;

            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            const scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedOptionOffset, scrollBuffer, maxScroll);
            this.offsetY = 0;
            // temporary disabling as i found issue in the material code
            // https://github.com/angular/components/issues/19620
            // this._checkOverlayWithinViewport(maxScroll);
        }

        /** @hidden */
        private _getOptionIndex(option: OptionComponent): number | undefined {
            return this.options.reduce((result: number | undefined, current: OptionComponent, index: number) => {
                if (result !== undefined) {
                    return result;
                }

                return option === current ? index : undefined;
            }, undefined);
        }

        /**
         * Calculates the scroll position of the select's overlay panel.
         *
         * Attempts to center the selected option in the panel. If the option is
         * too high or too low in the panel to be scrolled to the center, it clamps the
         * scroll position to the min or max scroll positions respectively.
         *
         *  @hidden
         */
        private _calculateOverlayScroll(selectedIndex: number, scrollBuffer: number, maxScroll: number): number {
            const itemHeight = this._getItemHeight();
            const optionOffsetFromScrollTop = itemHeight * selectedIndex;
            const halfOptionHeight = itemHeight / 2;

            // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
            // scroll container, then subtracts the scroll buffer to scroll the option down to
            // the center of the overlay panel. Half the option height must be re-added to the
            // scrollTop so the option is centered based on its middle, not its top edge.
            const optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
            return Math.min(Math.max(0, optimalScrollPosition), maxScroll);
        }

        /**
         * Sets the x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction. Note that the offset
         * can't be calculated until the panel has been attached, because we need to know the
         * content width in order to constrain the panel within the viewport.
         *
         * @hidden
         */
        private _calculateOverlayOffsetX(): void {
            const overlayRect = this.overlayDir.overlayRef.overlayElement.getBoundingClientRect();
            const viewportSize = this.viewportRuler.getViewportSize();
            const isRtl = this._isRtl();
            const paddingWidth = 2;
            let offsetX = -1;

            // Invert the offset in LTR.
            if (!isRtl) {
                offsetX *= -1;
            }

            // Determine how much the select overflows on each side.
            const leftOverflow = 0 - (overlayRect.left + offsetX - (isRtl ? paddingWidth : 0));
            const rightOverflow = overlayRect.right + offsetX - viewportSize.width + (isRtl ? 0 : paddingWidth);

            // If the element overflows on either side, reduce the offset to allow it to fit.
            if (leftOverflow > 0) {
                offsetX += leftOverflow + SELECT_PANEL_VIEWPORT_PADDING;
            } else if (rightOverflow > 0) {
                offsetX -= rightOverflow + SELECT_PANEL_VIEWPORT_PADDING;
            }

            // Set the offset directly in order to avoid having to go through change detection and
            // potentially triggering "changed after it was checked" errors. Round the value to avoid
            // blurry content in some browsers.
            this.overlayDir.offsetX = Math.round(offsetX);
            this.overlayDir.overlayRef.updatePosition();
        }

        /**
         * Checks that the attempted overlay position will fit within the viewport.
         * If it will not fit, tries to adjust the scroll position and the associated
         * y-offset so the panel can open fully on-screen. If it still won't fit,
         * sets the offset back to 0 to allow the fallback position to take over.
         *
         *  @hidden
         */
        private _checkOverlayWithinViewport(maxScroll: number): void {
            const itemHeight = this._getItemHeight();
            const viewportSize = this.viewportRuler.getViewportSize();

            const topSpaceAvailable = this.triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
            const bottomSpaceAvailable = viewportSize.height - this.triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;

            const panelHeightTop = Math.abs(this.offsetY);
            const totalPanelHeight = Math.min(this._getItemCount() * itemHeight, this.calculatedMaxHeight);
            const panelHeightBottom = totalPanelHeight - panelHeightTop - this.triggerRect.height;

            if (panelHeightBottom > bottomSpaceAvailable) {
                this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
            } else if (panelHeightTop > topSpaceAvailable) {
                this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
            } else {
                this._transformOrigin = this._getOriginBasedOnOption();
            }
        }

        /** @hidden */
        private _adjustPanelUp(panelHeightBottom: number, bottomSpaceAvailable: number): void {
            // Browsers ignore fractional scroll offsets, so we need to round.
            const distanceBelowViewport = Math.round(panelHeightBottom - bottomSpaceAvailable);

            // Scrolls the panel up by the distance it was extending past the boundary, then
            // adjusts the offset by that amount to move the panel up into the viewport.
            this._scrollTop -= distanceBelowViewport;
            this.offsetY -= distanceBelowViewport;
            this._transformOrigin = this._getOriginBasedOnOption();

            // If the panel is scrolled to the very top, it won't be able to fit the panel
            // by scrolling, so set the offset to 0 to allow the fallback position to take
            // effect.
            if (this._scrollTop <= 0) {
                this._scrollTop = 0;
                this.offsetY = 0;
                this._transformOrigin = `50% bottom 0px`;
            }
        }

        /** @hidden */
        private _adjustPanelDown(panelHeightTop: number, topSpaceAvailable: number, maxScroll: number): void {
            // Browsers ignore fractional scroll offsets, so we need to round.
            const distanceAboveViewport = Math.round(panelHeightTop - topSpaceAvailable);

            // Scrolls the panel down by the distance it was extending past the boundary, then
            // adjusts the offset by that amount to move the panel down into the viewport.
            this._scrollTop += distanceAboveViewport;
            this.offsetY += distanceAboveViewport;
            this._transformOrigin = this._getOriginBasedOnOption();

            // If the panel is scrolled to the very bottom, it won't be able to fit the
            // panel by scrolling, so set the offset to 0 to allow the fallback position
            // to take effect.
            if (this._scrollTop >= maxScroll) {
                this._scrollTop = maxScroll;
                this.offsetY = 0;
                this._transformOrigin = `50% top 0px`;
                return;
            }
        }

        /**
         * Sets the transform origin point based on the selected option.
         *
         * @hidden
         */
        private _getOriginBasedOnOption(): string {
            const itemHeight = this._getItemHeight();
            const optionHeightAdjustment = (itemHeight - this.triggerRect.height) / 2;
            const originY = Math.abs(this.offsetY) - optionHeightAdjustment + itemHeight / 2;
            return `50% ${originY}px 0px`;
        }

        /** @hidden */
        private _highlightCorrectOption(): void {
            if (this.keyManager) {
                if (this.empty) {
                    this.keyManager.setFirstItemActive();
                } else {
                    this.keyManager.setActiveItem(this.selected);
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
            const manager = this.keyManager;

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
            const manager = this.keyManager;
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
                manager.activeItem.selectViaInteraction();
            } else {
                manager.onKeydown(event);
            }
        }

        /**
         * In order to calculate overlay position as well as to be able scroll to the element we need
         * to know proper height of the option panel when maxHeight binding is used. We cannot use this
         * property directly as it can come in different units, but instead we asked optionPanel what is the set
         * height if any.
         *
         *
         * @hidden
         */
        private updateMaxHeight(): void {
            if (this.maxHeight && this.optionPanel) {
                this._maxHeight = this.optionPanel.nativeElement.offsetHeight;
            }
        }

        /**
         * @hidden
         */
        private _headerElements(): NodeListOf<Element> {
            return this.optionPanel.nativeElement.querySelectorAll(SELECT_HEADER_IDENTIFIER);
        }
    };

    
}
