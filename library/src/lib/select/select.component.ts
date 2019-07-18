import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter, forwardRef, HostBinding, HostListener,
    Input, OnChanges, OnDestroy,
    OnInit,
    Output,
    QueryList, SimpleChanges, TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

// TODO allow picking options that have the same value, maybe by comparing value & index? Assign an id?
// TODO add popover options
// TODO Add onTouched properly, fix form behaviour generally
// TODO add min-width option for popover instead of strict width
// TODO Support disabled options, keyboard nav of options etc
@Component({
    selector: 'fd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    host: {
        '[class.fd-select-custom]': 'true',
        'role': 'listbox',
    }
})
export class SelectComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor {

    @HostBinding('class.fd-dropdown')
    fdDropdownClass: boolean = true;

    @ContentChildren(OptionComponent, { descendants: true })
    options: QueryList<OptionComponent>;

    @Input()
    disabled: boolean = false;

    @Input()
    placeholder: string;

    @Input()
    isOpen: boolean = false;

    @Input()
    value: any;

    @Input()
    triggerTemplate: TemplateRef<any>;

    @Output()
    readonly isOpenChange: EventEmitter<boolean>
        = new EventEmitter<boolean>();

    @Output()
    readonly valueChange: EventEmitter<any>
        = new EventEmitter<any>();

    private selected: OptionComponent;

    private readonly destroy$ = new Subject<void>();

    private readonly optionsStatusChanges: Observable<OptionComponent> = defer(() => {
        const options = this.options;
        if (options) {
            return options.changes.pipe(
                startWith(options),
                switchMap(() => merge(...options.map(option => option.selectedChange)))
            );
        }
    }) as Observable<OptionComponent>;

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            setTimeout(() => {
                if (this.value) {
                    this.selectValue(this.value, false);
                }
            });
        }
    }

    ngAfterContentInit(): void {
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
            this.resetOptions();
            this.initSelection();
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    toggle(): void {
        if (this.isOpen && !this.disabled) {
            this.close();
        } else {
            this.open();
        }
    }

    open(): void {
        if (!this.isOpen && !this.disabled) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    close(): void {
        if (this.isOpen && !this.disabled) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: any): void {
        if (this.options) {
            this.selectValue(value, false);
        } else {
            // Defer the selection of the value to support forms
            Promise.resolve().then(() => {
                if (this.options) {
                    this.selectValue(value, false);
                }
            });
        }
    }

    get triggerValue(): string {
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        switch (event.code) {
            case ('ArrowUp'): {
                event.preventDefault();
                this.decrementFocused();
                break;
            }
            case ('ArrowDown'): {
                event.preventDefault();
                this.incrementFocused();
                break;
            }
        }
    }

    private selectOption(option: OptionComponent, fireEvents: boolean = true): OptionComponent | undefined {
        if (!this.isOptionActive(option)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            option.setSelected(true, false);
            this.selected = option;
            this.updateValue(fireEvents);
            this.close();
            return option;
        }
        return;
    }

    private selectValue(value: any, fireEvents: boolean = true): OptionComponent | undefined {
        const matchOption = this.options.find((option: OptionComponent) => {
            return option.value != null && option.value === value;
        });

        // If not match is found, set everything to null
        // This is mostly only for cases where a user removes an active option
        if (!matchOption) {
            this.unselectOptions();
            return;
        }

        // If match is found, select the new value
        if (matchOption && !this.isOptionActive(matchOption)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            matchOption.setSelected(true, false);
            this.selected = matchOption;

            this.updateValue(fireEvents);
            this.close();
        }

        return matchOption;
    }

    private updateValue(fireEvents: boolean = true): void {
        this.value = this.selected.value;
        if (fireEvents) {
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    }

    private resetOptions(): void {
        const destroyCurrentObs = merge(this.options.changes, this.destroy$);
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((instance: OptionComponent) => {
            this.selectOption(instance);
        });
    }

    /** Selection initialization when a change occurs in options. */
    private initSelection(): void {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value, false);
        }
    }

    private isOptionActive(option: OptionComponent): boolean {
        return option && this.selected && option === this.selected;
    }

    /** Method that focuses the next option in the list, or the first one if the last one is currently focused. */
    private incrementFocused(): void {

        // Get active focused element
        const activeElement = document.activeElement;

        // Get corresponding option element to the above
        const correspondingOption = this.options.find(option => {
            return option.getHtmlElement() === activeElement;
        });

        if (correspondingOption) {
            const arrayOptions = this.options.toArray();
            const index = arrayOptions.indexOf(correspondingOption);

            // If active option is the last option, focus the first one
            // Otherwise, focus the next option.
            if (index === this.options.length - 1) {
                arrayOptions[0].focus();
            } else {
                arrayOptions[index + 1].focus();
            }
        } else if (this.options) {
            this.options.first.focus();
        }
    }

    /** Method that focuses the previous option in the list, or the last one if the last one is currently focused. */
    private decrementFocused(): void {

        // Get active focused element
        const activeElement = document.activeElement;

        // Get corresponding option element to the above
        const correspondingOption = this.options.find(option => {
            return option.getHtmlElement() === activeElement;
        });

        // If active option is the first option, focus the last one
        // Otherwise, focus the previous option.
        if (correspondingOption) {
            const arrayOptions = this.options.toArray();
            const index = arrayOptions.indexOf(correspondingOption);

            if (index === 0) {
                arrayOptions[this.options.length - 1].focus();
            } else {
                arrayOptions[index - 1].focus();
            }
        } else if (this.options) {
            this.options.first.focus();
        }
    }

    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     */
    private unselectOptions(): void {
        setTimeout(() => {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            this.selected = undefined;
            this.value = undefined;
            this.valueChange.emit(undefined);
            this.onChange(undefined);
        });
    }

}
