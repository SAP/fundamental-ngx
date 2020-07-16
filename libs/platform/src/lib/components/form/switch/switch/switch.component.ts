import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  Optional,
  Output,
  Self,
  ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { FormFieldControl } from '../../form-control';
import { SwitchChangeEvent } from '../models';
import { BaseInput } from '../../base.input';

@Component({
  selector: 'fdp-switch',
  templateUrl: './switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: FormFieldControl, useExisting: SwitchComponent, multi: true }]
})
export class SwitchComponent extends BaseInput {
  /** aria-label attribute of the inner input element. */
  @Input()
  ariaLabel: string = null;

  /** aria-labelledby attribute of the inner input element. */
  @Input()
  ariaLabelledby: string = null;

  /** Whether the switch is semantic */
  @Input()
  semantic: boolean = false;

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

  /** @hidden
   * tracking switch current value
   */
  switchCurrentValue = false;

  constructor(
    protected _changeDetector: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Self() public ngForm: NgForm,
    private _ngZone: NgZone
  ) {
    super(_changeDetector, ngControl, ngForm);
  }

  /** update controller on switch state change */
  onModelChange(modelValue: boolean): void {
    this._updateModel(modelValue);
    this.onTouched();
    this.stateChanges.next('switch: onModelChange');
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
