import { FocusableOption } from '@angular/cdk/a11y';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgTemplateOutlet } from '@angular/common';
import { RadioButtonComponent as CoreRadioButtonComponent } from '@fundamental-ngx/core/radio';
import { BaseInput } from '@fundamental-ngx/platform/shared';

let uniqueId = 0;

@Component({
    selector: 'fdp-radio-button',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CoreRadioButtonComponent, FormsModule, NgTemplateOutlet]
})
export class RadioButtonComponent extends BaseInput implements AfterViewInit, FocusableOption {
    /** sets radio button tooltip */
    @Input()
    title: string;

    /**
     * Includes the Radio in the page tab sequence.
     */
    @Input()
    tabIndex = -1;

    /** value for Radio button */
    @Input()
    set value(newValue: any) {
        this._value = newValue;
    }
    get value(): any {
        return super.getValue();
    }

    /** used for radio button creation if list value present */
    @Input()
    forceRender = false;

    /** reference of template */
    @ViewChild('renderer')
    renderer: TemplateRef<any>;

    /** click event to emit */
    @Output()
    readonly checked: EventEmitter<RadioButtonComponent> = new EventEmitter();

    /** Access radio button child element passed as content of radio button group */
    @ViewChild(CoreRadioButtonComponent, { static: false })
    private coreRadioButton: CoreRadioButtonComponent;

    /** @hidden */
    _currentValue: any;

    /** @hidden Radio checked status */
    _isChecked = false;

    /** @hidden */
    constructor() {
        super();

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
        // @hidden have to set default initial values as base class has check and throws error
        this.id = `fdp-radio-id-${uniqueId}`;
        this.name = `fdp-radio-name-${uniqueId}`;
        uniqueId++;
    }

    /** @hidden Controlvalue accessor */
    writeValue(value: any): void {
        this._valueChange(value);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden */
    _valueChange(value: any, emitEvent = false): void {
        if (this.disabled) {
            emitEvent = false;
        }

        this._currentValue = value;
        this._isChecked = this._currentValue === super.getValue();
        if (this._isChecked && emitEvent) {
            this.checked.emit(this);
        }
        this.tabIndex = this._isChecked ? 0 : -1;
        this.detectChanges();
        if (emitEvent) {
            this.onChange(value);
            this.onTouched();
        }
    }

    /** method for cdk FocusKeymanager */
    focus(): void {
        this.coreRadioButton?.inputElement.nativeElement.focus();
    }

    /** method to select radio button */
    select(): void {
        this._valueChange(super.getValue());
    }

    /** method to uncheck radio button */
    unselect(): void {
        this._valueChange(undefined);
    }

    /** Setting tabIndex for radio accessibility */
    setTabIndex(index: 0 | -1): void {
        this.tabIndex = index;
        this.markForCheck();
    }
}
