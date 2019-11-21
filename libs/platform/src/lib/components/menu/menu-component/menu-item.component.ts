import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewEncapsulation,
    ElementRef,
    HostListener,
    Renderer2,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { MenuItem, MenuGroup } from './menu.component';
import { DefaultMenuItem } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent implements DefaultMenuItem, OnChanges {
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

    /** calculates the final width of the label when icons are used */
    /** @hidden */
    public finalItemWidth = '';

    @Output()
    readonly itemClick: EventEmitter<void> = new EventEmitter();

    /**  Event thrown, when there is some keyboard event detected on mega menu item */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    constructor(public itemEl: ElementRef, private renderer: Renderer2) {}

    onItemClick(): void {
        this.itemClick.emit();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.itemWidth || changes.item) {
            this.finalItemWidth = this.getItemWidth();
        }
    }

    /**
     * get the menu item label width bby offsetting from total width if `secondaryIcon` is present
     */
    getItemWidth(): string {
        // todo: handle em, rem etc.
        let finalItemWidth: string = '';
        if (this.itemWidth !== undefined) {
            finalItemWidth = this.getOffsetItemWidth(finalItemWidth);
        } else {
            const itemElement = this.itemEl.nativeElement;
            this.renderer.setStyle(itemElement, 'width', 'inherit');
        }
        return finalItemWidth;
    }

    private getOffsetItemWidth(finalItemWidth: string) {
        let splitWidthNumber: number;
        let iconOffset: number;
        let secondaryIconOffset: number;
        let unit: string;
        if (this.itemWidth.includes('em')) {
            splitWidthNumber = Number(this.itemWidth.split('em')[0]);
            iconOffset = 42 / 14; // 14px font-size = 1em
            secondaryIconOffset = iconOffset * 2;
            unit = 'em';
        } else if (this.itemWidth.includes('rem')) {
            splitWidthNumber = Number(this.itemWidth.split('rem')[0]);
            // todo handle for rem
        } else if (this.itemWidth.includes('px')) {
            splitWidthNumber = Number(this.itemWidth.split('px')[0]);
            iconOffset = 42;
            secondaryIconOffset = 88;
            unit = 'px';
        }
        // enforce minimum width
        finalItemWidth = this.itemWidth;
        if (this.item.icon !== undefined || this.group.icon !== undefined || this.item.selected) {
            // remove primary icon width from label width
            finalItemWidth = splitWidthNumber - iconOffset + unit;
        }
        if (this.item.secondaryIcon !== undefined) {
            // remove secondary icon width from label width
            finalItemWidth = splitWidthNumber - secondaryIconOffset + unit;
        }
        return finalItemWidth;
    }

    /**
     * implemented method for `focus` from `DefaultMenuItem`
     */
    public focus(): void {
        this.itemEl.nativeElement.children[0].focus();
    }
    /**
     * implemented method for `click` from `DefaultMenuItem`
     */
    public click(): void {
        this.itemClick.emit();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
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
