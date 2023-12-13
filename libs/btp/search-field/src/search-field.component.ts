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
    standalone: true,
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

    /** @ignore */
    @ViewChild('searchInputField')
    protected _searchInputField?: ElementRef<HTMLInputElement>;

    /** @ignore */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** Value of the input field. */
    protected _value?: string;

    /**
     * Whether the search field is focused
     * @ignore */
    protected _inputFocused = signal(false);

    /** @ignore */
    private _cvaControl: CvaControl<string> = inject(CvaControl);

    /** @ignore */
    private _destroyRef = inject(DestroyRef);

    /** @ignore */
    focus(): void {
        this._searchInputField?.nativeElement.focus();
    }
    /** @ignore */
    ngAfterViewInit(): void {
        this._cvaControl.listenToChanges();
        (this._cvaControl.cvaDirective?.ngControl?.valueChanges || of(undefined))
            .pipe(
                tap((value: string) => (this._value = value)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /** @ignore */
    protected updateValue($event: string): void {
        this._value = $event;
        this._cvaControl.cvaDirective?.setValue($event);
    }

    /** @ignore */
    protected _search(): void {
        this.search.emit(this._value);
    }
}
