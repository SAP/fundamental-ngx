import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NestedButtonDirective } from '@fundamental-ngx/btp/button';
import { CvaControl, CvaDirective } from '@fundamental-ngx/cdk/forms';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { of, tap } from 'rxjs';

@Component({
    selector: 'fdb-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['../../../../node_modules/fundamental-styles/dist/search-field.css'],
    hostDirectives: [CvaDirective],
    providers: [CvaControl],
    imports: [IconComponent, FormsModule, FdTranslatePipe, ButtonComponent, NestedButtonDirective],
    encapsulation: ViewEncapsulation.None
})
export class SearchFieldComponent implements AfterViewInit, HasElementRef {
    /** Placeholder for the input field. */
    @Input() placeholder: string;

    /** Event emitted when the search button is clicked. */
    @Output() search = new EventEmitter<string>();

    /** @hidden */
    @ViewChild('searchInputField')
    protected _searchInputField?: ElementRef<HTMLInputElement>;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** Value of the input field. */
    protected _value?: string;

    /**
     * Whether the search field is focused
     * @hidden */
    protected _inputFocused = signal(false);

    /** @hidden */
    private _cvaControl: CvaControl<string> = inject(CvaControl);

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    focus(): void {
        this._searchInputField?.nativeElement.focus();
    }
    /** @hidden */
    ngAfterViewInit(): void {
        this._cvaControl.listenToChanges();
        (this._cvaControl.cvaDirective?.ngControl?.valueChanges || of(undefined))
            .pipe(
                tap((value: string) => (this._value = value)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /** @hidden */
    protected updateValue($event: string): void {
        this._value = $event;
        this._cvaControl.cvaDirective?.setValue($event);
    }

    /** @hidden */
    protected _search(): void {
        this.search.emit(this._value);
    }
}
