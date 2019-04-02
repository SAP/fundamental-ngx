import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef, HostBinding,
    Input, OnChanges,
    OnInit,
    Output,
    Pipe,
    PipeTransform, SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopperOptions } from 'popper.js';

@Component({
    selector: 'fd-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchInputComponent),
            multi: true
        }
    ]
})
export class SearchInputComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input()
    dropdownValues: any[] = [];

    @Input()
    filterFn: Function = this.defaultFilter;

    displayedValues: any[] = [];

    @Input()
    disabled: boolean;

    @Input()
    placeholder: string;

    @Input()
    inShellbar: boolean = false;

    @Input()
    glyph: string = 'search';

    @Input()
    searchFunction: Function;

    @Input()
    compact: boolean = false;

    @Input()
    highlight: boolean = true;

    @Output()
    itemClicked = new EventEmitter<any>();

    isOpen: boolean = false;

    inputTextValue: string;

    @HostBinding('class.fd-search-input')
    searchInputClass = true;

    @HostBinding('class.fd-search-input--closed')
    shellBarClass = this.inShellbar;

    onInputKeypressHandler(event) {
        this.isOpen = true;
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
    }

    onMenuKeypressHandler(event, term) {
        if (event.code === 'Enter' && term.callback) {
            term.callback(event);
            this.itemClicked.emit(term);
        }
    }

    onMenuClickHandler(event, term) {
        if (term.callback) {
            term.callback(event);
        }
        this.itemClicked.emit(term);
    }

    shellbarSearchInputClicked(event) {
        event.stopPropagation();
    }

    onChange: any = () => {};
    onTouched: any = () => {};

    get inputText() {
        return this.inputTextValue;
    }

    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    writeValue(value: any) {
        this.inputTextValue = value;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            } else {
                this.displayedValues =  this.dropdownValues;
            }
        }
    }

    handleSearchTermChange(): void {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    }

    private defaultFilter(contentArray: any[], searchTerm: string): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter(item => {
            if (item) {
                return item.text.toLocaleLowerCase().includes(searchLower);
            }
        });
    }
}
