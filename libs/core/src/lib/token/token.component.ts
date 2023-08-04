import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { KeyUtil, warnOnce } from '@fundamental-ngx/cdk/utils';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [contentDensityObserverProviders()],
    host: {
        '[style.max-width.%]': '100'
    }
})
export class TokenComponent implements AfterViewInit, OnDestroy {
    /** Whether the token is disabled. */
    @Input()
    disabled = false;

    /** @hidden */
    @ViewChild('tokenWrapperElement')
    tokenWrapperElement: ElementRef;

    /** @hidden */
    @ViewChild('content')
    readonly _content: TemplateRef<any>;

    /** @hidden */
    @ViewChild('viewContainer', { read: ViewContainerRef })
    readonly _viewContainer: ViewContainerRef;

    /** Whether the token is selected. */
    @Input()
    set selected(val: boolean) {
        if (this._selected !== val) {
            this._cdRef.markForCheck();
        }
        this._selected = val;
    }

    get selected(): boolean {
        return this._selected;
    }
    /** Whether the token is read-only. */
    @Input()
    readOnly = false;

    /**
     * @deprecated use i18n capabilities instead
     * label for close icon
     */
    @Input()
    set deleteButtonLabel(value: string) {
        warnOnce(
            "Property deleteButtonLabel is deprecated. Use i18n capabilities 'coreToken.deleteButtonLabel' key instead."
        );
        this._deleteButtonLabel = value;
    }

    get deleteButtonLabel(): string {
        return this._deleteButtonLabel;
    }

    /**
     * @deprecated use i18n capabilities instead
     * role description for token
     */
    @Input()
    set ariaRoleDescription(value: string) {
        warnOnce(
            "Property ariaRoleDescription is deprecated. Use i18n capabilities 'coreToken.ariaRoleDescription' key instead."
        );
        this._ariaRoleDescription = value;
    }

    get ariaRoleDescription(): string {
        return this._ariaRoleDescription;
    }

    /** Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onCloseClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    /** Emitted when token should be removed */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onRemove: EventEmitter<void> = new EventEmitter<void>();

    /** Emitted when a token is clicked. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onTokenClick = new EventEmitter<MouseEvent>();

    /** Emitted when a there's a keydown registered on the token. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onTokenKeydown = new EventEmitter<KeyboardEvent>();

    /**
     * Emitted when token element received or lost focus.
     */
    @Output()
    elementFocused = new EventEmitter<boolean>();

    /** @hidden */
    totalCount: number;

    /** @hidden */
    private _deleteButtonLabel: string;

    /** @hidden */
    private _ariaRoleDescription: string;

    /** @hidden */
    private _selected = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewContainer.createEmbeddedView(this._content);

        fromEvent(this.tokenWrapperElement.nativeElement, 'focus')
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.elementFocused.emit(true);
            });

        fromEvent(this.tokenWrapperElement.nativeElement, 'blur')
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.elementFocused.emit(false);
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    closeClickHandler(event?): void {
        if (event) {
            event.stopPropagation();
            if (!this.disabled) {
                this.onCloseClick.emit(event);
            }
        }
    }

    /** @hidden */
    tokenClickHandler(event): void {
        this.onTokenClick.emit(event);
    }

    /** @hidden */
    tokenKeydownHandler(event): void {
        this.onTokenKeydown.emit(event);
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.onTokenClick.emit(event);
        }
    }

    /** @hidden */
    _setTotalCount(count: number): void {
        this.totalCount = count;
    }
}
