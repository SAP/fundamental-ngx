import {
    Component,
    OnInit,
    Input,
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ContentChild,
    TemplateRef,
    AfterContentInit,
    Optional,
    SkipSelf,
    Self,
    Host
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';

import { CollectionBaseInput } from '../collection-base.input';
import { FormField } from '../form-field';
import { FormFieldControl } from '../form-control';

@Component({
    selector: 'fdp-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: FormFieldControl,
        useExisting: forwardRef(() => SelectComponent),
        multi: true }]
})
export class SelectComponent extends CollectionBaseInput implements OnInit, AfterContentInit {
    /**
     * Form element ID.
     * Todo: This should be moved to higher class that will be common to all input fields
     */
    @Input()
    id: string;

    /** variable to input any type of object. */
    @Input()
    list: Array<any>;

    @Input()
    glyph: string;

     /** Whether the select is in compact mode. */
     @Input()
     compact = false;

    /**
     * String rendered as first value in the popup which let the user to make 'no selection' from
     * available list of values. When this option is active and use make this selection we save a
     * NULL value
     */
    @Input()
    noSelectionString: string;

    @Input()
    closeOnOutsideClick: boolean;

    @Input()
    controlTemplate: TemplateRef<any>;

    /**
     * custom option popup item template defined by app.
     *
     */
    @ContentChild('optionValue')
    optionValueTemplate: TemplateRef<any>;

    /**
     * Directly sets value to the component that at the ends up at writeValue as well fires
     * change detections
     *
     */
    @Input()
    get value(): any {
        return this._value;
    }

    set value(newValue: any) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.onChange(newValue);
            this.onTouched();
            this.cd.markForCheck();
        }
    }

    /**
     * @internal
     */
     _value: any;

     constructor(
        protected cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngControl, ngForm, formField, formControl);

    }

    onSelection(value: any): void {
        this.value = value;
        this.onChange(this.value);
        this.onTouched();
        this.cd.markForCheck();
    }

    /**
     * Dirty assignment is to disable resetOption logic.
     */
    ngAfterContentInit(): void {
        this['unselectOptions'] = () => {};
    }

    ngOnInit(): void {}

    writeValue(newValue: any): void {
        if (newValue && newValue !== this._value) {
            this._value = newValue;
            this.onChange(this._value);
            this.onTouched();
            this.cd.markForCheck();
        }
    }
}
