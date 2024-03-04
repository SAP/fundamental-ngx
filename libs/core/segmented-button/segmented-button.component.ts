import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    Host,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    QueryList,
    SimpleChanges,
    ViewEncapsulation,
    booleanAttribute,
    effect,
    forwardRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusableListDirective, KeyUtil, Nullable, RtlService, destroyObservable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';
import { Subject, asyncScheduler, fromEvent, merge } from 'rxjs';
import { filter, observeOn, startWith, takeUntil, tap } from 'rxjs/operators';

export const isDisabledClass = 'is-disabled';

export type SegmentedButtonValue = string | (string | null)[] | null;

/**
 * Container for grouped buttons.
 *
 * ```html
 * <fd-segmented-button [(ngModel)]="value">
 *     <button fd-button value="first">Button</button>
 *     <button fd-button value="second">Button</button>
 *     <button fd-button value="third">Button</button>
 * </fd-segmented-button>
 * ```
 */
@Component({
    selector: 'fd-segmented-button',
    template: `<ng-content></ng-content>`,
    styleUrl: './segmented-button.component.scss',
    host: {
        role: 'listbox',
        '[class.fd-segmented-button]': 'true',
        '[class.fd-segmented-button--vertical]': 'vertical'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SegmentedButtonComponent),
            multi: true
        }
    ],
    standalone: true,
    hostDirectives: [FocusableListDirective]
})
export class SegmentedButtonComponent implements AfterViewInit, ControlValueAccessor, OnDestroy, OnChanges {
    /** Whether segmented button is on toggle mode, which allows to toggle more than 1 button */
    @Input({ transform: booleanAttribute })
    toggle = false;

