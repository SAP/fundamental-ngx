import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserActionsMenuItemDirective } from '../directives/user-actions-menu-item.directive';
import { UserActionsMenuComponent } from '../components/user-actions-menu/user-actions-menu.component';
import { UserActionsSubmenuComponent } from '../components/user-actions-submenu/user-actions-submenu.component';

interface MenuNode {
    item: UserActionsMenuItemDirective;
    parent: MenuNode;
    children: MenuNode[];
}

type MenuMap = Map<UserActionsMenuItemDirective, MenuNode>;
@Injectable()
export class UserActionsMenuService {
    /** Map of menu items to menu nodes */
    menuMap: MenuMap;

    /** Reference to menu component */
    get menu(): UserActionsMenuComponent {
        return this._menu;
    }

    /** @hidden Is submenu */
    isSubmenu$: Observable<boolean>;

    /** @hidden Is compact */
    isCompact$: Observable<boolean>;

    /** Collection of active menu nodes */
    activeNodePath: MenuNode[] = [];

    /** @hidden */
    private _menu: UserActionsMenuComponent;

    /** @hidden */
    private _isSubmenu$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    private _isCompact$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    constructor() {
        this.isSubmenu$ = this._isSubmenu$.asObservable();
        this.isCompact$ = this._isCompact$.asObservable();
    }

    /** @hidden Initializes compact mode */
    setCompactMode(isCompact = false): void {
        this._isCompact$.next(isCompact);
    }

    /** @hidden Initializes menu service based on given Menu Component */
    setMenuRoot(menu: UserActionsMenuComponent): void {
        this._menu = menu;
        this.menuMap = this._buildMenuMap(this._menu);
    }

    /** @hidden Get active submenu  */
    getActiveSubmenu(): UserActionsSubmenuComponent | undefined {
        const { item } = this.activeNodePath[this.activeNodePath.length - 1];

        return item ? item.submenu : null;
    }

    /** @hidden Sets state of a given menu item
     * @param isActive - Whether should be set as active or inactive*/
    setActive(isActive: boolean, menuItem: UserActionsMenuItemDirective): void {
        if (isActive) {
            this._addToActivePath(menuItem);

            return;
        }

        this._removeFromActivePath(menuItem);

        const activeNodePathLength = this.activeNodePath.length;
        if (activeNodePathLength > 0) {
            this._addToActivePath(this.activeNodePath[activeNodePathLength - 1].item);
        } else {
            this.menu.activeSubmenu = null;
            this._isSubmenu$.next(false);
        }
    }

    /** @hidden Clears Active Node Path and resets Focused Node */
    resetMenuState(): void {
        this._clearActivePath();
    }

    /** @hidden Removes all elements from the Active Node Path and sets them as closed */
    private _clearActivePath(): void {
        if (this.activeNodePath.length > 0) {
            this._removeFromActivePath(this.activeNodePath[0].item);
            this._isSubmenu$.next(false);
        }
    }

    /** @hidden
     * - Builds Menu Nodes based on Menu Items
     * - Creates Map of the Menu Nodes */
    private _buildMenuMap(menu: UserActionsMenuComponent): MenuMap {
        const _that = this;

        function setMenuService(menuItem: UserActionsMenuItemDirective): void {
            menuItem._menuService = _that;

            if (menuItem.submenu) {
                menuItem.submenu._menuService = _that;
            }
        }

        function buildNode(menuItem: UserActionsMenuItemDirective): MenuNode {
            setMenuService(menuItem);

            return {
                item: menuItem,
                parent: null,
                children: menuItem.submenu
                    ? menuItem.submenu._items.toArray().map((subMenuItem) => buildNode(subMenuItem))
                    : []
            };
        }

        function setParents(node: MenuNode, parent: MenuNode): void {
            node.parent = parent;
            node.children.forEach((childNode) => setParents(childNode, node));
        }

        function toMap(node: MenuNode, map = new Map() as MenuMap): MenuMap {
            map.set(node.item, node);
            node.children.forEach((childNode) => toMap(childNode, map));

            return map;
        }

        const menuTree: MenuNode = {
            item: null,
            parent: null,
            children: menu._items.toArray().map((item) => buildNode(item))
        };

        setParents(menuTree, null);

        return toMap(menuTree);
    }

    /** @hidden Adds given element to the Active Node Path and setts as active*/
    private _addToActivePath(menuItem: UserActionsMenuItemDirective): void {
        const menuNode = this.menuMap.get(menuItem);
        this._removeActiveSibling(menuItem);
        this.activeNodePath.push(menuNode);

        this._isSubmenu$.next(this.activeNodePath.length > 0);

        this.menu.activeSubmenu = menuNode.item.submenu;
    }

    /** @hidden Removes active sibling of a given menu item from the Active Path */
    private _removeActiveSibling(menuItem: UserActionsMenuItemDirective): void {
        const menuNode = this.menuMap.get(menuItem);
        const activeSibling = menuNode.parent.children.find(
            (childNode) => this.activeNodePath.indexOf(childNode) !== -1
        );
        const activeParentIndex = this.activeNodePath.indexOf(menuNode.parent);

        if (activeSibling) {
            this._removeFromActivePath(activeParentIndex !== -1 ? activeSibling.item : this.activeNodePath[0].item);
        }
    }

    /** @hidden Removes given element and all its successors from the Active Node Path and setts as inactive*/
    private _removeFromActivePath(menuItem: UserActionsMenuItemDirective): void {
        const menuNode = this.menuMap.get(menuItem);
        const pathIndex = this.activeNodePath.indexOf(menuNode);

        if (pathIndex !== -1) {
            this.activeNodePath.splice(pathIndex);
        }
    }
}
