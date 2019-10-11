import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ElementRef,
    HostListener,
    Renderer2
} from '@angular/core';
import { MenuItem, MenuGroup } from './menu.component';
import { DefaultMenuItem } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent implements OnInit, DefaultMenuItem {
    @Input()
    public label: string;
    @Input()
    public index: string;
    @Input()
    public icon: string;
    @Input()
    public selectable: boolean;
    @Input()
    public selected: boolean;
    @Input()
    public secondaryIcon: string;

    @Input()
    public item: MenuItem;
    @Input()
    public group: MenuGroup;

    @Input()
    public separated: boolean;
    @Input()
    public disabled: boolean;
    @Input()
    public tooltipLabel: string;
    @Input()
    public itemWidth: string;

    @Input()
    public childItems: MenuItem[] = [];

    @Output() itemClick: EventEmitter<void> = new EventEmitter();

    /**  Event thrown, when there is some keyboard event detected on mega menu item */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    constructor(public itemEl: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {}

    onItemClick() {
        this.itemClick.emit();
    }

    /**
     * get the menu item label width bby offsetting from total width if `secondaryIcon` is present
     */
    getItemWidth(): string {
        // todo: handle em, rem etc.
        let finalItemWidth: string = '';
        if (this.itemWidth !== undefined) {
            const itemWidthNumber: number = Number(this.itemWidth.split('px')[0]);
            finalItemWidth = this.itemWidth;
            if (this.item.secondaryIcon !== undefined || this.item.secondaryIcon !== '') {
                // secondary icon exists
                finalItemWidth = itemWidthNumber - 88 + 'px';
            }
        } else {
            const itemElement = this.itemEl.nativeElement;
            this.renderer.setStyle(itemElement, 'width', 'inherit');
        }
        return finalItemWidth;
    }

    /**
     * implemented method for `focus` from `DefaultMenuItem`
     */
    public focus(): void {
        this.itemEl.nativeElement.focus();
    }
    /**
     * implemented method for `click` from `DefaultMenuItem`
     */
    public click(): void {
        this.itemClick.emit();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (this.disabled) {
                    event.stopPropagation();
                } else {
                    this.itemClick.emit();
                }
                break;
            default:
                this.keyDown.emit(event);
        }
    }
}
