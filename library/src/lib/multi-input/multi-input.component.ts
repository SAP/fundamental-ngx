import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HashService } from '../utils/hash.service';

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
    glyph: string = 'navigation-down-arrow';

    @Input()
    dropdownValues: any[] = [];

    @Input()
    displayWith: string;

    @Input()
    searchTerm: string;

    @Output()
    searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    isOpen = false;

    tokens = [];

    popoverBodyId: string = this.hash.hash();

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor(private hash: HashService, private elRef: ElementRef) {
    }

    ngOnInit() {
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

    writeValue(obj: any): void {
    }

    @HostListener('document:click', ['$event'])
    private clickHandler(event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }

}
