import {
    AfterContentInit,
    Component,
    ContentChildren,
    EventEmitter, HostBinding,
    Input, OnChanges, OnDestroy,
    OnInit,
    Output,
    QueryList, SimpleChanges,
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
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-select-custom]': 'true'
    }
})
export class SelectComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor {

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

    ngOnChanges(changes: SimpleChanges): void {
        // TODO implement for when value changes programatically
        if (changes.value) {
            setTimeout(() => {
                console.log('changea value programmatically')
                this.select();
            });
        }
    }

    ngAfterContentInit(): void {
        this.options.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
            console.log(this.options.changes);
            this.resetOptions();
            this.initSelection();
            console.log('ContentChild subscribe');
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
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }

    private selectValue(value: any): OptionComponent | undefined {
        console.log(value);
        const matchOption = this.options.find((option: OptionComponent) => {

            // Todo implement custom comparator
            return option.value != null && option.value === value;
        });

        if (matchOption && !this.isOptionActive(matchOption)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            console.log('new option selected')
            matchOption.setSelected(true, false);
            this.selected = matchOption;

            // TODO Maybe put in separate method
            this.value = this.selected.value;
            this.valueChange.emit(this.value);
        }

        return matchOption;
    }

    private resetOptions(): void {
        const destroyCurrentObs = merge(this.options.changes, this._destroy);
        this.optionsChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((instance: OptionComponent) => {
            console.log('optionsChange subscribe');
            this.selectValue(instance.value);
        });
    }

    private initSelection(): void {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value);
        }
    }

    private select(): void {
        if (this.value) {
            this.selectValue(this.value);
        }
    }

    private isOptionActive(option: OptionComponent): boolean {
        if (option) {
            // Todo implement custom comparator
            return this.selected && this.selected.value === option.value && option.value === this.value;
        }
        return false;
    }

}
