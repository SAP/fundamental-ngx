import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DestroyRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    inject,
    input,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { DecimalPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, LIST_ITEM_COMPONENT, ListItemInterface, Nullable } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';
import { CheckboxComponent, FD_CHECKBOX_COMPONENT } from '@fundamental-ngx/core/checkbox';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_RADIO_BUTTON_COMPONENT, RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { ListLinkDirective } from '../directives/list-link.directive';
import { ListFocusItem } from '../list-focus-item.model';
import { FD_LIST_LINK_DIRECTIVE, FD_LIST_UNREAD_INDICATOR } from '../tokens';

let listItemUniqueId = 0;

/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdListItem] ,[fd-list-item]',
    templateUrl: './list-item.component.html',
    host: {
        class: 'fd-list__item',
        '[attr.tabindex]': '_normalizedTabIndex$()',
        '[attr.id]': 'id'
    },
    providers: [
        {
            provide: LIST_ITEM_COMPONENT,
            useExisting: forwardRef(() => ListItemComponent)
        },
        {
            provide: ListFocusItem,
            useExisting: forwardRef(() => ListItemComponent)
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [FormItemComponent, DecimalPipe, IconComponent]
})
export class ListItemComponent<T = any> extends ListFocusItem<T> implements AfterContentInit, ListItemInterface {
    /** Whether list item is selected */
    @Input()
    @HostBinding('class.is-selected')
    @HostBinding('attr.aria-selected')
    selected: boolean;

    /** Whether there is no data inside list item */
    @Input()
    @HostBinding('class.fd-list__item--no-data')
    noData = false;

    /** Whether there is item performs some action */
    @Input()
    @HostBinding('class.fd-list__item--action')
    action = false;

    /** Whether there is item performs some action */
    @Input()
    @HostBinding('class.fd-list__item--interractive')
    interactive = false;

    /** Whether list item contains busy indicator */
    @Input()
    @HostBinding('class.fd-list__item--growing')
    growing = false;

    /** Counter on list item */
    @Input()
    counter: number;

    /** Whether list item shows active indicator. Used only in List with Subline. */
    @Input()
    active = false;

    /** Whether list item should contain additional unRead styles */
    @Input()
    @HostBinding('class.fd-list__item--unread')
    unread = false;

    /**
     * Whether the list item is byline
     */
    @Input()
    @HostBinding('class.fd-list__item--byline')
    byline = false;

    /** Aria-role attribute. */
    @Input()
    ariaRole: Nullable<string>;

    /** The ID of the list item element */
    @Input()
    id: Nullable<string> = 'fd-list-item-' + ++listItemUniqueId;

    /** Whether to prevent built-in click event logic on the list item.
     * Helpful when using lists with checkboxes or radio buttons when the list item should be clickable, but should not select/deselect the list item. */
    @Input()
    preventClick = false;

    /** @hidden Implementation of KeyboardSupportItemInterface | TODO Revisit KeyboardSupportItemInterface*/
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** Whether list item contains link */
    @HostBinding('class.fd-list__item--link')
    link = false;

    /** @hidden */
    @ContentChild(FD_RADIO_BUTTON_COMPONENT)
    set radio(value: RadioButtonComponent) {
        this._radio = value;
        if (this._radio && this._radio.tabIndex == null) {
            this._radio.tabIndex = -1;
        }
        if (value) {
            this._role = 'option';
        }
    }
    get radio(): RadioButtonComponent {
        return this._radio;
    }

    /** @hidden */
    @ContentChild(FD_CHECKBOX_COMPONENT)
    set checkbox(value: CheckboxComponent) {
        this._checkbox = value;
        if (this._checkbox && this._checkbox.tabIndexValue == null) {
            this._checkbox.tabIndexValue = -1;
        }
        if (value) {
            this._role = 'option';
        }
    }
    get checkbox(): CheckboxComponent {
        return this._checkbox;
    }

    /** @hidden */
    @ContentChildren(FD_LIST_LINK_DIRECTIVE)
    linkDirectives: QueryList<ListLinkDirective>;

    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT, { descendants: true })
    buttons: QueryList<ButtonComponent>;

    /** @hidden group header id, that is being set by parent list component */
    _relatedGroupHeaderId: string | null;

    /** @hidden */
    readonly _list = inject(FD_LIST_UNREAD_INDICATOR, {
        optional: true
    });

    /** Template ref for Settings list item */
    settingsListTpl = input<TemplateRef<any>>();

    /** @hidden */
    private _role = 'listitem'; // default for li elements

    /** @hidden An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private readonly _onLinkListChanged$ = new Subject<void>();

    /** @hidden */
    private _radio: RadioButtonComponent;

    /** @hidden */
    private _checkbox: CheckboxComponent;

    /** @hidden */
    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    /** @hidden */
    @HostBinding('attr.role')
    private get roleAttr(): string {
        return this.ariaRole || this._role;
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            if (this.checkbox) {
                this.checkbox.nextValue();
                this._muteEvent(event);
            } else if (this.radio) {
                this.radio.labelClicked(event, false);
                this._muteEvent(event);
            } else if (this.interactive) {
                this.selected = !this.selected;
                this._muteEvent(event);
                return;
            } else if (this.link) {
                this.linkDirectives.first.elementRef.nativeElement.classList.add('is-active');
                this._muteEvent(event);
            }
        }
        this.keyDown.emit(event);
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    keyupHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE]) && this.link) {
            const _anchorElement = this.linkDirectives.first.elementRef.nativeElement;
            _anchorElement.classList.remove('is-active');
            _anchorElement.click();
            this._muteEvent(event);
        }
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (!this.preventClick) {
            this._clicked$.next(event);
            if (this.checkbox && !this.link) {
                if (!this.checkbox.elementRef.nativeElement.contains(event.target as Node)) {
                    // clicking on the checkbox is not suppressed
                    // so we should only process clicks if clicked on the list-item, not checkbox itself
                    this.checkbox.nextValue();
                }
            }
            if (this.radio && !this.link) {
                this.radio.labelClicked(event, false);
            }
        }
    }

    /** @hidden */
    @HostListener('focus')
    private _onFocus(): void {
        // Try to find inner focusable link
        const tabbableLink = this.elementRef.nativeElement.querySelector('.fd-list__link.fd-list__link--focusable');
        tabbableLink?.focus();
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
        this._listenOnButtonQueryChange();
    }

    /** @hidden */
    private _listenOnLinkQueryChange(): void {
        this.linkDirectives.changes
            .pipe(startWith(this.linkDirectives), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._onLinkListChanged$.next();
                this.link = this.linkDirectives.length > 0;
                this._changeDetectorRef.detectChanges();
            });
    }

    /** @hidden */
    private _listenOnButtonQueryChange(): void {
        this.buttons.changes.pipe(startWith(0), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.buttons.forEach(this._addClassToButtons);
        });
    }

    /** @hidden */
    private _addClassToButtons(button: ButtonComponent): void {
        button.class += ' fd-list__button';
        button.buildComponentCssClass();
        button.detectChanges();
    }

    /** @hidden */
    private _muteEvent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
