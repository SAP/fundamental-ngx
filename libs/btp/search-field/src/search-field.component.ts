import { NgIf } from '@angular/common';
import {
    AfterViewInit,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { CvaControl, CvaDirective } from '@fundamental-ngx/cdk/forms';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { of, tap } from 'rxjs';

@Component({
    selector: 'fdb-search-field',
    template: `
        <div class="fd-search-field">
            <fd-icon glyph="search" class="fd-search-field__icon" role="presentation" [ariaHidden]="true"></fd-icon>
            <input
                [placeholder]="placeholder || ('btpSearchField.searchInputPlaceholder' | fdTranslate)"
                type="search"
                aria-label="Search"
                class="fd-search-field__input"
                [ngModel]="_value"
                (ngModelChange)="updateValue($event)"
                (keydown.enter)="_search()"
                #searchInputField
            />
            <div role="presentation" aria-hidden="true" class="fd-search-field__underline"></div>
            <div class="fd-search-field__actions">
                <div class="fd-search-field__action-container" *ngIf="_value">
                    <button
                        class="fd-button fd-button--nested"
                        [attr.aria-label]="'btpSearchField.clearButtonLabel' | fdTranslate"
                        (click)="updateValue(''); searchInputField.focus()"
                    >
                        <i class="sap-icon--decline" role="presentation"></i>
                    </button>
                </div>
                <div class="fd-search-field__action-container">
                    <button
                        (click)="_search()"
                        class="fd-button fd-button--nested"
                        [attr.aria-label]="'btpSearchField.searchButtonLabel' | fdTranslate"
                        [attr.aria-disabled]="!_value"
                        [attr.tabindex]="!_value ? -1 : 0"
                    >
                        <fd-icon glyph="slim-arrow-right" role="presentation"></fd-icon>
                    </button>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['../../../../node_modules/fundamental-styles/dist/search-field.css'],
    standalone: true,
    hostDirectives: [CvaDirective],
    providers: [CvaControl],
    imports: [IconComponent, NgIf, FormsModule, FdTranslatePipe]
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
