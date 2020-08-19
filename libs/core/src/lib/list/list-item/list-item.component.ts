import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild, ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input, OnDestroy,
    Output, QueryList,
    ViewEncapsulation
} from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox/checkbox.component';
import { RadioButtonComponent } from '../../radio/radio-button/radio-button.component';
import { ListLinkDirective } from '../directives/list-link.directive';
import { FocusableOption } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class ListItemComponent implements FocusableOption, AfterContentInit, OnDestroy {
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

    /** Keydown Event emitter */
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

    /** @hidden
     * Event thrown, when link component is
     */

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        public elementRef: ElementRef,
        private _changeDet: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.linkDirectives.changes.pipe(
            takeUntil(this._onDestroy$),
            startWith(0)
        ).subscribe(() => {
            this.link = this.linkDirectives.length > 0;
            this._changeDet.detectChanges();
        })
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        this.keyDown.emit(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.checkbox) {
            this.checkbox.nextValue();
        }
        if (this.radio) {
            this.radio.labelClicked();
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
}
