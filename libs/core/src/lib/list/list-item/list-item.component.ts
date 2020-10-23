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
import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';
import { RadioButtonComponent } from '../../radio/radio-button/radio-button.component';
import { ListLinkDirective } from '../directives/list-link.directive';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { KeyboardSupportItemInterface } from '../../utils/interfaces/keyboard-support-item.interface';
import { KeyUtil } from '../../utils/functions';
import { LIST_ITEM_COMPONENT, ListItemInterface } from './list-item-utils';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

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
    providers: [{ provide: LIST_ITEM_COMPONENT, useExisting: forwardRef(() => ListItemComponent) }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements KeyboardSupportItemInterface, AfterContentInit, OnDestroy, ListItemInterface {
    /** Whether list item is selected */
    @Input()
    @HostBinding('attr.aria-selected')
    @HostBinding('class.is-selected')
    selected = false;

    /** tab index attribute */
    @Input()
    @HostBinding('attr.tabindex')
    tabIndex = -1;

    /** Whether there is no data inside list item */
    @Input()
    @HostBinding('class.fd-list__item--no-data')
    noData = false;

    /** Whether there is item performs some action */
    @Input()
    @HostBinding('class.fd-list__item--action')
    action = false;

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

    /** @hidden Implementation of KeyboardSupportItemInterface | TODO Revisit KeyboardSupportItemInterface*/
    clicked = new EventEmitter<MouseEvent>();

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        public elementRef: ElementRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnLinkQueryChange();
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
    click(): void {
        this.elementRef.nativeElement.click();
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
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
    private _muteEvent(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
    }
}
