import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { Subject, merge, fromEvent } from 'rxjs';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const isSelectedClass = 'fd-button--toggled';
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
    templateUrl: './segmented-button.component.html',
    styleUrls: ['./segmented-button.component.scss'],
    host: {
        role: 'group',
        '(focusout)': '_focusOut($event)'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SegmentedButtonComponent),
            multi: true
        }
    ]
})
export class SegmentedButtonComponent implements AfterContentInit, ControlValueAccessor {
    /** Whether segmented button is on toggle mode, which allows to toggle more than 1 button */
    @Input()
    toggle = false;

    /** @hidden */
    @HostBinding('class.fd-segmented-button')
    _fdSegmentedButtonClass = true;

    /** @hidden */
    @ContentChildren(ButtonComponent)
    _buttons: QueryList<ButtonComponent>;

    /**
     * Value of segmented button can have 2 types:
     * - string, when there is no toggle mode and only 1 value can be chosen.
     * - array of strings, when there is toggle mode and more than 1 value can be chosen.
     */
    private _currentValue: SegmentedButtonValue;

    /** @hidden */
    private _isDisabled = false;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$ = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange: (value: SegmentedButtonValue) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    constructor(private readonly _changeDetRef: ChangeDetectorRef, private readonly _elementRef: ElementRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenToButtonChanges();
        this._setInitialState();
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
    private _focusOut(event: FocusEvent): void {
        if (!this._elementRef.nativeElement.contains(event.relatedTarget)) {
            this.onTouched();
        }
    }

    /** @hidden */
    private _setInitialState(): void {
        this._toggleDisableButtons(this._isDisabled);
        this._pickButtonsByValues(this._currentValue);
    }

    /** @hidden */
    private _listenToButtonChanges(): void {
        this._buttons.changes.pipe(startWith(1)).subscribe(() => {
            this._onRefresh$.next();
            this._buttons.forEach((button) => this._listenToTriggerEvents(button));
        });
    }

    /** @hidden */
    private _listenToTriggerEvents(buttonComponent: ButtonComponent): void {
        const htmlElement = buttonComponent.elementRef().nativeElement;

        const refresh$ = merge(this._onDestroy$, this._onRefresh$);

        const triggerEvents$ = merge(
            fromEvent(htmlElement, 'click'),
            fromEvent<KeyboardEvent>(htmlElement, 'keydown').pipe(
                filter((event) => KeyUtil.isKeyCode(event, [ENTER, SPACE])),
                tap((event) => event.preventDefault())
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
                this._detectChanges();
            }

            if (this.toggle) {
                this._toggleButton(buttonComponent);
                this._propagateChange();
                this._detectChanges();
            }
        }
    }

    /** @hidden */
    private _propagateChange(): void {
        this.onChange(this._getValuesBySelected());
        this._currentValue = this._getValuesBySelected();
    }

    /** @hidden */
    private _detectChanges(): void {
        this._buttons.forEach((button) => button.detectChanges());
        this._changeDetRef.detectChanges();
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
        const button = buttonComponent.elementRef().nativeElement;
        button.classList.add(isSelectedClass);
        button.setAttribute('aria-pressed', 'true');
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _deselectButton(buttonComponent: ButtonComponent): void {
        const button = buttonComponent.elementRef().nativeElement;
        button.classList.remove(isSelectedClass);
        button.setAttribute('aria-pressed', 'false');
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _isButtonSelected(buttonComponent: ButtonComponent): boolean {
        return buttonComponent.elementRef().nativeElement.classList.contains(isSelectedClass);
    }

    /** @hidden */
    private _isButtonDisabled(buttonComponent: ButtonComponent): boolean {
        return buttonComponent.elementRef().nativeElement.classList.contains(isDisabledClass);
    }

    /** @hidden */
    private _toggleDisableButtons(disable: boolean): void {
        if (!this._buttons) {
            return;
        }

        this._buttons.forEach((button) => (button.disabled = disable));
        if (disable) {
            this._buttons.forEach((button) => button.elementRef().nativeElement.setAttribute('disabled', 'true'));
        }
        this._detectChanges();
    }

    /** @hidden */
    private _getButtonValue(buttonComponent: ButtonComponent): string | null {
        const element = buttonComponent.elementRef().nativeElement;
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
            .filter((button) => this._isButtonSelected(button))
            .map((button) => this._getButtonValue(button));
        if (!this.toggle) {
            return resButtons.length === 1 ? resButtons[0] : null;
        } else {
            return resButtons;
        }
    }
}
