import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    ViewEncapsulation,
    ViewChildren,
    forwardRef,
    SkipSelf,
    Host
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { RadioButtonComponent } from './radio/radio.component';
import { CollectionBaseInput } from '../collection-base.input';
import { FormFieldControl } from '../form-control';
import { FormField } from '../form-field';


/**
 * Radio group implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-RadioGroup-Technical-Design
 * documents.
 *
 */

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

@Component({
    selector: 'fdp-radio-group',
    templateUrl: './radio-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => RadioGroupComponent), multi: true }]
})
export class RadioGroupComponent extends CollectionBaseInput implements AfterViewInit, AfterContentChecked, OnDestroy {
    /** Value of selected radio button */
    @Input('selected')
    get value(): any {
        return super.getValue();
    }
    set value(newValue: any) {
        super.setValue(newValue);
    }

    /**
     * To Display Radio buttons in a line
     */
    @Input()
    isInline = false;

    /**
     * None value radio button created
     */
    @Input()
    hasNoValue = false;

    /**
     * Label for None value radio button
     */
    @Input()
    noValueLabel = 'None';

    /** Children radio buttons part of Group radio button, passed as content */
    @ContentChildren(RadioButtonComponent)
    contentRadioButtons: QueryList<RadioButtonComponent>;

    /** Children radio buttons part of Group radio button, created from list of values */
    @ViewChildren(RadioButtonComponent)
    viewRadioButtons: QueryList<RadioButtonComponent>;

    /** Selected radio button change event raised */
    @Output()
    change: EventEmitter<RadioButtonComponent> = new EventEmitter<RadioButtonComponent>();

    /** The currently selected radio button. Should match value. */
    private _selected: RadioButtonComponent | null = null;

    private destroy$ = new Subject<boolean>();

    // FocusKeyManager instance
    private keyboardEventsManager: FocusKeyManager<RadioButtonComponent>;

    constructor(
        protected _changeDetector: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(_changeDetector, ngControl, ngForm, formField, formControl);
        this.id = `radio-group-${nextUniqueId++}`;
    }

    /**
     * Control Value Accessor
     */
    writeValue(value: any): void {
        if (value) {
            super.writeValue(value);
        }
    }

    /**
     * Access display value for objects, acts as checkbox label.
     */
    public getDisplayValue(item: any): string {
        return this.displayValue(item);
    }

    /**
     * Access lookup value for objects, acts as checkbox value.
     */
    public getLookupValue(item: any): string {
        return this.lookupValue(item);
    }

    /**
     * Called on button click for view radio button, created from list of values
     * @param event
     */
    public selected(event: RadioButtonComponent): void {
        this._selectedValueChanged(event);
    }

    /**
     * @hidden Selecting default button as provided as input
     */
    ngAfterContentChecked(): void {
        if (!this._validateRadioButtons()) {
            throw new Error('fdp-radio-button-group must contain a fdp-radio-button');
        }
        this.contentRadioButtons.forEach((button) => {
            button.stateType = this.status;
        });
        this._changeDetector.markForCheck();
    }

