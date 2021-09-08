import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    OnDestroy,
    Input,
    Output,
    ViewEncapsulation,
    ContentChild,
    ChangeDetectorRef
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';

import { KeyUtil } from '@fundamental-ngx/core/utils';
import { MenuInteractiveDirective } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'fd-menu__item',
        tabindex: '-1'
    }
})
export class MenuItemComponent implements OnDestroy, FocusableOption {
    /** Menu direction */
    @Input()
    cascadeDirection: 'right' | 'left' = 'right';

    /** Event emitted when item is selected. */
    @Output()
    itemSelect: EventEmitter<void> = new EventEmitter<void>();

    /** Track when menu item is hovered over */
    hovered: Subject<MenuItemComponent> = new Subject<MenuItemComponent>();

    /** Sets whether this item is a trigger for sub-menu. */
    @HostBinding('class.trigger')
    isTrigger = false;

    /** @hidden */
    _isSelected = false;
    /**
     * @hidden
     * set CSS class 'is-selected' if menu-item opens a sub-menu.
     */
    set isSelected(selected: boolean) {
        if (this._isSelected !== selected) {
            this._isSelected = selected;
            this._cdr.markForCheck();
        }
    }
    /** @hidden */
    get isSelected(): boolean {
        return this._isSelected;
    }

    /** @hidden */
    @ContentChild(MenuInteractiveDirective)
    _fdMenuInteractiveChild: MenuInteractiveDirective;

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _cdr: ChangeDetectorRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this.hovered.complete();
    }

    /** Focus on option */
    focus(): void {
        const interactive = this._elementRef.nativeElement?.firstElementChild as HTMLElement;
        interactive?.focus();
    }

    /**
     * @hidden
     * Handle selection of item via keyboard 'Enter' or mouseclick.
     */
    @HostListener('keydown', ['$event'])
    _onItemKeydown(event: KeyboardEvent): void {
        if (event && KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            this.itemSelect.emit();
        }
    }

    /**
     * @hidden
     * Handle click of item via keyboard 'Enter'.
     */
    @HostListener('click')
    _onItemClick(): void {
        this.itemSelect.emit();
    }

    /**
     * @hidden
     * Handle click of item via keyboard 'Enter'.
     */
    @HostListener('mouseenter')
    _onMouseEnter(): void {
        this.hovered.next(this);
    }
}
