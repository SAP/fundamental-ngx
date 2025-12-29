import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    DOCUMENT,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable, TabbableElementService, resizeObservable } from '@fundamental-ngx/cdk/utils';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { debounceTime } from 'rxjs';
import { MessagePopoverEntry, MessagePopoverErrorGroup } from '../../models/message-popover-entry.interface';

@Component({
    selector: 'fdp-message-view',
    templateUrl: './message-view.component.html',
    styleUrl: './message-view-animations.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TabbableElementService],
    imports: [
        NgTemplateOutlet,
        CdkScrollable,
        ScrollbarDirective,
        ListModule,
        ObjectStatusComponent,
        LinkComponent,
        FdTranslatePipe
    ]
})
export class MessageViewComponent implements AfterViewInit, OnDestroy {
    /** Current Message Popover screen. Can be either `list` or `details`. */
    @Input()
    currentScreen: 'list' | 'details';

    /** Filtered errors to render. */
    @Input()
    filteredErrors: MessagePopoverErrorGroup[];

    /** Current error entry. Used for details view. */
    @Input()
    currentEntry: Nullable<MessagePopoverEntry>;

    /** Event emitted when user clicks on error entry containing additional description. */
    @Output()
    openDetails = new EventEmitter<MessagePopoverEntry>();

    /** Event emitted when user clicks on error entry and item's element should be focused. */
    @Output()
    focusItem = new EventEmitter<MessagePopoverEntry>();

    /** Event emitted when user clicks on the field link to focus on the field itself. */
    @Output()
    closePopover = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild('listView', { read: ElementRef })
    protected _listView: ElementRef;

    /** @hidden */
    @ViewChild('detailsView', { read: ElementRef })
    protected _detailsView: ElementRef;

    /** @hidden */
    @ViewChild('listSection', { read: ElementRef })
    protected _listSection: ElementRef;

    /** @hidden */
    @ViewChild('detailsSection', { read: ElementRef })
    protected _detailsSection: ElementRef;

    /** @Hidden */
    @HostBinding('class')
    protected readonly _initialClass = 'fd-message-popover__view-container';

    /** @hidden */
    protected _wasDetails = false;

    /** @hidden */
    private _activeListElement: Nullable<HTMLElement> = null;

    /** @hidden */
    private _listAnimationEndListener?: (event: AnimationEvent) => void;

    /** @hidden */
    constructor(
        private readonly _destroyRef: DestroyRef,
        private readonly _tabbableService: TabbableElementService,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        resizeObservable(this._detailsView.nativeElement)
            .pipe(debounceTime(20), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                const { height } = this._detailsView.nativeElement.getBoundingClientRect();
                this._listView.nativeElement.style.minHeight = `${height}px`;
            });

        this._setupAnimationEndListener();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._removeAnimationEndListener();
    }

    /** @hidden */
    _showDetails(entry: MessagePopoverEntry): void {
        this._activeListElement = this._document.activeElement as HTMLElement;
        if (!entry.description.message) {
            this._focusElement(undefined, entry);
            return;
        }
        this._wasDetails = true;
        this.currentScreen = 'details';
        this.openDetails.emit(entry);
    }

    /** @hidden */
    _focusElement(event?: MouseEvent, item?: MessagePopoverEntry): void {
        if (!item?.element?.nativeElement) {
            return;
        }
        event?.stopImmediatePropagation();
        this.closePopover.emit(false);
        this.focusItem.emit(item);
        setTimeout(() => {
            const tabbableElement = this._tabbableService.getTabbableElement(item.element?.nativeElement);
            tabbableElement?.focus();
        });
    }

    /**
     * @hidden
     * Set up native animationend event listener
     */
    private _setupAnimationEndListener(): void {
        this._listAnimationEndListener = (event: AnimationEvent) => {
            // Only handle list section animations
            if (event.target !== this._listSection.nativeElement) {
                return;
            }

            if (this.currentScreen === 'list' && this._activeListElement) {
                this._activeListElement.focus();
                this._activeListElement = null;
                this._wasDetails = false;
            }
        };

        if (this._listSection?.nativeElement) {
            this._listSection.nativeElement.addEventListener('animationend', this._listAnimationEndListener);
        }
    }

    /**
     * @hidden
     * Remove animation event listener
     */
    private _removeAnimationEndListener(): void {
        if (this._listAnimationEndListener && this._listSection?.nativeElement) {
            this._listSection.nativeElement.removeEventListener('animationend', this._listAnimationEndListener);
        }
    }
}
