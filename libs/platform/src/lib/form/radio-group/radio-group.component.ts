import {
    AfterContentChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Host,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
    FormField,
    FormFieldControl,
    InLineLayoutCollectionBaseInput,
    RESPONSIVE_BREAKPOINTS_CONFIG,
    ResponsiveBreakPointConfig,
    ResponsiveBreakpointsService
} from '@fundamental-ngx/platform/shared';
import { RadioButtonComponent } from './radio/radio.component';

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
export class RadioGroupComponent
    extends InLineLayoutCollectionBaseInput
    implements AfterViewInit, AfterContentChecked, OnDestroy
{
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
    get isInline(): boolean {
        return this._isInline;
    }

    set isInline(inline: boolean) {
        this._isInline = inline;
        this._cd.markForCheck();
    }

    /** @hidden */
    private _isInline: boolean;

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

    /** @hidden */
    private _activeItemSet = false;

    /** The currently selected radio button. Should match value. */
    private _selected: RadioButtonComponent | null = null;

    private destroy$ = new Subject<boolean>();

    // FocusKeyManager instance
    private keyboardEventsManager: FocusKeyManager<RadioButtonComponent>;

    constructor(
        protected _cd: ChangeDetectorRef,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig: ResponsiveBreakPointConfig
    ) {
        super(
            _cd,
            _responsiveBreakpointsService,
            ngControl,
            ngForm,
            formField,
            formControl,
            _defaultResponsiveBreakPointConfig
        );
        this.id = `radio-group-${nextUniqueId++}`;

        // subscribe to _inlineCurrentValue in inline-layout-collection-base-input
        this._inlineCurrentValue
            .pipe(distinctUntilChanged())
            .subscribe((currentInline) => (this.isInline = currentInline));
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
        this.contentRadioButtons.forEach((button) => (button.stateType = this.status));
        this._cd.markForCheck();
    }

    /**
     * Initialize properties once fd-radio-buttons are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterViewInit(): void {
        setTimeout(() => {
            this._initialSetup(this.contentRadioButtons);
            this._initialSetup(this.viewRadioButtons);
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
            // sets Active item. so arrow key starts after the active item.
            // Need to do only once, when one radio is already selected
            if (this._selected && !this._activeItemSet) {
                this.keyboardEventsManager.setActiveItem(this._selected);
                this._activeItemSet = true;
            }
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

    private _initialSetup(radioButtons: QueryList<RadioButtonComponent>): void {
        if (radioButtons && radioButtons.length > 0) {
            let firstEnabledButtonIndex = -1;
            this.keyboardEventsManager = new FocusKeyManager(radioButtons).withWrap().withHorizontalOrientation('ltr');

            radioButtons.forEach((button, i) => {
                if (this.list) {
                    button.stateType = this.status;
                } else {
                    this._setProperties(button);
                }
                this._selectUnselect(button);

                // finding first enabled button to set tabIndex=0
                if (!button.disabled && !this._disabled && firstEnabledButtonIndex < 0) {
                    firstEnabledButtonIndex = i;
                }
                button.checked.pipe(takeUntil(this.destroy$)).subscribe((ev) => this._selectedValueChanged(ev));
            });
            // accessibility requirement
            if (!this._selected && radioButtons && firstEnabledButtonIndex > -1) {
                radioButtons.toArray()[firstEnabledButtonIndex].setTabIndex(0);
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
            }
        }
    }

    /** Called every time a radio button is clicked, In content child as well as viewchild */
    private _selectedValueChanged(button: RadioButtonComponent): void {
        this.onTouched();
        if (this._selected !== button) {
            this.resetTabIndex(button);
            if (this._selected) {
                this._selected.unselect();
            }
            this._selected = button;
            button.select();
        }
        this.value = button.value;
        this.change.emit(button);
        this.onChange(this.value);
    }

    /** resets tabIndex for first radio in radio group. for accessibility tabIndex was set */
    private resetTabIndex(selectedRadio: RadioButtonComponent): void {
        if (this.viewRadioButtons || this.contentRadioButtons) {
            const radios = this.viewRadioButtons.length ? this.viewRadioButtons : this.contentRadioButtons;
            radios.forEach((radio) => {
                if (radio !== selectedRadio && radio.tabIndex === 0) {
                    radio.tabIndex = -1;
                }
            });
        }
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
     * Make sure we have expected child.
     */
    private _validateRadioButtons(): boolean {
        return (
            this.contentRadioButtons.filter((item) => !(item instanceof RadioButtonComponent || item['renderer']))
                .length === 0
        );
    }
}
