import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    ViewChildren,
    QueryList,
    OnDestroy
} from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { MenuKeyboardService } from '@fundamental-ngx/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Interface that represents menu item.
 */
export interface MenuItem {
    /**
     * Menu item label.
     */
    label: string;

    /**
     * Is menu item selectable. If item is selectable, then it will display
     * selected/non-selected state when toggled.
     */
    selectable?: boolean;

    /**
     * Is menu item selected?
     */
    selected?: boolean;

    /**
     * Icon to display in front of menu label. Accepted values are SAP class icon names
     * (see [SAP Fundamental Styles: Icon](https://sap.github.io/fundamental-styles/components/icon.html)).
     *
     * Setting this will also override the default icon for "selectable" menu items.
     */
    icon?: string;

    /**
     * A secondary icon to display at the end of the menu item. No action will be performed for this icon,
     * it is just for better accessibility or to make the meaning of the menu item more clear.
     */
    secondaryIcon?: string;

    /**
     * Whether this item should be disabled or not.
     */
    disabled?: boolean;

    /**
     * a custom label different from `label` for showing in tooltips for accessibility purpose.
     */
    tooltipLabel?: string;

    /**
     * if this menu item itself has sub-menu opening up, childItems will contain the list of those items.
     */
    childItems?: MenuItem[]; // move this to MegaMenu

    /**
     * A unique identifier for this item
     */
    id?: number;

    /**
     * Callback function which will execute when menu item is clicked.
     */
    command(): void;
}

/**
 * Interface that represents menu group.
 */
export interface MenuGroup {
    /**
     * Menu group label. This field is optional.
     */
    label?: string;

    /**
     * Set icon for menu group.
     */
    icon?: string;

    /**
     * Menu group acts as a radio group. Only one menu item of the group
     * will be in selected state at a time.
     */
    // isRadioGroup?: boolean;

    /**
     * a custom label different from `label` for showing in tooltips for accessibility purpose.
     */
    tooltipLabel?: string;

    /**
     * List of menu items of the group.
     */
    groupItems: MenuItem[];
}

/**
 * `<fdp-menu>` is a menu component which provides navigation, action and selection
 * options.
 *
 * ```html
 <fdp-menu [menuItems]="menuData"
           [showSeparator]=true
           [isScrolling]=true
           [scrollLimit]=8
           [width]="'600px'">
</fdp-menu>
  ```
 *
 * Menu item/group data should be provided to `<fdp-menu>` using an array of MenuItem or MenuGroup:
  ```ts
  complexMenuData: (MenuItem | MenuGroup)[] = [];
  ```
 *
  ```ts
  this.complexMenuData = [{
    label: 'Item One',
    command: () => {
      alert('The first item.')
    },
    selectable: true,
    selected: true
  }, {
   label: 'Second Item',
     groupItems: [
               {
                 label: 'Item 1 in Group 1',
                 command: () => {
                   alert('Item 1 in Group 1 called');
                 }
               },
               {
                 label: 'Item 2 in Group 1',
                 command: () => {
                   alert('Item 2 in Group 111');
                 },
                 disabled: true
              }
            ]
       },{
      label: 'Third Item',
      command: () => {
        alert("Third");
      },
      icon: 'sap-icon--grid'
  }];
  ```
 *
 */
