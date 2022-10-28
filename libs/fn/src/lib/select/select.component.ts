import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { OptionComponent } from './option/option.component';
import { KeyUtil, resizeObservable } from '@fundamental-ngx/core/utils';
import { ENTER, ESCAPE, SPACE, TAB } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectMenuDirective } from './select-menu.directive';
import { Select } from './select.interface';
import { FN_SELECT_PROVIDER } from './select.token';
import { SelectionModel } from '@angular/cdk/collections';
/**
 * Select component intended to mimic
 * the behaviour of the native select element.
 */
export type InputState = 'positive' | 'critical' | 'negative' | 'info';

@Component({
    selector: 'fn-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        },
        {
            provide: FN_SELECT_PROVIDER,
            useExisting: SelectComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements AfterContentInit, OnDestroy, ControlValueAccessor, Select {
    /** Whether the select is opened. */
    @Input()
    opened = false;

    /** The select label. */
    @Input()
    label: string;

    /** The select placeholder. */
    @Input()
    placeholder: string;

    /** The state of the input. */
    @Input()
    state?: InputState;

    /** @hidden The select value. */
    private _internalValue: string;

    /** Whether this select is editable. */
    @Input()
    editable = false;

    /** @hidden */
    _inputTextValue = '';

    /** Get the input text of the input. */
    get inputText(): string {
        return this._inputTextValue;
    }

    /** Set the input text of the input. */
    set inputText(value: string) {
        this._inputTextValue = value;
        if (this.editable) {
            this._filterItems();
        }
        this.onChange(value);
    }

    /** @hidden */
    @ContentChildren(OptionComponent)
    options: QueryList<OptionComponent>;

    /** @hidden */
    @ViewChild('selectInput', { read: ElementRef })
    selectInput: ElementRef;

    menu: SelectMenuDirective;

    /** @hidden */
    _selectionModel: SelectionModel<OptionComponent>;

    @Input()
    get value(): any {
        return this._internalValue;
    }

    set value(newValue: any) {
        if (newValue !== this._internalValue) {
            this.writeValue(newValue);
        }
    }

    /** @hidden
     * Returns selected option
     */
    get _selected(): OptionComponent {
        return this._selectionModel.selected[0];
    }

    _selectWidth = 0;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    _optionsListEmpty = false;

    constructor(private _cdRef: ChangeDetectorRef, private _elRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._selectionModel = new SelectionModel<OptionComponent>(false);
        this._selectWidth = this._elRef.nativeElement.getBoundingClientRect().width;

        this._subscriptions.add(
            resizeObservable(this._elRef.nativeElement).subscribe(() => {
                this._selectWidth = this._elRef.nativeElement.getBoundingClientRect().width;
            })
        );

        if (!this._internalValue) {
            return;
        }

        const selectedOption = this.options.find((option) => option.value === this._internalValue);

        if (selectedOption) {
            setTimeout(() => {
                selectedOption.selected = true;
                this._selectionModel.select(selectedOption);
            });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._selectionModel.clear();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [TAB]) && this.opened) {
            event.preventDefault();
            this.hideMenu();
        } else if (this.opened && KeyUtil.isKeyCode(event, ESCAPE)) {
            this.hideMenu();
        } else if (
            !this.opened &&
            document.activeElement === this.selectInput.nativeElement &&
            (KeyUtil.isKeyCode(event, SPACE) || KeyUtil.isKeyCode(event, ENTER))
        ) {
            event.preventDefault();
            this.opened = true;
        }
    }

    /** @hidden */
    @HostListener('document:click', ['$event.target'])
    clickOut(target: ElementRef): void {
        if (!this._elRef.nativeElement.contains(target as any) && this.opened) {
            this.hideMenu();
        }
    }

    /** Function called when the select input is clicked. */
    selectInputClicked(event: MouseEvent | KeyboardEvent): void {
        event.preventDefault();
        this.onTouched();
        this.selectInput.nativeElement.focus();
        this.opened = !this.opened;
    }

    /** Function called when an option is clicked. */
    optionClicked(clickedOption: OptionComponent): void {
        this.options.forEach((option) => {
            option === clickedOption ? (option.selected = true) : (option.selected = false);
        });
        clickedOption && this._selectionModel.select(clickedOption);
        this.value = this._selected.value;
        this.inputText = this._selected.label ? this._selected.label : this._selected._viewValue;
        this.hideMenu();
        this._cdRef.detectChanges();
    }

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden
     *  from ControlValue Accessor
     */
    writeValue(value: any): void {
        this._internalValue = value;
    }

    /**
     * Sets the menu directive.
     */
    setMenu(menu: SelectMenuDirective): void {
        this.menu = menu;
    }

    /**
     * Hides opened menu.
     */
    hideMenu(): void {
        this.opened = false;
        setTimeout(() => {
            this.selectInput.nativeElement.focus();
        });
    }

    /** @hidden */
    private _filterItems(): void {
        let visibleOptions = 0;
        this.options.forEach((option) => {
            const optionLabel = option.label ? option.label : option._viewValue;
            if (optionLabel.toLowerCase().startsWith(this.inputText.toLowerCase())) {
                visibleOptions++;
                option._show();
            } else {
                option._hide();
            }

            option.selected = option.value?.toLowerCase() === this.value?.toLowerCase();
        });
        visibleOptions > 0 ? (this._optionsListEmpty = false) : (this._optionsListEmpty = true);

        if (!this.opened && !this._optionsListEmpty) {
            this.opened = true;
        }
    }
}
