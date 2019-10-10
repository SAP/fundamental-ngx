import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    ViewChildren,
    QueryList,
    AfterContentInit,
    ContentChildren,
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
 * <fdp-menu [menuItems]="menuData"
 *           [showSeparator]=true
 *           [textAlign]="'left'"
 *           [isScrolling]=true
 *           [scrollLimit]=8
 *           [width]="'600px'">
 * </fdp-menu>
 * ```
 *
 * Menu item/group data should be provided to `<fdp-menu>` using an array of MenuItem or MenuGroup:
 * ```ts
 * complexMenuData: (MenuItem | MenuGroup)[] = [];
 * ```
 *
 * ```ts
 * this.complexMenuData = [{
 *   label: 'Item One',
 *   command: () => {
 *     alert('The first item.')
 *   },
 *   selectable: true,
 *   selected: true
 * }, {
 *  label: 'Second Item',
 *    groupItems: [
 *              {
 *                label: 'Item 1 in Group 1',
 *                command: () => {
 *                  alert('Item 1 in Group 1 called');
 *                }
 *              },
 *              {
 *                label: 'Item 2 in Group 1',
 *                command: () => {
 *                  alert('Item 2 in Group 111');
 *                },
 *                disabled: true
 *             }
 *           ]
 *      },{
 *     label: 'Third Item',
 *     command: () => {
 *       alert("Third");
 *     },
 *     icon: 'sap-icon--grid'
 * }];
 * ```
 *
 */
@Component({
    selector: 'fdp-menu',
    templateUrl: './menu.component.html',
    // styles: [`
    //   @import "${CONSTANTS.FIORI_FUNDAMENTALS_CSS_PATH}";
    //   @import "${CONSTANTS.FIORI_FUNDAMENTALS_CSS_IE_PATH}";
    // `],
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
// AfterContentInit, OnDestroy
// AfterViewInit
export class MenuComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {
    /**
     * Add separating line between menu items. [Default: false]
     */
    @Input() public showSeparator = false;

    /**
     * Alignment of menu items; either "left", "right" or "inherit".
     * [Default "inherit"]
     */
    @Input()
    public textAlign: string;

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
    private target: ElementRef;
    private isIcon: boolean = false;
    private numberOfItems: number = 0;
    private sortedQueryList = [];

    @ViewChildren(MenuItemComponent)
    menuQueryList: QueryList<MenuItemComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

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
        console.log('group is ' + this.groups.length);
        this.cd.markForCheck();
    }

    ngOnChanges(changes: SimpleChanges) {
        // this.cd.detectChanges();
        this.cd.markForCheck();
    }

    ngAfterViewInit() {
        this.sortedQueryList = this.menuQueryList.toArray();
        this.sortedQueryList.sort((a, b) => {
            console.log('a lbel: ' + a.group.groupItems + ' at index' + a.item.id);
            // console.log(a);
            // console.log(b);
            console.log('b lbel: ' + b.item.label + ' at index' + b.item.id);
            // return a.item.id > b.item.id ? a.item.id : b.item.id;
            return a.index - b.index;
        });
        console.log('after sort');
        console.log(this.sortedQueryList);
        // this.cd.markForCheck();
        // console.log(this.menuQueryList.toArray());

        this.sortedQueryList.forEach((item: MenuItemComponent, index: number) =>
            item.keyDown.pipe(takeUntil(this.onDestroy$)).subscribe((keyboardEvent: KeyboardEvent) => {
                console.log('item index is ' + item.index + ' and index ' + index);

                this.handleKeyPress(keyboardEvent, parseInt(item.index, 10));
            })
        );
        // this.cd.markForCheck();
    }

    onItemClick(item: MenuItem, _group: MenuGroup): void {
        // if (group.isRadioGroup) {
        //     group.children.forEach(record => {
        //         record.selected = false;
        //     });
        // }
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
                // console.log(record.label + 'is the label before pushing');
                if (this.isMenuGroup(record)) {
                    if (newGroup.length > 0) {
                        // console.log('adding previously unpushed individual items into group @@@@@@@@@');

                        this.numberOfItems++;
                        // newGroup.forEach(groupItem => {
                        //     groupItem.id = index;
                        //     index++;
                        // });
                        groups.push({
                            groupItems: newGroup
                        });
                        // console.log('group 1 ');
                        // console.log(groups);
                        newGroup = [];
                    }
                    // console.log('adding a new group with header @@@@@@@@@');

                    this.numberOfItems++;
                    record.groupItems.forEach(groupItem => {
                        groupItem.id = index;
                        index++;
                    });
                    groups.push(record);
                    // console.log('group 2 ');
                    // console.log(groups);
                } else {
                    // console.log('no header, adding individual items @@@@@@@@@');

                    this.numberOfItems++;
                    record.id = index;
                    index++;
                    newGroup.push(record);
                    // console.log('group 3 ' + record.id);
                    // console.log(groups);
                }
            });
        }
        // if no group headers present or if last set of items have not yet been pushed to a group
        if (newGroup.length > 0) {
            // console.log('what does this else do? @@@@@@@@@');

            // this.numberOfItems++;  //todo : check if this is needed. maybe needed.
            // newGroup.forEach(groupItem => {
            //     groupItem.id = index;
            //     index++;
            // });
            groups.push({
                groupItems: newGroup
            });
            // console.log('group 4 ');
        }
        console.log(groups);
        return groups;
    }

    // isIconPresent() {
    //     for (const _group of this.groups) {
    //         if (_group.icon) {
    //             // console.log('group icon: ' + group.icon);
    //             this.isIcon = true;
    //             break;
    //         } else if (_group.groupItems) {
    //             for (const item of _group.groupItems) {
    //                 if (item.icon) {
    //                     // console.log('item icon: ' + item.icon);
    //                     this.isIcon = true;
    //                     break;
    //                 }
    //             }
    //         } else {
    //             this.isIcon = false;
    //             break;
    //         }
    //     }
    //     return this.isIcon;
    // }

    /** @hidden */
    ngAfterContentInit(): void {
        // this.menuQueryList.forEach((item: MenuItemComponent, index: number) =>
        //     item.keyDown
        //         .pipe(takeUntil(this.onDestroy$))
        //         .subscribe((keyboardEvent: KeyboardEvent) => this.handleKeyPress(keyboardEvent, index))
        // );
    }

    handleKeyPress(event: KeyboardEvent, index: number) {
        console.log('yo yo handling at ' + index + 'for event ' + event.key);
        // console.log(this.menuQueryList);
        // const data = this.menuQueryList.toArray();
        // data.sort((a, b) => {
        //     console.log('a lbel: ' + a.item.label + ' at index' + a.index);
        //     console.log('b lbel: ' + b.item.label + ' at index' + b.index);
        //     return a.item.label.localeCompare(b.item.label);
        // });
        // console.log('after sort');
        // console.log(data);
        // if(event.key === 'ArrowDown'){

        // }else{
        // this.keyboardService.keyDownHandler(event, index, this.menuQueryList.toArray());
        this.keyboardService.keyDownHandler(event, index, this.sortedQueryList);
        // }
    }

    focusFirst() {
        console.log('menu query list:--------');

        console.log(this.menuQueryList);

        console.log('end--------');

        setTimeout(() => this.menuQueryList.first.focus(), 0);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
