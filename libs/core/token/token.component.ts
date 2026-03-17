import { ENTER, SPACE } from '@angular/cdk/keycodes';

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    TemplateRef,
    ViewContainerRef,
    ViewEncapsulation,
    computed,
    inject,
    input,
    output,
    signal,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { fromEvent } from 'rxjs';

/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrl: './token.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()],
    host: {
        '[style.max-width.%]': '100'
    },
    imports: [FdTranslatePipe]
})
export class TokenComponent implements AfterViewInit {
    /** @hidden */
    readonly tokenWrapperElement = viewChild<ElementRef>('tokenWrapperElement');

    /** @hidden */
    readonly _content = viewChild<TemplateRef<unknown>>('content');

    /** @hidden */
    readonly _viewContainer = viewChild('viewContainer', { read: ViewContainerRef });

    /** Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onCloseClick = output<MouseEvent | undefined>();

    /** Emitted when token should be removed */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onRemove = output<void>();

    /** Emitted when a token is clicked. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onTokenClick = output<MouseEvent>();

    /** Emitted when a there's a keydown registered on the token. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onTokenKeydown = output<KeyboardEvent>();

    /** Emitted when token element received or lost focus. */
    readonly elementFocused = output<boolean>();

    /** Whether the token is disabled. */
    readonly disabled = input(false);

    /**
     * Whether the token is selected.
     * @hidden Internal signal input - use the `selected` property for programmatic access.
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly _selectedInput = input(false, { alias: 'selected' });

    /** Whether the token is read-only. */
    readonly readOnly = input(false);

    /** @hidden Internal signal for programmatic selected updates (used by tokenizer) */
    readonly _selectedProgrammatic = signal<boolean | null>(null);

    /** @hidden Internal signal for total count (set by tokenizer) */
    readonly _totalCount = signal<number | undefined>(undefined);

    /** @hidden Internal signal for item position (set by tokenizer) */
    readonly _itemPosition = signal<number | undefined>(undefined);

    /** @hidden Effective selected state - combines input and programmatic value */
    readonly _effectiveSelected = computed(() => {
        const programmatic = this._selectedProgrammatic();
        return programmatic !== null ? programmatic : this._selectedInput();
    });

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /**
     * @hidden
     * Programmatically set the selected state.
     * Used by tokenizer to manage token selection.
     */
    set selected(value: boolean) {
        this._selectedProgrammatic.set(value);
    }

    /**
     * Whether the token is selected.
     * Use this property for programmatic access. For template binding, use [selected].
     */
    get selected(): boolean {
        return this._effectiveSelected();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        const viewContainer = this._viewContainer();
        const content = this._content();
        if (viewContainer && content) {
            viewContainer.createEmbeddedView(content);
        }

        const tokenWrapper = this.tokenWrapperElement();
        if (tokenWrapper) {
            fromEvent(tokenWrapper.nativeElement, 'focus')
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    this.elementFocused.emit(true);
                });

            fromEvent(tokenWrapper.nativeElement, 'blur')
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => {
                    this.elementFocused.emit(false);
                });
        }
    }

    /** @hidden */
    closeClickHandler(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
            if (!this.disabled()) {
                this.onCloseClick.emit(event);
            }
        }
    }

    /** @hidden */
    tokenClickHandler(event: MouseEvent): void {
        this.onTokenClick.emit(event);
    }

    /** @hidden */
    tokenKeydownHandler(event: KeyboardEvent): void {
        this.onTokenKeydown.emit(event);
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.onTokenClick.emit(event as unknown as MouseEvent);
        }
    }

    /** @hidden */
    _setTotalCount(count: number, itemPosition: number): void {
        this._totalCount.set(count);
        this._itemPosition.set(itemPosition);
    }
}
