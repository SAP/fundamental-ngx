import {
    Component,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    OnChanges,
    SimpleChanges,
    Input,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ElementRef,
    QueryList,
    ViewChildren,
    AfterViewInit
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { MenuItemComponent } from './menu-item.component';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';
import { group } from '@angular/animations';

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
    customLabel?: string;

    /**
     * Callback function which will execute when menu item is clicked.
     */
    callback(): void;
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
    customLabel?: string;

    /**
     * List of menu items of the group.
     */
    children: MenuItem[];
}

/**
 * `<af-menu>` is a menu component which provides navigation, action and selection
 * options.
 *
 * ```html
 * <fdp-menu separate-items="true" use-columns="true"></fdp-menu>
 * ```
 *
 * Menu item/group data should be provided to `<fdp-menu>` using its `load` method.
 *
 * ```javascript
 * var menu = document.getElementByTagName('fdp-menu')[0];
 * var data = [{
 *   label: 'Item One',
 *   callback: () => {
 *     alert('The first item.')
 *   }
 * }, {
 *   label: 'Item Two',
 *   callback: () => {
 *     alert('The second item.')
 *   }
 * }];
 * menu.load(data);
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
export class MenuComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    /**
     * Add separating line between menu items. [Default: false]
     */
    @Input() public separator = false;

    /**
     * Display menu groups as columns. [Default: false]
     */
    // @Input() public useColumns = false;

    /**
     * Alignment of menu items; either "left", "right" or "inherit".
     * [Default "inherit"]
     */
    @Input() public textAlign: string;

    /**
     * Specify if items are to scroll
     */
    @Input() public scrolling: boolean = false;

    /**
     * Specify the number of items after which scroll must begin
     */
    @Input() public scrollLimit: number;

    /**
     * the max width of the menu component
     */
    @Input() public width: string;

    public groups: MenuGroup[];
    private target: ElementRef;
    private isIcon: boolean = false;
    private numberOfItems: number = 0;

    @ViewChildren(MenuItemComponent) public menuItems: QueryList<MenuItemComponent>;
    private keyManager: ActiveDescendantKeyManager<MenuItemComponent>;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    // private readonly onDestroy$: Subject<void> = new Subject<void>();

    /**
     * Load menu data.
     * @param data Data can be either array of MenuItems or array of MenuGroups.
     */
    @Input() load = (data: (MenuItem | MenuGroup)[]) => {
        this.groups = this.processData(data);
        this.cd.markForCheck();
    };

    /**
     * Registers 'keyup' event listener on provided element.
     */
    @Input() registerKeyupListener = (elem: ElementRef) => {
        if (this.target) {
            this.target.nativeElement.removeEventListener('keyup', this.onTargetKeyup);
        }
        this.target = elem;
        this.target.nativeElement.addEventListener('keyup', this.onTargetKeyup.bind(this));
    };

    initializeKeyManager(): void {
        this.menuItems.forEach(item => {
            // remove all focused items
            console.log(' some item ');
            console.log(item);
            item.setInactiveStyles();
        });
        //   this.menuItems.forEach(itemObj => {
        //     // remove all focused item
        //     itemObj.group.children.forEach(item =>{
        //       console.log(' some item ' + item.label);
        //       item.setInactiveStyles();
        //     })

        // });
        this.keyManager = new ActiveDescendantKeyManager(this.menuItems).withWrap(false);
    }

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        if ((this.scrolling && this.scrollLimit === undefined) || (!this.scrolling && this.scrollLimit > 0)) {
            // if scroll limit was not specified but scrolling flag was used, use default value
            // or if scroll limit was specified but scrolling flag was not marked true, even then use default value
            this.scrollLimit = this.numberOfItems; // default
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this.cd.detectChanges();
    }

    ngAfterViewInit() {
        console.log('in menu ' + this.menuItems.length);
        this.initializeKeyManager();
        this.cd.markForCheck();
    }

    ngOnDestroy(): void {
        if (this.target) {
            this.target.nativeElement.removeEventListener('keyup', this.onTargetKeyup);
        }
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
        item.callback();
    }

    isMenuGroup(item: MenuItem | MenuGroup): item is MenuGroup {
        return (item as MenuGroup).children !== undefined;
    }

    processData(data: (MenuItem | MenuGroup)[]): MenuGroup[] {
        const groups: MenuGroup[] = [];
        let newGroup: MenuItem[] = [];

        data.forEach(record => {
            console.log(record.label + 'is the label before pushing');
            if (this.isMenuGroup(record)) {
                if (newGroup.length > 0) {
                    this.numberOfItems++;
                    groups.push({
                        children: newGroup
                    });
                    console.log('group 1 ');
                    console.log(groups);
                    newGroup = [];
                }
                this.numberOfItems++;
                groups.push(record);
                console.log('group 2 ');
                console.log(groups);
            } else {
                this.numberOfItems++;
                newGroup.push(record);
                console.log('group 3 ');
                console.log(groups);
            }
        });
        // if no group headers present
        if (newGroup.length > 0) {
            // this.numberOfItems++;  //todo : check if this is needed. maybe needed.
            groups.push({
                children: newGroup
            });
            console.log('group 4 ');
            console.log(groups);
        }
        return groups;
    }

    isIconPresent() {
        for (const _group of this.groups) {
            if (_group.icon) {
                // console.log('group icon: ' + group.icon);
                this.isIcon = true;
                break;
            } else if (_group.children) {
                for (const item of _group.children) {
                    if (item.icon) {
                        // console.log('item icon: ' + item.icon);
                        this.isIcon = true;
                        break;
                    }
                }
            } else {
                this.isIcon = false;
                break;
            }
        }
        return this.isIcon;
        // return true;
    }

    onTargetKeyup($event: any) {
        console.log('$event keycode ' + $event.keyCode);
        if (this.keyManager.activeItem) {
            console.log('item is ');
            console.log(this.keyManager.activeItem);
        }
        if ($event.keyCode === UP_ARROW || $event.keyCode === DOWN_ARROW) {
            this.keyManager.onKeydown($event);
        } else if ($event.keyCode === ENTER) {
            const activeItem = this.keyManager.activeItem;
            if (activeItem) {
                this.onItemClick(activeItem.item, activeItem.group);
                this.initializeKeyManager();
            }
        }
        this.cd.markForCheck();
    }
}
