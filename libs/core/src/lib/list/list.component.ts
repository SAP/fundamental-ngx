import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { KeyboardSupportService } from '../utils/services/keyboard-support/keyboard-support.service';
import { KeyUtil } from '../utils/functions/key-util';

/**
 * The directive that represents a list.
 * It is used to display a list of items with simple information such as scopes, names, etc.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-list], [fdList]',
    templateUrl: `./list.component.html`,
    host: {
        class: 'fd-list',
        role: 'list',
        tabindex: '0'
    },
    styleUrls: [
        './list.component.scss',
        '../utils/drag-and-drop/drag-and-drop.scss'
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        KeyboardSupportService
    ]
})
export class ListComponent implements AfterContentInit, OnDestroy, OnInit {
    /** Whether dropdown mode is included to component, used for Select and Combobox */
    @Input()
    @HostBinding('class.fd-list--dropdown')
    dropdownMode = false;

    /** Whether multi mode is included to component, used for MultiInput */
    @Input()
    @HostBinding('class.fd-list--multi-input')
    multiInputMode = false;

    /** Whether compact mode is included to component */
    @Input()
    @HostBinding('class.fd-list--compact')
    compact = false;

    /** Whether list component contains message */
    @Input()
    @HostBinding('class.fd-list--has-message')
    hasMessage = false;

    /** Whether list component has removed borders */
    @Input()
    @HostBinding('class.fd-list--no-border')
    noBorder = false;

    /** Whether list component has navigation indicators */
    @Input()
    @HostBinding('class.fd-list--navigation-indication')
    navigationIndication = false;

    /** Whether list component has checkboxes or radio buttons included */
    @Input()
    @HostBinding('class.fd-list--selection')
    selection = false;

    /** Whether internal keyboard support should be enabled. It's enabled by default */
    @Input()
    enableKeyboardSupport = true;

    /** Function that is supposed to be called, when focus escape before list */
    @Input()
    escapeBeforeListCallback: (keyboardEvent: KeyboardEvent) => void;

    /** Function that is supposed to be called, when focus escape after list */
    @Input()
    escapeAfterListCallback: (keyboardEvent: KeyboardEvent) => void;

    /** Whether list component includes links */
    @HostBinding('class.fd-list--navigation')
    hasNavigation = false;

    /** @hidden */
    @ContentChildren(ListItemComponent)
    items: QueryList<ListItemComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(
        private _keyboardSupportService: KeyboardSupportService<ListItemComponent>
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._keyboardSupportService.focusEscapeBeforeList = this.escapeBeforeListCallback;
        this._keyboardSupportService.focusEscapeAfterList = this.escapeAfterListCallback;
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._keyboardSupportService.setKeyboardService(this.items, false);

        this.items.changes
            .pipe(
                takeUntil(this._onDestroy$),
                startWith(0)
            ).subscribe(() => this._recheckLinks())
        ;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
        this._keyboardSupportService.onDestroy$.next();
        this._keyboardSupportService.onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.enableKeyboardSupport && this._keyboardSupportService) {
            if (KeyUtil.isKey(event, [' ', 'Enter'])) {
                if (this._keyboardSupportService.keyManager && this._keyboardSupportService.keyManager.activeItem) {
                    this._keyboardSupportService.keyManager.activeItem.click();
                    event.stopPropagation();
                }
            } else {
                this._keyboardSupportService.onKeyDown(event)
            }
        }
    }

    /** Set fake focus on element with passed index */
    setItemActive(index: number): void {
        this._keyboardSupportService.keyManager.setActiveItem(index);
    }

    /** @hidden */
    private _recheckLinks(): void {
        const items = this.items.filter(item => item.link);
        this.hasNavigation = items.length > 0;
    }
}
