import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter, HostBinding,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { OptionComponent } from './option/option.component';

// TODO
// Custom trigger button (pass an ng-template, inject context)
// Default trigger with default label
// Adding/removing options

@Component({
    selector: 'fd-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit, AfterContentInit, ControlValueAccessor {

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

    @Output()
    readonly isOpenChange: EventEmitter<boolean>
        = new EventEmitter<boolean>();

    @Output()
    readonly valueChange: EventEmitter<any>
        = new EventEmitter<any>();

    onChange: Function = () => {};
    onTouched: Function = () => {};

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        // Need to subscribe to changes of contentchildren for dynamic number of options
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

}
