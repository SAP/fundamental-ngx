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
    @ContentChildren(OptionComponent)
    options: QueryList<OptionComponent>;

    /** @hidden */
    @ViewChild('selectInput', { read: ElementRef })
    selectInput: ElementRef;

    menu: SelectMenuDirective;

    @Input()
    get value(): any {
        return this._internalValue;
    }

    set value(newValue: any) {
        if (newValue !== this._internalValue) {
            this.writeValue(newValue);
            if (this.editable) {
                this._filterItems();
            }
        }
        this.onChange(newValue);
    }

    _selectWidth = 0;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    _optionsListEmpty = false;

    constructor(private _cdRef: ChangeDetectorRef, private _elRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._selectWidth = this._elRef.nativeElement.getBoundingClientRect().width;

        resizeObservable(this._elRef.nativeElement).subscribe(() => {
            this._selectWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        });

        if (!this._internalValue) {
            return;
        }

        const selectedOption = this.options.find((option) => option.value === this._internalValue);

        if (selectedOption) {
            setTimeout(() => {
                selectedOption.selected = true;
            });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
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
        this.value = clickedOption.value;
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
            if (!option.value.toLowerCase().startsWith(this._internalValue.toLowerCase())) {
                option._hide();
            } else {
                visibleOptions++;
                option._show();
                if (!this.opened) {
                    this.opened = true;
                }
            }
            option.selected = option.value.toLowerCase() === this._internalValue.toLowerCase();
        });

        visibleOptions > 0 ? (this._optionsListEmpty = false) : (this._optionsListEmpty = true);
    }
}
