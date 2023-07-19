import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DestroyedService, resizeObservable, TabbableElementService } from '@fundamental-ngx/cdk/utils';
import { debounceTime, takeUntil } from 'rxjs';
import { MessagePopoverEntry, MessagePopoverErrorGroup } from '../../models/message-popover-entry.interface';

@Component({
    selector: 'fdp-message-view',
    templateUrl: './message-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DestroyedService, TabbableElementService],
    animations: [
        trigger('openCloseList', [
            // ...
            state(
                'open',
                style({
                    transform: 'translateX(0)',
                    opacity: 1
                })
            ),
            state(
                'closed',
                style({
                    transform: 'translateX(-50px)',
                    opacity: 0
                })
            ),
            transition('open => closed', [animate('.1s cubic-bezier(0, 0, 0.2, 1)')]),
            transition('closed => open', [animate('0.1s .1s cubic-bezier(0, 0, 0.2, 1)')])
        ]),
        trigger('openCloseDetails', [
            state(
                'open',
                style({
                    transform: 'translateX(0)',
                    opacity: 1,
                    display: 'block'
                })
            ),
            state(
                'closed',
                style({
                    transform: 'translateX(50px)',
                    opacity: 0
                })
            ),
            transition('open => closed', [
                animate(
                    '.1s cubic-bezier(0, 0, 0.2, 1)',
                    keyframes([
                        style({
                            transform: 'translateX(0)',
                            opacity: 1,
                            display: 'block'
                        }),
                        style({
                            transform: 'translateX(50px)',
                            opacity: 0,
                            display: 'none'
                        })
                    ])
                )
            ]),
            transition('closed => open', [
                style({
                    display: 'block'
                }),
                animate('0.1s .1s cubic-bezier(0, 0, 0.2, 1)')
            ])
        ])
    ]
})
export class MessageViewComponent implements AfterViewInit {
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
    private _listView: ElementRef;

    /** @hidden */
    @ViewChild('detailsView', { read: ElementRef })
    private _detailsView: ElementRef;

    /** @Hidden */
    @HostBinding('class')
    private readonly _initialClass = 'fd-message-popover__view-container';

    /** @hidden */
    private _activeListElement: Nullable<HTMLElement> = null;

    /** @hidden */
    constructor(
        private readonly _destroy$: DestroyedService,
        private readonly _tabbableService: TabbableElementService,
        @Inject(DOCUMENT) private readonly _document: Document
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        resizeObservable(this._detailsView.nativeElement)
            .pipe(debounceTime(20), takeUntil(this._destroy$))
            .subscribe(() => {
                const { height } = this._detailsView.nativeElement.getBoundingClientRect();
                this._listView.nativeElement.style.minHeight = `${height}px`;
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

    /** @hidden */
    _onListAnimationComplete(event: any): void {
        if (event.toState === 'open' && this._activeListElement) {
            this._activeListElement.focus();
            this._activeListElement = null;
        }
    }
}
