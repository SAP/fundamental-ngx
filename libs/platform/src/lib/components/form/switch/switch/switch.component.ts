import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    NgZone,
    Optional,
    Output,
    Self
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { ContentDensity, FormFieldControl } from '../../form-control';
import { BaseInput } from '../../base.input';
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

    /**
     * content Density of element. 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = contentDensity === 'compact';
    }

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
    get value(): any {
        return this.getValue();
    }

    set value(selectValue: any) {
        this.setValue(selectValue);
    }

    /** @hidden */
    _contentDensity = this._switchConfig.contentDensity;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    isCompact = this._contentDensity === 'compact';

    /** @hidden
     * tracking switch current value
     */
    switchCurrentValue = false;

    constructor(
        protected _switchConfig: SwitchConfig,
        protected _changeDetector: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        private _ngZone: NgZone
    ) {
        super(_changeDetector, ngControl, ngForm);
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
