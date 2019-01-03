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
    disabled: boolean;

    @Input()
    placeholder: string;

    @Input()
    inShellbar: boolean = false;

    @Output()
    popoverClosed: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    searchFunction: Function;

    @Input()
    compact: boolean = false;

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
        }
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
            input = input.toLowerCase();
            return value.filter((result: any) => {
                return result.text.toLowerCase().startsWith(input);
            });
        }
        return value;
    }
}
