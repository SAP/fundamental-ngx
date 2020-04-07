import {
    Component,
    ChangeDetectorRef,
    EventEmitter,
    Input,
    Output,
    Optional,
    Self,
    ViewChild,
    TemplateRef,
    ChangeDetectionStrategy,
} from '@angular/core';
import { RadioButtonComponent as CoreRadioButtonComponent, stateType } from '@fundamental-ngx/core';
import { NgControl, NgForm } from '@angular/forms';
import { BaseInput } from '../../base.input';
import { Status } from '../../form-control';

let uniqueId = 0;

@Component({
    selector: 'fdp-radio-button',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent extends BaseInput {
    /**
     * Type of Radio buttons. valid | error | warning | default |information
     * currently supported only error with BaseInput
     */
    @Input()
    get state(): Status | stateType {
        return this._state;
    }
    set state(newState: Status | stateType) {
        this._state = newState ? newState : 'default';
        this._cd.markForCheck();
    }

    @Input()
    get value(): any {
        return this._value;
    }
    set value(newValue: any) {
        if (this._value !== newValue) {
            super.setValue(newValue);
            this._value = newValue;
        }
    }

    /** @hidden
     * used for radio button creation if list value present
     */
    @Input()
    forceRender: boolean = false;

    /** click event to emit */
    @Output()
    readonly click: EventEmitter<RadioButtonComponent> = new EventEmitter();

    /** Access radio button child elemen passed as content of radio button group*/
    @ViewChild(CoreRadioButtonComponent, { static: false })
    private coreRadioButton: CoreRadioButtonComponent;

    /** reference of template */
    @ViewChild('renderer')
    renderer: TemplateRef<any>;

    private _state: Status | stateType = 'default';

    constructor(
        protected _cd: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_cd, ngControl, ngForm);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // @hidden have to set default initial values as base class has check and throws error
        this.id = `radio-id-${uniqueId++}`;
        this.name = `radio-id-${uniqueId++}`;
    }

    /** @hidden change formcontrol value, emits the event*/
    onClick(event: KeyboardEvent | MouseEvent) {
        event.stopPropagation();
        if (!this.disabled) {
            if (this._value !== undefined) {
                this.onChange(this._value);
                this.click.emit(this);
            }
        }
    }

    /**
     * checked status of radio button
     */
    ischecked(): boolean {
        if (this.coreRadioButton && this.coreRadioButton.elementRef()) {
            return this.coreRadioButton.elementRef().nativeElement.checked;
        }
        return false;
    }

    /** @hidden method to select radio button */
    select() {
        if (this.coreRadioButton && this.coreRadioButton.inputElement) {
            this.coreRadioButton.elementRef().nativeElement.checked = true;
            this._cd.detectChanges();
        }
    }

    /** @hidden method to uncheck radio button */
    unselect() {
        if (this.coreRadioButton && this.coreRadioButton.inputElement) {
            this.coreRadioButton.elementRef().nativeElement.checked = false;
            this._cd.detectChanges();
        }
    }
}
