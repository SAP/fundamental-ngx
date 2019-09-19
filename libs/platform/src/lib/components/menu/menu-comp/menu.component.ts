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
 * <af-menu separate-items="true" use-columns="true"></af-menu>
 * ```
 *
 * Menu item/group data should be provided to `<af-menu>` using its `load` method.
 *
 * ```javascript
 * var menu = document.getElementByTagName('af-menu')[0];
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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MenuComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  /**
   * Add separating line between menu items. [Default: false]
   */
  @Input() public separateItems = false;

  /**
   * Display menu groups as columns. [Default: false]
   */
  @Input() public useColumns = false;

  /**
   * Alignment of menu items; either "left", "right" or "inherit".
   * [Default "inherit"]
   */
  @Input() public textAlign: string;

  public groups: MenuGroup[];
  private target: ElementRef;

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
    console.log("@@@@@@ in menu oninit");
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
      this.keyManager.onKeydown($event);
    } else if ($event.keyCode === ENTER) {
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
          groups.push({
            children: newGroup
          });
          newGroup = [];
        }
        groups.push(record);
      } else {
        newGroup.push(record);
      }
    });
    if (newGroup.length > 0) {
      groups.push({
        children: newGroup
      });
    }
    return groups;
  }

}
