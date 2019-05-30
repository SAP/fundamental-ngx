import {
    AfterContentInit, AfterViewInit, ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter, forwardRef, HostBinding, HostListener,
    Input, OnChanges, OnDestroy,
    OnInit,
    Output,
    QueryList, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

// TODO writeValue is called before options have loaded
// TODO allow picking options that have the same value
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
        '(blur)': 'onTouched()',
        '[class.fd-select-custom]': 'true'
    }
})
export class SelectComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor {

    @HostBinding('class.fd-dropdown')
    fdDropdownClass: boolean = true;

    @ViewChild('customTrigger', { read: ViewContainerRef })
    customTriggerContainer: ViewContainerRef;

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

    private readonly destroy = new Subject<void>();

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

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            setTimeout(() => {
                if (this.value) {
                    this.selectValue(this.value);
                }
            });
        }
    }

    ngAfterViewInit(): void {
        if (this.triggerTemplate) {
            this.customTriggerContainer.clear();
            const context = {
                $implicit: this
            };
            this.customTriggerContainer.createEmbeddedView(this.triggerTemplate, context);
            this.cdRef.detectChanges();
        }
    }

    ngAfterContentInit(): void {
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy)).subscribe(() => {
            this.resetOptions();
            this.initSelection();
        });
    }

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
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
        console.log('write value');
        console.log(value);
        if (this.options) {
            console.log('write value inside');
            this.selectValue(value);
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

    private selectValue(value: any): OptionComponent | undefined {
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

            this.updateValue();
            this.close();
        }

        return matchOption;
    }

    private updateValue(): void {
        this.value = this.selected.value;
        this.valueChange.emit(this.value);
        this.onChange(this.value);
    }

    private resetOptions(): void {
        const destroyCurrentObs = merge(this.options.changes, this.destroy);
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((instance: OptionComponent) => {
            this.selectValue(instance.value);
        });
    }

    /** Selection initialization when a change occurs in options. */
    private initSelection(): void {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value);
        }
    }

    private isOptionActive(option: OptionComponent): boolean {
        if (option) {
            return this.selected && this.selected.value === option.value && option.value === this.value;
        }
        return false;
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
