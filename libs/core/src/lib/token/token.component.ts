import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ContentDensityService } from '@fundamental-ngx/core/utils';

/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenComponent implements OnInit, AfterViewInit, OnDestroy {
    /** Whether the token is disabled. */
    @Input()
    disabled = false;

    /** Whether the token is compact. */
    @Input()
    compact?: boolean;

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
    onTokenClick = new EventEmitter<MouseEvent>();

    /** Emitted when a there's a keydown registered on the token. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onTokenKeydown = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    totalCount: number;

    constructor(
        public elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._cdRef.markForCheck();
                })
            );
        }
    }

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

    /** @hidden */
    _setTotalCount(count: number): void {
        this.totalCount = count;
        this._cdRef.markForCheck();
    }
}
