import {
    Component,
    Input,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter,
    AfterViewInit,
    ViewEncapsulation,
    ComponentFactoryResolver,
    ElementRef,
    HostListener
} from '@angular/core';
import { MenuItem, MenuGroup } from './menu.component';
import { Highlightable } from '@angular/cdk/a11y';
import { DefaultMenuItem, MenuItemDirective, MenuKeyboardService } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    encapsulation: ViewEncapsulation.None
    // providers: [MenuKeyboardService]
}) /*extends MenuItemDirective*/
export class MenuItemComponent implements OnInit, OnDestroy, DefaultMenuItem, AfterViewInit, Highlightable {
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
    public customLabel: string;
    @Input()
    public itemWidth: string;

    @Input()
    public childItems: MenuItem[] = [];

    public _isActive = false;

    currentAdIndex = -1;

    @Output() itemClick: EventEmitter<void> = new EventEmitter();

    /**  Event thrown, when there is some keyboard event detected on mega menu item */
    @Output()
    readonly keyDown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private itemEl: ElementRef,
        private menuKeyboardService: MenuKeyboardService
    ) {
        // super(itemEl);
    }

    ngOnInit() {
        // this._isActive = this.selected ? true : false;
    }

    ngOnDestroy() {}

    ngAfterViewInit() {
        // this.menuKeyboardService.focusEscapeAfterList = () => {};
    }

    setActiveStyles() {
        this._isActive = true;
    }

    setInactiveStyles() {
        this._isActive = false;
    }

    onItemClick() {
        console.log('child items ' + this.childItems.length);
        this.itemClick.emit();
    }

    getItemWidth(): string {
        // todo: handle em, rem etc.
        let finalItemWidth: string = '';
        if (this.itemWidth !== undefined) {
            const itemWidthNumber: number = Number(this.itemWidth.split('px')[0]);
            finalItemWidth = this.itemWidth;
            if (this.item.secondaryIcon !== undefined || this.item.secondaryIcon !== '') {
                // secondary icon exists
                finalItemWidth = itemWidthNumber - 85 + 'px';
            }
        }
        // console.log(finalItemWidth + 'is finalItemWidth and itemWidth ' + itemWidthNumber);
        return finalItemWidth;
    }

    doSomethingElse(data: MenuItem[]) {
        // alert('open new menu ');
        // this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
        // const adItem = this.childItems[this.currentAdIndex];
        // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

        // const viewContainerRef = this.data.viewContainerRef;
        // viewContainerRef.clear();

        // for now do item click only
        this.itemClick.emit();
    }

    public focus(): void {
        console.log('calling focussss');
        // if (this.group.label) {
        //     this.itemEl.nativeElement.group.groupItems[0].focus();
        // }
        this.itemEl.nativeElement.focus();
    }

    public click(): void {
        this.itemClick.emit();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log('@@@@@@@ event code in item ' + event.code);
        switch (event.code) {
            case 'Space':
            case 'Enter':
                this.itemClick.emit();
                break;
            default:
                this.keyDown.emit(event);
        }
    }
}