    /**
     * Whether segmented button is on vertical mode,
     * which allows to display buttons vertically
     **/
    @Input({ transform: booleanAttribute })
    vertical = false;

    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT)
    _buttons: QueryList<ButtonComponent>;

    /**
     * Value of segmented button can have 2 types:
     * - string, when there is no toggle mode and only 1 value can be chosen.
     * - array of strings, when there is toggle mode and more than 1 value can be chosen.
     */
    private _currentValue: SegmentedButtonValue;

    /** @hidden */
    private _isDisabled = false;

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private readonly _changeDetRef: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _destroyRef: DestroyRef,
        @Optional() @Host() private _focusableList: FocusableListDirective,
        @Optional() private _rtlService: RtlService
    ) {
        this._focusableList.navigationDirection = this.vertical ? 'vertical' : 'horizontal';
        effect(() => {
            this._focusableList.contentDirection = this._rtlService?.rtlSignal() ? 'rtl' : 'ltr';
        });
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    private _click(event: MouseEvent): void {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget)) {
            this.onTouched();
        }
    }

    /** @hidden */
    onChange: (value: SegmentedButtonValue) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenToButtonChanges();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.vertical) {
            this._focusableList.navigationDirection = this.vertical ? 'vertical' : 'horizontal';
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onRefresh$.complete();
    }

    /** @hidden */
    writeValue(values: string[] | string): void {
        this._currentValue = values;
        this._pickButtonsByValues(values);
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the SegmentedButtons.
     */
    registerOnChange(fn: (value: SegmentedButtonValue) => void): void {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the SegmentedButtons.
     */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the SegmentedButtons.
     */
    setDisabledState(isDisabled: boolean): void {
        this._isDisabled = isDisabled;
        this._toggleDisableButtons(isDisabled);
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _listenToButtonChanges(): void {
        this._buttons.changes
            .pipe(startWith(1), observeOn(asyncScheduler), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._onRefresh$.next();
                this._toggleDisableButtons(this._isDisabled);
                this._pickButtonsByValues(this._currentValue);
                this._buttons.forEach((button) => {
                    button.elementRef.nativeElement.role = 'option';
                    this._listenToTriggerEvents(button);
                });
            });
    }

    /** @hidden */
    private _listenToTriggerEvents(buttonComponent: ButtonComponent): void {
        const htmlElement = buttonComponent.elementRef.nativeElement;

        const refresh$ = merge(destroyObservable(this._destroyRef), this._onRefresh$);

        const triggerEvents$ = merge(
            fromEvent(htmlElement, 'click'),
            fromEvent<KeyboardEvent>(htmlElement, 'keydown').pipe(
                filter((event) => KeyUtil.isKeyCode(event, [ENTER, SPACE])),
                tap((event) => {
                    event.preventDefault();
                    this.onTouched();
                })
            )
        );

        triggerEvents$.pipe(takeUntil(refresh$)).subscribe(() => this._handleTriggerOnButton(buttonComponent));
    }

    /** @hidden */
    private _handleTriggerOnButton(buttonComponent: ButtonComponent): void {
        if (!this._isButtonDisabled(buttonComponent)) {
            if (!this._isButtonSelected(buttonComponent) && !this.toggle) {
                this._buttons.forEach((button) => this._deselectButton(button));
                this._selectButton(buttonComponent);
                this._propagateChange();
                this._changeDetRef.markForCheck();
            }

            if (this.toggle) {
                this._toggleButton(buttonComponent);
                this._propagateChange();
                this._changeDetRef.markForCheck();
            }
        }
    }

    /** @hidden */
    private _propagateChange(): void {
        this.onChange(this._getValuesBySelected());
        this._currentValue = this._getValuesBySelected();
    }

    /** @hidden */
    private _toggleButton(buttonComponent: ButtonComponent): void {
        if (this._isButtonSelected(buttonComponent)) {
            this._deselectButton(buttonComponent);
        } else {
            this._selectButton(buttonComponent);
        }
    }

    /** @hidden */
    private _pickButtonsByValues(values: SegmentedButtonValue): void {
        if (!this._buttons) {
            return;
        }
        this._buttons.forEach((button) => this._deselectButton(button));
        this._getButtonsByValues(values).forEach((button) => this._selectButton(button));
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _getButtonsByValues(values: SegmentedButtonValue): ButtonComponent[] {
        if (!values) {
            return [];
        }

        if (Array.isArray(values)) {
            return this._buttons.filter((button) => !!values.find((value) => this._getButtonValue(button) === value));
        } else {
            return this._buttons.filter((button) => this._getButtonValue(button) === values);
        }
    }

    /** @hidden */
    private _selectButton(buttonComponent: ButtonComponent): void {
        buttonComponent.toggled = true;
    }

    /** @hidden */
    private _deselectButton(buttonComponent: ButtonComponent): void {
        buttonComponent.toggled = false;
    }

    /** @hidden */
    private _isButtonSelected(buttonComponent: ButtonComponent): Nullable<boolean> {
        return !!buttonComponent.toggled;
    }

    /** @hidden */
    private _isButtonDisabled(buttonComponent: ButtonComponent): boolean {
        return buttonComponent.disabled || buttonComponent.ariaDisabled;
    }

    /** @hidden */
    private _toggleDisableButtons(disable: boolean): void {
        if (!this._buttons) {
            return;
        }

        this._buttons.forEach((button) => (button.disabled = disable));
        if (disable) {
            this._buttons.forEach((button) => button.elementRef.nativeElement.setAttribute('disabled', 'true'));
        }
        this._changeDetRef.markForCheck();
    }

    /** @hidden */
    private _getButtonValue(buttonComponent: ButtonComponent): string | null {
        const element = buttonComponent.elementRef.nativeElement;
        if (element instanceof HTMLButtonElement) {
            return element.value;
        }
        return element.getAttribute('value');
    }

    /** @hidden
     * Returns values depending on selected state of buttons
     */
    private _getValuesBySelected(): SegmentedButtonValue {
        if (!this._buttons) {
            return [];
        }

        const resButtons = this._buttons
            .filter((button) => !!this._isButtonSelected(button))
            .map((button) => this._getButtonValue(button));
        if (!this.toggle) {
            return resButtons.length === 1 ? resButtons[0] : null;
        } else {
            return resButtons;
        }
    }
}