    /**
     * Initialize properties once fd-radio-buttons are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterViewInit(): void {
        setTimeout(() => {
            this._initContentRadioButtons();
            this._initViewRadioButtons();
        });
        super.ngAfterViewInit();
    }

    /**
     * @hidden
     * Destroys event subscription.
     */
    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    /** @hidden */
    public getListItemDisabledValue(item: RadioGroupComponent['list'][number]): boolean {
        return this.disabled || typeof item === 'string' ? this.disabled : item.disabled;
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    public handleKeydown(event: KeyboardEvent): void {
        event.stopImmediatePropagation();
        if (this.keyboardEventsManager) {
            if (
                event.keyCode === DOWN_ARROW ||
                event.keyCode === UP_ARROW ||
                event.keyCode === LEFT_ARROW ||
                event.keyCode === RIGHT_ARROW
            ) {
                // passing the event to key manager so we get a change fired
                this.keyboardEventsManager.onKeydown(event);
            }
        }
    }

    /**
     * Acess display value for objects, acts as Radio label.
     */
    public getDisplayValue(item: any): string {
        return this.displayValue(item);
    }

    /**
     * Acess lookup value for objects, acts as Radio value.
     */
    public getLookupValue(item: any): string {
        return this.lookupValue(item);
    }

    /**
     * Called on button click for view radio button, created from list of values
     * @param event
     */
    public selected(event: RadioButtonComponent): void {
        this._selectedValueChanged(event);
    }

    /**
     * Initializing all content radio buttons with given properties and
     * subscribing to radio button clicked event
     */
    private _initContentRadioButtons(): void {
        if (this.contentRadioButtons && this.contentRadioButtons.length > 0) {
            let firstEnabledButtonIndex = -1;
            this.keyboardEventsManager = new FocusKeyManager(this.contentRadioButtons)
                .withWrap()
                .withHorizontalOrientation('ltr');

            this.contentRadioButtons.forEach((button, i) => {
                this._setProperties(button);
                this._selectUnselect(button);

                // finding first enabled button to set tabindex=0
                if (!button.disabled && !this._disabled && firstEnabledButtonIndex < 0) {
                    firstEnabledButtonIndex = i;
                }
                button.click.pipe(takeUntil(this.destroy$)).subscribe((ev) => this._selectedValueChanged(ev));
            });
            // accessibility requirement
            if (!this._selected && this.contentRadioButtons && firstEnabledButtonIndex > -1) {
                this.contentRadioButtons.toArray()[firstEnabledButtonIndex].setTabIndex(0);
            }
            this.onChange(this.value);
        }
    }

    /**
     * Select radio button with provided value
     */
    private _initViewRadioButtons(): void {
        if (this.viewRadioButtons && this.viewRadioButtons.length > 0) {
            let firstEnabledButtonIndex = -1;
            this.keyboardEventsManager = new FocusKeyManager(this.viewRadioButtons)
                .withWrap()
                .withHorizontalOrientation('ltr');

            this.viewRadioButtons.forEach((button, i) => {
                button.stateType = this.status;
                this._selectUnselect(button);

                // finding first enabled button to set tabindex=0
                if (!button.disabled && !this._disabled && firstEnabledButtonIndex < 0) {
                    firstEnabledButtonIndex = i;
                }
            });
            // accessibility requirement
            if (!this._selected && this.viewRadioButtons && firstEnabledButtonIndex > -1) {
                this.viewRadioButtons.toArray()[firstEnabledButtonIndex].setTabIndex(0);
            }
            this.onChange(this.value);
        }
    }

    /**
     * Selects given button, if value matches
     * @param button
     */
    private _selectUnselect(button: RadioButtonComponent): void {
        if (button.value === this.value) {
            // selected button
            if (this._selected !== button) {
                this._selected = button;
            }
            if (!button.isChecked) {
                button.select();
                if (this.keyboardEventsManager) {
                    this.keyboardEventsManager.setActiveItem(button);
                }
            }
        }
    }

    /** Called every time a radio button is clicked, In content child as well as viewchild */
    private _selectedValueChanged(button: RadioButtonComponent): void {
        this.onTouched();
        if (this._selected !== button) {
            if (this._selected) {
                this._selected.unselect();
            }
            if (this.keyboardEventsManager) {
                this.keyboardEventsManager.setActiveItem(button);
            }
            this._selected = button;
            button.select();
        }
        this.value = button.value;
        this.change.emit(button);
        this.onChange(this.value);
    }

    /**
     *
     * @param button Set initial values, used while content children creation
     */
    private _setProperties(button: RadioButtonComponent): void {
        if (button) {
            button.name = this.name;
            button.contentDensity = this.contentDensity;
            button.stateType = this.status;
            button.disabled = button.disabled ? button.disabled : this._disabled;
        }
    }

    /**
     * Make sure we have expected childs.
     */
    private _validateRadioButtons(): boolean {
        return (
            this.contentRadioButtons.filter((item) => !(item instanceof RadioButtonComponent || item['renderer']))
                .length === 0
        );
    }
}
