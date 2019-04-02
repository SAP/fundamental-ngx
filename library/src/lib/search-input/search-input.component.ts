import {
    Component,
    EventEmitter,
    forwardRef, HostBinding,
    Input,
    Output,
    Pipe,
    PipeTransform
} from '@angular/core';
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

    @Input()
    closeOnSelect: boolean = true;

    @Input()
    fillOnSelect: boolean = true;

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
            this.handleClickActions(term);
            this.itemClicked.emit(term);
        }
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
    private handleClickActions(term): void {
        if (this.closeOnSelect) {
            this.isOpen = false;
        }

        if (this.fillOnSelect) {
            this.inputText = term.text;
        }
    }
}

@Pipe({
    name: 'fdSearch'
})
export class FdSearchPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input && typeof input === 'string') {
            input = input.toLocaleLowerCase();
            return value.filter((result: any) => {
                return result.text.toLocaleLowerCase().startsWith(input);
            });
        }
        return value;
    }
}
