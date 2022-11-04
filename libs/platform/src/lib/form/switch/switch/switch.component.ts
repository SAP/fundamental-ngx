import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    Optional,
    Output,
    Self,
    SkipSelf
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { BaseInput, FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';
import { SwitchConfig } from './switch.config';

/** Switch change event instance */
export class SwitchChangeEvent {
    /** The source Switch of the event. */
    source: SwitchComponent;
    /** The new `payload` value of the switch. */
    payload: boolean;
}

@Component({
    selector: 'fdp-switch',
    templateUrl: './switch.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: SwitchComponent, multi: true }]
})
export class SwitchComponent extends BaseInput {
    /** aria-label attribute of the inner input element. */
    @Input()
    ariaLabel = 'Switch input';

    /** aria-labelledby attribute of the inner input element. */
    @Input()
    ariaLabelledby: string | null = null;

    /** Whether the switch is semantic */
    @Input()
    semantic = false;

    /**
     * Event fired when the state of the switch changes.
     * *$event* can be used to retrieve the new state of the switch.
     */
    @Output()
    readonly switchChange: EventEmitter<SwitchChangeEvent> = new EventEmitter<SwitchChangeEvent>();

    /** value for switch control */
    set value(selectValue: any) {
        this.setValue(selectValue);
    }
    get value(): any {
        return this.getValue();
    }

    /** @hidden
     * tracking switch current value
     */
    switchCurrentValue = false;

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl,
        protected _switchConfig: SwitchConfig
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
    }

    /** update controller on switch state change */
    onValueChange(modelValue: boolean): void {
        this._updateModel(modelValue);
        this.onTouched();
        this.stateChanges.next('switch: onValueChange');
    }

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        this.switchCurrentValue = value;
        super.writeValue(value);
    }

    /** @hidden
     * update model
     */
    private _updateModel(modelValue: boolean): void {
        this._emitChangeEvent(modelValue);
    }

    /** @hidden
     * Method to emit change event
     */
    private _emitChangeEvent(modelValue: boolean): void {
        const event = new SwitchChangeEvent();
        event.source = this;
        event.payload = modelValue;

        // setting value, it will call setValue()
        this.value = modelValue;
        this.switchChange.emit(event);
    }
}
