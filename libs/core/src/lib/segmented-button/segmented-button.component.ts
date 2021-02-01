import {
    AfterContentInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ContentChildren, ElementRef, forwardRef,
    HostBinding, Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';
import { Subject, merge, fromEvent } from 'rxjs';
import { KeyUtil } from '../utils/functions';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const isSelectedClass = 'is-selected';
export const isDisabledClass = 'is-disabled';

/**
 * Container for grouped buttons.
 *
 * ```html
 * <fd-segmented-button>
 *     <button fd-button>Button</button>
 * </fd-segmented-button>
 * ```
 */
@Component({
    selector: 'fd-segmented-button',
    templateUrl: './segmented-button.component.html',
    styleUrls: ['./segmented-button.component.scss'],
    host: {
        role: 'group'
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
})
export class SegmentedButtonComponent implements AfterContentInit, ControlValueAccessor {
    @Input()
    toggle = false;

    /** @hidden */
    @HostBinding('class.fd-segmented-button')
    fdSegmentedButtonClass = true;

    /** @hidden */
    @ContentChildren(ButtonComponent)
    _buttons: QueryList<ButtonComponent>;

    private _currentValue: any;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$ = new Subject<void>();

    /** An RxJS Subject that will kill the data stream upon queryList changes (for unsubscribing)  */
    private readonly _onRefresh$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    constructor(
       private _changeDetRef: ChangeDetectorRef
    ) {}

    ngAfterContentInit(): void {
        this._listenToButtonChanges();
    }

    writeValue(values: string[]): void {
        this._currentValue = values;
        this._pickButtonsByValues(values);
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the SegmentedButtons.
     */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the SegmentedButtons.
     */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the SegmentedButtons.
     */
    setDisabledState(isDisabled: boolean): void {
        this._toggleDisableButtons(isDisabled);
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _listenToButtonChanges(): void {
        this._buttons.changes.pipe(startWith(1))
            .subscribe(_ => {
                this._onRefresh$.next();
                this._buttons.forEach(button => this._listenToTriggerEvents(button))
            })
        ;
    }

    private _listenToTriggerEvents(buttonComponent: ButtonComponent): void {
        const htmlElement = buttonComponent.elementRef().nativeElement;

        const refresh$ = merge(this._onDestroy$, this._onRefresh$);

        const triggerEvents = merge(
            fromEvent(htmlElement, 'click'),
            fromEvent(htmlElement, 'keydown')
                .pipe(
                    filter(event => KeyUtil.isKeyCode(<KeyboardEvent>event, [ENTER, SPACE])),
                    tap(event => (<KeyboardEvent>event).preventDefault())
                )
        )

        triggerEvents.pipe(takeUntil(refresh$)).subscribe(_ => this._handleTriggerOnButton(buttonComponent));
    }

    private _handleTriggerOnButton(buttonComponent: ButtonComponent): void {
        if (!this._isButtonDisabled(buttonComponent)) {

            if (!this._isButtonSelected(buttonComponent) && !this.toggle) {
                this._buttons.forEach(button => this._deselectButton(button));
                this._selectButton(buttonComponent)
            }

            if (this.toggle) {
                this._toggleButton(buttonComponent);
            }

            this.onChange(this._getValuesBySelected());
            this._currentValue = this._getValuesBySelected();
        }
    }

    private _toggleButton(buttonComponent: ButtonComponent): void {
        if (this._isButtonSelected(buttonComponent)) {
            this._deselectButton(buttonComponent);
        } else {
            this._selectButton(buttonComponent);
        }
    }

    private _pickButtonsByValues(values: string[]): void {
        if (!this._buttons) {
            return;
        }
        this._buttons.forEach(button => this._deselectButton(button));
        this._getButtonsByValues(values).forEach(button => this._selectButton(button));
    }

    private _getButtonsByValues(values: string[]): ButtonComponent[] {
        return this._buttons
            .filter(button =>
                !!values.find(value => this._getButtonValue(button) === value)
            );
    }

    private _selectButton(buttonComponent: ButtonComponent): void {
        buttonComponent.elementRef().nativeElement.classList.add(isSelectedClass);
        this._changeDetRef.detectChanges();
    }

    private _deselectButton(buttonComponent: ButtonComponent): void {
        buttonComponent.elementRef().nativeElement.classList.remove(isSelectedClass);
        this._changeDetRef.detectChanges();
    }

    private _isButtonSelected(buttonComponent: ButtonComponent): boolean {
        return buttonComponent.elementRef().nativeElement.classList.contains(isSelectedClass);
    }

    private _isButtonDisabled(buttonComponent: ButtonComponent): boolean {
        return buttonComponent.elementRef().nativeElement.classList.contains(isDisabledClass);
    }

    private _toggleDisableButtons(disable: boolean): void {
        if (disable) {
            this._buttons.forEach(button => button.elementRef().nativeElement.setAttribute('disabled', true));
        } else {
            this._buttons.forEach(button => button.elementRef().nativeElement.removeAttribute('disabled'));
        }
    }

    private _getButtonValue(buttonComponent: ButtonComponent): string {
        return buttonComponent.elementRef().nativeElement.value;
    }

    private _getValuesBySelected(): string[] {
        return this._buttons
            .filter(button => this._isButtonSelected(button))
            .map(button => this._getButtonValue(button))
        ;
    }
}
