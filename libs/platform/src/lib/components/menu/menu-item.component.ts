import {
    Component,
    OnInit,
    ElementRef,
    HostBinding,
    Output,
    EventEmitter,
    HostListener,
    ChangeDetectionStrategy,
    OnDestroy,
    Input
} from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';
import { Subject } from 'rxjs';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent implements OnDestroy, FocusableOption {
    @Input() cascadeDirection: 'right' | 'left' = 'right';

    @Output() itemSelect: EventEmitter<void> = new EventEmitter();

    // Track when menu item is hovered over
    public hovered: Subject<MenuItemComponent> = new Subject<MenuItemComponent>();

    constructor(private elementRef: ElementRef) { }

    // Add Fundamental-Styles class for menu item
    @HostBinding('class.fd-menu__item') menuItemClass = true;
    @HostBinding('class.trigger') isTrigger = false;
    @HostBinding('class.cascades-right') get cascadesRight(): boolean {
        return this.cascadeDirection === 'right';
    }

    @HostBinding('class.cascades-left') get cascadesLeft(): boolean {
        return this.cascadeDirection === 'left';
    }

    @HostBinding('attr.role') role = 'menuitem';
    @HostBinding('attr.tabindex') tabindex = '-1';

    // Handle selection of item via keyboard 'Enter' or mouseclick
    @HostListener('keydown', ['$event']) onItemKeydown(event: KeyboardEvent) {
        if (event && event.key === 'Enter') {
            this.itemSelect.emit();
        }
    }
    @HostListener('click') onItemClick() {
        this.itemSelect.emit();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.hovered.next(this);
    }

    ngOnDestroy() {
        this.hovered.complete();
    }

    focus() {
        this.elementRef.nativeElement.focus();
    }
}
