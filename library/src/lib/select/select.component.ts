import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter, HostBinding,
    Input, OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

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
export class SelectComponent implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {

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

    private selected: OptionComponent;

    private readonly _destroy = new Subject<void>();

    readonly optionsChanges: Observable<OptionComponent> = defer(() => {
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

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
            this.resetOptions();
            this.initSelection();
        });
    }

    ngOnDestroy(): void {
        this._destroy.next();
        this._destroy.complete();
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
            this.selectValue(value);
        }
    }

    get triggerValue(): string {
        return this.selected.viewValueText || this.placeholder;
    }

    private selectValue(value: any): OptionComponent | undefined {
        const matchOption = this.options.find((option: OptionComponent) => {

            // Todo implement custom comparator
            return option.value != null && option.value === value;
        });

        if (matchOption) {
            this.selected = matchOption;
        }

        return matchOption;
    }

    private resetOptions(): void {

    }

    private initSelection(): void {

    }

}
