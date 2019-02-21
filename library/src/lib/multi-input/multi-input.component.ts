import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-multi-input',
    templateUrl: './multi-input.component.html',
    styleUrls: ['./multi-input.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiInputComponent),
            multi: true
        }
    ]
})
export class MultiInputComponent implements OnInit, ControlValueAccessor {

    @Input()
    placeholder: string = '';

    @Input()
    disabled: boolean = false;

    @Input()
    compact: boolean = false;

    @Input()
    maxHeight: string;

    @Input()
    glyph: string = 'navigation-down-arrow';

    @Input()
    dropdownValues: any[] = [];

    @Input()
    displayWith: string;

    @Input()
    searchTerm: string;

    @Input()
    selected: any[] = [];

    @Input()
    filterFn: Function = this.defaultFilter;

    @Output()
    searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();

    displayedValues: any[] = [];

    isOpen = false;

    init = false;

    onChange: Function = () => {};

    onTouched: Function = () => {};

    constructor(private elRef: ElementRef) {}

    ngOnInit() {
        this.init = true;

        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
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

    writeValue(selected: any[]): void {
        this.selected = selected;
    }

    handleSelect(checked: any, value: any): void {
        if (checked) {
            this.selected.push(value);
        } else {
            this.selected.splice(this.selected.indexOf(value), 1);
        }
        this.onChange(this.selected);
        this.selectedChange.emit(this.selected);
    }

    handleSearchTermChange(): void {
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
    }

    private defaultFilter(contentArray: any[], searchTerm: string): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter(item => {
            if (item[this.displayWith]) {
                return item[this.displayWith].toLocaleLowerCase().includes(searchLower);
            } else {
                return item.toLocaleLowerCase().includes(searchLower);
            }
        });
    }

    @HostListener('document:click', ['$event'])
    clickHandler(event) {
        event.stopPropagation();
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

}
