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
    Inject,
    Input,
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

const ANIMATION_EASING = 'cubic-bezier(0, 0, 0.2, 1)';
const ANIMATION_DURATION = 100;

@Component({
    selector: 'fdp-message-view',
    templateUrl: './message-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [TabbableElementService],
    host: {
        class: 'fd-message-popover__view-container'
    },
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
export class MessageViewComponent implements AfterViewInit {
    /** Current Message Popover screen. Can be either `list` or `details`. */
    @Input()
    set currentScreen(value: 'list' | 'details') {
        const prev = this._currentScreen;
        this._currentScreen = value;
        if (prev && prev !== value) {
            this._animateScreenTransition(value);
        }
    }
    get currentScreen(): 'list' | 'details' {
        return this._currentScreen;
    }

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

    /** @hidden */
    private _currentScreen: 'list' | 'details' = 'list';

    /** @hidden */
    private _activeListElement: Nullable<HTMLElement> = null;

    /** @hidden */
    private _listAnimation: Animation | null = null;

    /** @hidden */
    private _detailsAnimation: Animation | null = null;

    /** @hidden */
    constructor(
        private readonly _destroyRef: DestroyRef,
        private readonly _tabbableService: TabbableElementService,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {
        this._destroyRef.onDestroy(() => {
            this._listAnimation?.cancel();
            this._listAnimation = null;
            this._detailsAnimation?.cancel();
            this._detailsAnimation = null;
        });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        resizeObservable(this._detailsView.nativeElement)
            .pipe(debounceTime(20), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                const { height } = this._detailsView.nativeElement.getBoundingClientRect();
                this._listSection.nativeElement.style.minHeight = `${height}px`;
            });
    }

    /** @hidden */
    _showDetails(entry: MessagePopoverEntry): void {
        this._activeListElement = this._document.activeElement as HTMLElement;
        if (!entry.description.message) {
            this._focusElement(undefined, entry);
            return;
        }
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

    /** @hidden Animate the transition between list and details screens. */
    private _animateScreenTransition(screen: 'list' | 'details'): void {
        const listEl = this._listSection?.nativeElement;
        const detailsEl = this._detailsSection?.nativeElement;

        if (!listEl || !detailsEl) {
            return;
        }

        this._listAnimation?.cancel();
        this._detailsAnimation?.cancel();

        if (screen === 'details') {
            this._animateListToDetails(listEl, detailsEl);
        } else {
            this._animateDetailsToList(listEl, detailsEl);
        }
    }

    /** @hidden Slide list out left, details in from right. */
    private _animateListToDetails(listEl: HTMLElement, detailsEl: HTMLElement): void {
        if (typeof listEl.animate !== 'function') {
            return;
        }

        this._listAnimation = listEl.animate(
            [
                { transform: 'translateX(0)', opacity: 1 },
                { transform: 'translateX(-50px)', opacity: 0 }
            ],
            { duration: ANIMATION_DURATION, easing: ANIMATION_EASING, fill: 'forwards' }
        );

        this._detailsAnimation = detailsEl.animate(
            [
                { transform: 'translateX(50px)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ],
            { duration: ANIMATION_DURATION, easing: ANIMATION_EASING, fill: 'forwards', delay: ANIMATION_DURATION }
        );

        this._detailsAnimation.finished
            .then(() => {
                this._detailsAnimation = null;
            })
            .catch(() => {
                this._detailsAnimation = null;
            });
    }

    /** @hidden Slide details out right, list in from left. */
    private _animateDetailsToList(listEl: HTMLElement, detailsEl: HTMLElement): void {
        if (typeof listEl.animate !== 'function') {
            return;
        }

        this._detailsAnimation = detailsEl.animate(
            [
                { transform: 'translateX(0)', opacity: 1 },
                { transform: 'translateX(50px)', opacity: 0 }
            ],
            { duration: ANIMATION_DURATION, easing: ANIMATION_EASING, fill: 'forwards' }
        );

        this._listAnimation = listEl.animate(
            [
                { transform: 'translateX(-50px)', opacity: 0 },
                { transform: 'translateX(0)', opacity: 1 }
            ],
            { duration: ANIMATION_DURATION, easing: ANIMATION_EASING, fill: 'forwards', delay: ANIMATION_DURATION }
        );

        this._listAnimation.finished
            .then(() => {
                this._listAnimation = null;
                if (this._activeListElement) {
                    this._activeListElement.focus();
                    this._activeListElement = null;
                }
            })
            .catch(() => {
                this._listAnimation = null;
            });
    }
}
