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
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * Select component intended to mimic
 * the behaviour of the native select element.
 */
@Component({
    selector: 'fn-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements AfterContentInit, OnDestroy, ControlValueAccessor {
    /** Whether or not the select is opened. */
    @Input()
    opened = false;

    /** The select label. */
    @Input()
    label: string;

    /** The select placeholder. */
    @Input()
    placeholder: string;

    /** @hidden The select value. */
    private _internalValue: string;

    /** Whether or not this select is editable. */
    @Input()
    editable = false;

    /** @hidden */
    @ContentChildren(OptionComponent)
    options: QueryList<OptionComponent>;

    /** @hidden */
    @ViewChild('selectInput', { read: ElementRef })
    selectInput: ElementRef;

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

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    _optionsListEmpty = false;

    constructor(private _cdRef: ChangeDetectorRef, private _elRef: ElementRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.options.forEach((option) => {
            this._subscriptions.add(
                option.optionClicked.subscribe((clickedOption) => {
                    this.optionClicked(clickedOption);
                })
            );
            if (this._internalValue && option.value === this._internalValue) {
                setTimeout(() => {
                    option.selected = true;
                });
            }
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (
            document.activeElement === this.selectInput.nativeElement &&
            (KeyUtil.isKeyCode(event, TAB) || (KeyUtil.isKeyCode(event, DOWN_ARROW) && this.opened))
        ) {
            let foundFirst = false;
            this.options.forEach((option) => {
                if (option.elementRef.nativeElement.style.display !== 'none' && !foundFirst) {
                    foundFirst = true;
                    option._focus();
                }
            });
        } else if (this.opened && KeyUtil.isKeyCode(event, ESCAPE)) {
            this.opened = false;
        } else if (
            !this.opened &&
            document.activeElement === this.selectInput.nativeElement &&
            KeyUtil.isKeyCode(event, SPACE)
        ) {
            event.preventDefault();
            this.opened = true;
        } else if (KeyUtil.isKeyCode(event, ENTER)) {
            const focusedOption = this._getFocusedOption();
            if (focusedOption) {
                this.optionClicked(focusedOption);
            }
        } else if (
            KeyUtil.isKeyCode(event, DOWN_ARROW) ||
            KeyUtil.isKeyCode(event, UP_ARROW) ||
            KeyUtil.isKeyCode(event, TAB)
        ) {
            const focusedOption = this._getFocusedOption();
            if (focusedOption) {
                event.preventDefault();
                const visibleOptions = this.options
                    .toArray()
                    .filter((option) => option.elementRef.nativeElement.style.display !== 'none');
                const focusedIndex = visibleOptions.indexOf(focusedOption);
                let newIndex = focusedIndex;
                if (KeyUtil.isKeyCode(event, DOWN_ARROW) || (KeyUtil.isKeyCode(event, TAB) && !event.shiftKey)) {
                    newIndex = focusedIndex + 1;
                } else if (KeyUtil.isKeyCode(event, UP_ARROW) || (KeyUtil.isKeyCode(event, TAB) && event.shiftKey)) {
                    newIndex = focusedIndex - 1;
                }
                const nextOption = visibleOptions[newIndex];
                if (nextOption) {
                    nextOption._focus();
                }
            }
        }
    }

    /** @hidden */
    @HostListener('document:click', ['$event.target'])
    clickOut(target: ElementRef): void {
        if (!this._elRef.nativeElement.contains(target as any) && this.opened) {
            this.opened = false;
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
        this.opened = false;
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

    /** @hidden */
    private _getFocusedOption(): OptionComponent | undefined {
        return this.options.find((option) => option.elementRef.nativeElement.classList.contains('focus-visible'));
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