@Component({
    selector: 'fdp-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private numberOfItems: number = 0;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /**
     * Add separating line between menu items. [Default: false]
     */
    @Input()
    public showSeparator = false;

    /**
     * Specify if items are to scroll
     */
    @Input()
    public isScrolling: boolean = false;

    /**
     * Specify the number of items after which scroll must begin
     */
    @Input()
    public scrollLimit: number;

    /**
     * the max width of the menu component
     */
    @Input()
    public width: string;

    /**
     * The menu items that are passed in by the user.
     */
    @Input()
    public menuItems: (MenuItem | MenuGroup)[] = [];

    public groups: MenuGroup[];
    public sortedQueryList = [];

    @ViewChildren(MenuItemComponent)
    menuQueryList: QueryList<MenuItemComponent>;

    constructor(private cd: ChangeDetectorRef, private keyboardService: MenuKeyboardService) {}

    ngOnInit() {
        if (
            (this.isScrolling && (this.scrollLimit === undefined || this.scrollLimit <= 0)) ||
            (!this.isScrolling && this.scrollLimit > 0)
        ) {
            // if scroll limit was not specified but isScrolling flag was used, use default value
            // or if scroll limit was specified but isScrolling flag was not marked true, even then use default value
            this.scrollLimit = this.numberOfItems; // default
            // can also disable scrolling explicitly
            this.isScrolling = false;
        }
        this.groups = this.processData(this.menuItems);
        this.cd.markForCheck();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.width) {
            let minWidth: number;
            let splitWidthNumber: number;
            if (this.width.includes('em')) {
                splitWidthNumber = Number(this.width.split('em')[0]);
                minWidth = 13.71;
                this.width = this.enforceGreaterThanMinWidth(splitWidthNumber, minWidth) + 'em';
            } else if (this.width.includes('rem')) {
                splitWidthNumber = Number(this.width.split('rem')[0]);
                minWidth = 13.71; // todo pending calc for rem
                this.width = this.enforceGreaterThanMinWidth(splitWidthNumber, minWidth) + 'rem';
            } else if (this.width.includes('px')) {
                splitWidthNumber = Number(this.width.split('px')[0]);
                minWidth = 192;
                this.width = this.enforceGreaterThanMinWidth(splitWidthNumber, minWidth) + 'px';
            }
        }
        this.cd.markForCheck();
    }

    private enforceGreaterThanMinWidth(splitWidthNumber: number, minWidth: number): number {
        if (splitWidthNumber < minWidth) {
            // minimum width
            splitWidthNumber = minWidth;
        }
        return splitWidthNumber;
    }

    ngAfterViewInit() {
        this.sortQueryList();
        this.handleKeypressForSortedQueryList();

        this.cd.markForCheck();
    }

    sortQueryList() {
        this.sortedQueryList = this.menuQueryList.toArray();
        this.sortedQueryList.sort((a, b) => {
            return a.index - b.index;
        });
    }

    handleKeypressForSortedQueryList() {
        this.sortedQueryList.forEach((item: MenuItemComponent, index: number) =>
            item.keyDown.pipe(takeUntil(this.onDestroy$)).subscribe((keyboardEvent: KeyboardEvent) => {
                this.handleKeyPress(keyboardEvent, parseInt(item.index, 10));
            })
        );
    }

    onItemClick(item: MenuItem, _group: MenuGroup): void {
        if (item.selectable) {
            item.selected = !item.selected;
            this.cd.markForCheck();
        }
        item.command();
    }

    isMenuGroup(item: MenuItem | MenuGroup): item is MenuGroup {
        return (item as MenuGroup).groupItems !== undefined;
    }

    processData(data: (MenuItem | MenuGroup)[]): MenuGroup[] {
        const groups: MenuGroup[] = [];
        let newGroup: MenuItem[] = [];

        let index = 0;
        if (data !== undefined) {
            data.forEach(record => {
                if (this.isMenuGroup(record)) {
                    if (newGroup.length > 0) {
                        // adding previously unpushed individual items into group
                        this.numberOfItems++;
                        groups.push({
                            groupItems: newGroup
                        });
                        newGroup = [];
                    }
                    // adding a new group with header
                    this.numberOfItems++;
                    record.groupItems.forEach(groupItem => {
                        groupItem.id = index;
                        index++;
                    });
                    groups.push(record);
                } else {
                    // no header, adding individual items
                    this.numberOfItems++;
                    record.id = index;
                    index++;
                    newGroup.push(record);
                }
            });
        }
        // if no group headers present or if last set of items have not yet been pushed to a group
        if (newGroup.length > 0) {
            groups.push({
                groupItems: newGroup
            });
        }
        return groups;
    }

    handleKeyPress(event: KeyboardEvent, index: number) {
        this.keyboardService.keyDownHandler(event, index, this.sortedQueryList);
    }

    focusFirst() {
        setTimeout(() => this.menuQueryList.first.focus(), 0);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
