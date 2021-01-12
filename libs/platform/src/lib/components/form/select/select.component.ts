import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    ContentChild,
    TemplateRef,
    AfterContentInit,
    ElementRef,
    NgZone,
    Optional,
    Attribute,
    Self,
    Injector
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Directionality } from '@angular/cdk/bidi';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { DynamicComponentService, SelectComponent as fdSelect, DialogConfig} from '@fundamental-ngx/core';

import { FormFieldControl } from '../form-control';

@Component({
    selector: 'fdp-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: FormFieldControl,
            useExisting: SelectPlatformComponent,
            multi: true
        }
    ],
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

    constructor(
        public viewportRuler: ViewportRuler,
        public elementRef: ElementRef,
        public ngZone: NgZone,
        public cd: ChangeDetectorRef,
        @Optional() public dir: Directionality,
        @Attribute('tabindex') _tabIndex: string,
        @Self() @Optional() public ngControl: NgControl,
        public la: LiveAnnouncer,
        public dialogConfig: DialogConfig,
        @Optional() _dynamicComponentService: DynamicComponentService,
        @Optional() _injector: Injector
    ) {
        super(viewportRuler, elementRef, ngZone, cd,
            dir, _tabIndex, ngControl, la, dialogConfig,
            _dynamicComponentService, _injector);

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        this._tabIndex = parseInt(_tabIndex, 10) || 0;
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
