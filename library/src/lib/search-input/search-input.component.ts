import { Component, EventEmitter, forwardRef, Input, Output, Pipe, PipeTransform } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class SearchInputComponent implements ControlValueAccessor {
    @Input()
    dropdownValues: any[];

    @Input()
    usingCustomFilter: boolean = false;

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

    onInputKeypressHandler(event) {
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
}

@Pipe({
    name: 'fdSearch'
})
export class FdSearchPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLocaleLowerCase();
            return value.filter((result: any) => {
                return result.text.toLocaleLowerCase().startsWith(input);
            });
        }
        return value;
    }
}
