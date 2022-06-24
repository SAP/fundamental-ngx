import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

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
    providers: [contentDensityObserverProviders()]
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

    private _selected = false;

    private _subscriptions = new Subscription();

    /** Whether the token is selected. */
    @Input()
    get selected(): boolean {
        return this._selected;
    }

    set selected(val: boolean) {
        if (this._selected !== val) {
            this._cdRef.markForCheck();
        }
        this._selected = val;
    }

    /** Whether the token is read-only. */
    @Input()
    readOnly = false;

    /** label for close icon */
    @Input()
    deleteButtonLabel = 'Deletable';

    /** role description for token */
    @Input()
    ariaRoleDescription = 'token';

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
    onTokenClick: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    constructor(
        public elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewContainer.createEmbeddedView(this._content);
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
}
