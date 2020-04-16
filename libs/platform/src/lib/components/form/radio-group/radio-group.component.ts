import {
    EventEmitter,
    Component,
    ContentChildren,
    QueryList,
    Input,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    AfterViewInit,
    Output,
    Self,
    Optional,
    ViewChildren,
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RadioButtonComponent } from './radio/radio.component';
import { CollectionBaseInput } from '../collection-base.input';

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

@Component({
    selector: 'fdp-radio-group',
    templateUrl: './radio-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent extends CollectionBaseInput implements AfterViewInit {
    /** value of selected radio button */
    @Input()
    get value(): any {
        return super.getValue();
    }
    set value(newValue: any) {
        super.setValue(newValue);
    }

    /**
     * To Dispaly Radio buttons in a line
     */
    @Input()
    isInline: boolean = false;

    /**
     * None value radio button created
     */
    @Input()
    hasNoValue: boolean = false;

    /**
     * Label for None value radio button
     */
    @Input()
    noValueLabel: string = 'None';

    /** Children radio buttons part of Group radio button, passed as content */
    @ContentChildren(RadioButtonComponent)
    contentRadioButtons: QueryList<RadioButtonComponent>;

    /** Children radio buttons part of Group radio button, created from list of values */
    @ViewChildren(RadioButtonComponent)
    private viewRadioButtons: QueryList<RadioButtonComponent>;

    /** selected radio button change event raised */
    @Output()
    change: EventEmitter<RadioButtonComponent> = new EventEmitter<RadioButtonComponent>();

    /** The currently selected radio button. Should match value. */
    private _selected: RadioButtonComponent | null = null;

    private destroy$ = new Subject<boolean>();

    constructor(
        protected _changeDetector: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_changeDetector, ngControl, ngForm);
        this.id = `radio-group-${nextUniqueId++}`;
    }

    /**
     * @hidden selecting default button as provided as input
     */
    ngAfterContentChecked(): void {
        if (!this.validateRadioButtons()) {
            throw new Error('fdp-radio-button-group must contain a fdp-radio-button');
        }

        if (this.contentRadioButtons && this.contentRadioButtons.length > 0) {
            this.contentRadioButtons.forEach((button) => {
                this.selectUnselect(button);
                this._changeDetector.detectChanges();
            });
        }
    }

    /**
     * Initialize properties once fd-radio-buttons are available.
     * This allows us to propagate relevant attributes to associated buttons.
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this._initContentRadioButtons();
            this._initViewRadioButtons();
        });
    }

    /**
     * Make sure we have expected childs.
     */
    private validateRadioButtons(): boolean {
        return (
            this.contentRadioButtons.filter((item) => !(item instanceof RadioButtonComponent || item['renderer']))
                .length === 0
        );
    }

    /**
     * select radio button with provided value
     */
    private _initViewRadioButtons() {
        if (this.viewRadioButtons && this.viewRadioButtons.length > 0) {
            this.viewRadioButtons.forEach((button) => {
                button.status = this.status;
                this.selectUnselect(button);
                this.onChange(this._value);
            });
        }
    }

    /**
     * Initializing all content radio buttons with given properties and
     * subscribing to radio button radiobuttonclicked event
     */
    private _initContentRadioButtons() {
        if (this.contentRadioButtons && this.contentRadioButtons.length > 0) {
            this.contentRadioButtons.forEach((button) => {
                this._setProperties(button);
                this.selectUnselect(button);
                this.onChange(this._value);
                button.click.pipe(takeUntil(this.destroy$)).subscribe((ev) => this._selectedValueChanged(ev));
            });
        }
    }

    /**
     * selects given button, if value matches
     * @param button
     */
    private selectUnselect(button: RadioButtonComponent) {
        if (!this._value) {
            button.unselect();
        } else {
            if (button.value === this._value) {
                // selected button
                if (this._selected !== button) {
                    this._selected = button;
                }
                if (!button.ischecked()) {
                    button.select();
                }
            }
        }
    }

    /**
     *
     * @param button set inital values, used while content children creation
     */
    private _setProperties(button: RadioButtonComponent) {
        if (button) {
            button.name = this.name;
            button.size = this.size;
            button.status = this.status;
            button.disabled = button.disabled ? button.disabled : this._disabled;
        }
    }

    /** Called everytime a radio button is clicked, In content child as well as viewchild */
    private _selectedValueChanged(button: RadioButtonComponent) {
        if (this._selected !== button) {
            if (this._selected) {
                this._selected.unselect();
            }
            this._selected = button;
        }
        this._value = button.value;
        this.change.emit(button);
        this.onChange(this._value);
    }

    /**
     * called on button click for view radio button, created from list of values
     * @param event
     */
    selected(event: RadioButtonComponent) {
        this._selectedValueChanged(event);
    }

    /**
     * controlvalue accessor
     */
    writeValue(value: any): void {
        if (value) {
            this._value = value;
            this.onChange(value);
        }
    }

    /**
     * @hidden
     */
    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
