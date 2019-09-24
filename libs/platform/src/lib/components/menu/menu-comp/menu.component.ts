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
import {
  ActiveDescendantKeyManager
} from '@angular/cdk/a11y';
import {
  MenuItemComponent
} from './menu-item.component';
import { UP_ARROW, DOWN_ARROW, ENTER } from '@angular/cdk/keycodes';

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


  secondaryIcon?: string;

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
  isRadioGroup?: boolean;

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
})
export class MenuComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  /**
   * Add separating line between menu items. [Default: false]
   */
  @Input() public separator = false;

  /**
   * Display menu groups as columns. [Default: false]
   */
  @Input() public useColumns = false;

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

  public groups: MenuGroup[];
  private target: ElementRef;
  private isIcon: boolean = false;
  private numberOfItems: number = 0;

  @ViewChildren(MenuItemComponent) public menuItems: QueryList<MenuItemComponent>;
  private keyManager: ActiveDescendantKeyManager<MenuItemComponent>;

  /**
   * Load menu data.
   * @param data Data can be either array of MenuItems or array of MenuGroups.
   */
  @Input() load = (data: (MenuItem | MenuGroup)[]) => {
    this.groups = this.processData(data);
    this.cd.detectChanges();
  }

  /**
   * Registers 'keyup' event listener on provided element.
   */
  @Input() registerKeyupListener = (elem: ElementRef) => {
    if (this.target) {
      this.target.nativeElement.removeEventListener('keyup', this.onTargetKeyup);
    }
    this.target = elem;
    this.target.nativeElement.addEventListener('keyup', this.onTargetKeyup.bind(this));
  }

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.scrollLimit = this.numberOfItems; //default
  }

  ngOnDestroy() {
    if (this.target) {
      this.target.nativeElement.removeEventListener('keyup', this.onTargetKeyup);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cd.detectChanges();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.initializeKeyManager();
  }

  onTargetKeyup($event: any) {
    if ($event.keyCode === UP_ARROW || $event.keyCode === DOWN_ARROW) {
      console.log('key up or down');

      this.keyManager.onKeydown($event);
    } else if ($event.keyCode === ENTER) {
      console.log('enter pressed');

      const activeItem = this.keyManager.activeItem;
      if (activeItem) {
        this.onItemClick(activeItem.item, activeItem.group);
        this.initializeKeyManager();
      }
    }
    this.cd.detectChanges();
  }

  onItemClick(item: MenuItem, group: MenuGroup): void {
    if (group.isRadioGroup) {
      group.children.forEach(record => {
        record.selected = false;
      });
    }
    if (item.selectable) {
      item.selected = !item.selected;
      this.cd.detectChanges();
    }
    item.callback();
  }

  initializeKeyManager(): void {
    this.menuItems.forEach(item => item.setInactiveStyles());
    this.keyManager = new ActiveDescendantKeyManager(this.menuItems).withWrap();
  }

  isMenuGroup(item: MenuItem | MenuGroup): item is MenuGroup {
    return (item as MenuGroup).children !== undefined;
  }

  processData(data: (MenuItem | MenuGroup)[]): MenuGroup[] {
    const groups: MenuGroup[] = [];
    let newGroup: MenuItem[] = [];

    data.forEach(record => {
      if (this.isMenuGroup(record)) {
        if (newGroup.length > 0) {
          this.numberOfItems++;
          groups.push({
            children: newGroup
          });
          newGroup = [];
        }
        this.numberOfItems++;
        groups.push(record);
      } else {
        this.numberOfItems++;
        newGroup.push(record);
      }
    });
    //if no group headers present
    if (newGroup.length > 0) {
      // this.numberOfItems++;
      groups.push({
        children: newGroup
      });
    }
    return groups;
  }

  isIconPresent() {
    // for (const group of this.groups) {
    //   console.log('group icon: ' + group.icon);
    //   if (group.icon) {
    //     this.isIcon = true;
    //     break;
    //   } else if (group.children) {
    //     for (const item of group.children) {
    //       console.log('item icon: ' + item.icon);
    //       if (item.icon) {
    //         this.isIcon = true;
    //         break;
    //       }
    //     }
    //   } else {
    //     this.isIcon = false;
    //     break;
    //   }
    // }
    // return this.isIcon;
    return true;
  }

}
