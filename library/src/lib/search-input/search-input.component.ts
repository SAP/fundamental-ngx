import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
    Pipe,
    PipeTransform,
    QueryList,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';
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
export class SearchInputComponent implements ControlValueAccessor, OnInit {
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

    @ViewChildren(MenuItemDirective) menuItems: QueryList<MenuItemDirective>;

    @ViewChild('searchInputElement') searchInputElement;

    isOpen: boolean = false;

    inputTextValue: string;

    readonly POPOVER_OPTIONS: PopperOptions = {
        placement: 'bottom-start',
        modifiers: {
            preventOverflow: {
                enabled: false
            },
            hide: {
                enabled: false
            }
        }
    };

    onInputKeydownHandler(event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.itemEl.nativeElement.children[0].focus();
            }
        }
    }

    onInputKeyupHandler() {
        if (this.inputText.length) {
            this.isOpen = true;
        }
    }

    onMenuKeydownHandler(event, term?) {
        if (event.code === 'Enter' && term.callback) {
            term.callback(event);
            this.itemClicked.emit(term);
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            let foundItem = false;
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((item, index) => {
                if (document.activeElement === item.itemEl.nativeElement.children[0] && !foundItem) {
                    if (menuItemsArray[index + 1]) {
                        menuItemsArray[index + 1].itemEl.nativeElement.children[0].focus();
                    }
                    foundItem = true;
                }
            })
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            let foundItem = false;
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((item, index) => {
                if (!foundItem) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        this.searchInputElement.nativeElement.focus();
                        foundItem = true;
                    } else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray[index - 1]) {
                            menuItemsArray[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem = true;
                    }
                }
            });
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
        if (this.inShellbar) {
            this.POPOVER_OPTIONS.modifiers.offset = {
                enabled: true,
                offset: -264
            };
        }
    }

    constructor(private elRef: ElementRef) {}
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
