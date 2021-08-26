import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';

import { KeyUtil } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent implements OnDestroy, FocusableOption {
    @Input() cascadeDirection: 'right' | 'left' = 'right';

    /** Event emitted when item is selected. */
    @Output() itemSelect: EventEmitter<void> = new EventEmitter();

    /** Track when menu item is hovered over */
    public hovered: Subject<MenuItemComponent> = new Subject<MenuItemComponent>();
    /** @hidden set CSS class for host element. */
    @HostBinding('class.fd-menu__item') menuItemClass = true;
    /** @hidden set CSS class for host element. */
    @HostBinding('class.fd-menu__link') menuLinkClass = true;
    /** Sets whether this item is a trigger for sub-menu. */
    @HostBinding('class.trigger') isTrigger = false;
    /** @hidden set CSS class 'is-selected' if menu-item opens a sub-menu. */
    @HostBinding('class.is-selected')
    isSelected = false;
    /** @hidden set role attribute for host. */
    @HostBinding('attr.role') role = 'menuitem';
    /** @hidden set tabindex attribute for host. */
    @HostBinding('attr.tabindex') tabindex = '-1';

    constructor(private elementRef: ElementRef) { }

    /** @hidden Handle selection of item via keyboard 'Enter' or mouseclick. */
    @HostListener('keydown', ['$event']) onItemKeydown(event: KeyboardEvent): void {
        if (event && (KeyUtil.isKeyCode(event, [SPACE, ENTER]))) {
            this.itemSelect.emit();
        }
    }

    /** @hidden Handle click of item via keyboard 'Enter'. */
    @HostListener('click') onItemClick(): void {
        this.itemSelect.emit();
    }

    /** @hidden Handle click of item via keyboard 'Enter'. */
    @HostListener('mouseenter') onMouseEnter(): void {
        this.hovered.next(this);
    }

    ngOnDestroy(): void {
        this.hovered.complete();
    }

    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
