import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';
import { RadioButtonComponent } from '../../radio/radio-button/radio-button.component';
import { ListLinkDirective } from '../directives/list-link.directive';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { KeyUtil } from '../../utils/functions';
import { LIST_ITEM_COMPONENT, ListItemInterface } from './list-item-utils';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ListFocusItem } from '../list-focus-item.model';
import { ButtonComponent } from '../../button/button.component';

/**
 * The component that represents a list item.
 * The list item can contain plain text, links or actions.
 */
@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fdListItem] ,[fd-list-item]',
    templateUrl: './list-item.component.html',
    host: {
        class: 'fd-list__item',
        role: 'listitem'
    },
    providers: [{
        provide: LIST_ITEM_COMPONENT,
        useExisting: forwardRef(() => ListItemComponent)
    }, {
        provide: ListFocusItem,
        useExisting: forwardRef(() => ListItemComponent)
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent extends ListFocusItem implements AfterContentInit, OnDestroy, ListItemInterface {
    /** Whether list item is selected */
    @Input()
    @HostBinding('attr.aria-selected')
    @HostBinding('class.is-selected')
    selected = false;

    /** tab index attribute */
    @Input()
    @HostBinding('attr.tabindex')
    get tabindex(): number {
        return this._tabIndex;
    }
    set tabindex(value: number) {
        this._tabIndex = coerceNumberProperty(value, -1);
    };

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

    /** Whether list item should contain additional unRead styles */
    @Input()
    @HostBinding('class.fd-list__item--unread')
    unread = false;

    /** @hidden Implementation of KeyboardSupportItemInterface | TODO Revisit KeyboardSupportItemInterface*/
    @Output()
    keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** Whether list item contains link */
    @HostBinding('class.fd-list__item--link')
    link = false;

    /** @hidden */
    @ContentChild(CheckboxComponent)
    checkbox: CheckboxComponent;

    /** @hidden */
    @ContentChild(RadioButtonComponent)
    radio: RadioButtonComponent;

    /** @hidden */
    @ContentChildren(ListLinkDirective)
    linkDirectives: QueryList<ListLinkDirective>;

    /** @hidden */
    @ContentChildren(ButtonComponent, { descendants: true })
    buttons: QueryList<ButtonComponent>;

    /** @hidden Implementation of KeyboardSupportItemInterface | TODO Revisit KeyboardSupportItemInterface*/
    clicked = new EventEmitter<MouseEvent>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _tabIndex = -1;

    constructor(
        public elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        super(elementRef);
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
        this._listenOnButtonQueryChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            if (this.checkbox) {
                this.checkbox.nextValue();
                this._muteEvent(event);
            }
            if (this.radio) {
                this.radio.labelClicked(event);
                this._muteEvent(event);
            }
        }
        this.keyDown.emit(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        this.clicked.emit(event);
        if (this.checkbox && !this.link) {
            this.checkbox.nextValue();
        }
        if (this.radio && !this.link) {
            this.radio.labelClicked(event);
        }
    }

    /** @hidden */
    private _listenOnLinkQueryChange(): void {
        this.linkDirectives.changes.pipe(
            takeUntil(this._onDestroy$),
            startWith(0)
        ).subscribe(() => {
            this.link = this.linkDirectives.length > 0;
            this._changeDetectorRef.detectChanges();
        });
    }

    /** @hidden */
    private _listenOnButtonQueryChange(): void {
        this.buttons.changes.pipe(
            takeUntil(this._onDestroy$),
            startWith(0)
        ).subscribe(_ => {
            this.buttons.forEach(this._addClassToButtons);
        });
    }

    /** @hidden */
    private _addClassToButtons(button: ButtonComponent): void {
        button.class += 'fd-list__button';
        button.buildComponentCssClass();
        button.detectChanges();
    }

    /** @hidden */
    private _muteEvent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
