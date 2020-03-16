import {
    Component,
    OnInit,
    Input,
    forwardRef,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ContentChild,
    TemplateRef,
    AfterContentInit
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent, SelectComponent as fdSelect, RtlService } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectPlatformComponent),
            multi: true
        }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPlatformComponent extends fdSelect implements OnInit, AfterContentInit {

    /**
        * Form element ID.
        * Todo: This should be moved to higher class that will be common to all input fields
        */
    @Input()
    id: string;

    /** variable to input any type of object. */
    @Input()
    list: Array<any>;

    /**
     * String rendered as first value in the popup which let the user to make 'no selection' from
     * available list of values. When this option is active and use make this selection we save a
     * NULL value
     */
    @Input()
    noSelectionString: string;

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
            this.valueChange.emit(newValue);
            this.cd.markForCheck();
        }
    }

    /**
     * @internal
     */
    private _value: any;

    constructor(private cd: ChangeDetectorRef, private rtl: RtlService) {
        super(cd, rtl);
        this.fdDropdownClass = false;
    }

    onSelection(event: OptionComponent): void {
        this.value = event.value;
        this.onChange(this.value);
        this.onTouched();
        this.cd.markForCheck();
    }


    /**
     * Dirty assignment is to disable resetOption logic.
     */
    ngAfterContentInit(): void {
        this['unselectOptions'] = () => {
        };
    }

    ngOnInit() {
    }

    writeValue(newValue: any): void {
        if (newValue && newValue !== this._value) {
            this._value = newValue;
            this.onChange(this._value);
            this.onTouched();
            this.cd.markForCheck();
        }
    }

}
