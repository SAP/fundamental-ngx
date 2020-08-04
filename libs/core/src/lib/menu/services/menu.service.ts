import { Injectable, Renderer2 } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu.component';
import { KeyUtil } from '../../utils/functions/key-util';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

interface MenuNode {
    item: MenuItemComponent;
    parent: MenuNode;
    children: MenuNode[];
}

type MenuMap = Map<MenuItemComponent, MenuNode>

@Injectable()
export class MenuService {
    /** Map of menu items to menu nodes */
    menuMap: MenuMap;

    /** Currently focused node */
    focusedNode: MenuNode;

    /** Collection of active menu nodes */
    activeNodePath: MenuNode[] = [];

    /** Collection of active menu nodes */
    private _isMobileMode: Subject<boolean> = new Subject();

    /** @hidden */
    private _menu: MenuComponent;

    /** @hidden */
    private _destroyKeyboardHandlerListener: () => void;

    constructor(private _renderer: Renderer2) { }

    /** Reference to menu component */
    get menu(): MenuComponent {
        return this._menu;
    }

    /** Returns menu mode observable */
    get isMobileMode(): Observable<boolean> {
        return this._isMobileMode.asObservable()
            .pipe(distinctUntilChanged())
    }

    /** Sets menu mode */
    setMenuMode(value: boolean): void {
        this._isMobileMode.next(value);
    }

    /** Sets given menu item as focused */
    setFocused(menuItem: MenuItemComponent): void {
        this.focusedNode = this.menuMap.get(menuItem);
        this.focusedNode.item.focus();
    }

    /** Sets state of a given menu item
     * @param isActive - Whether should be set as active or inactive*/
    setActive(isActive: boolean, menuItem: MenuItemComponent): void {
        if (isActive && menuItem.disabled) {
            return;
        }

        if (isActive) {
            this._addToActivePath(menuItem)
        } else {
            this._removeFromActivePath(menuItem);
        }
        this._emitActivePath();
    }

    /** Initializes menu service based on given Menu Component */
    setMenuRoot(menu: MenuComponent): void {
        this._menu = menu;
        this.menuMap = this._buildMenuMap(this._menu);
    }

    /** Clears Active Node Path and resets Focused Node */
    resetMenuState(): void {
        this._clearActivePath();
        this.focusedNode = null;
        this._emitActivePath();
    }

    /** - Updates the structure of the menu
     *  - Validates Active Node Path
     *  - Validates Focused Node */
    rebuildMenu(): void {
        this.menuMap = this._buildMenuMap(this._menu);

        const deadNode = this.activeNodePath.find(node => !this.menuMap.has(node.item));
        if (deadNode) {
            this.setActive(false, deadNode.item);
        }

        const invalidFocusedElement = this.focusedNode && !this.menuMap.get(this.focusedNode.item);
        if (invalidFocusedElement) {
            this.focusedNode = this.activeNodePath[this.activeNodePath.length - 1] || this.menuMap.get(null).children[0];
        }
    }

    /** Adds Menu keyboard support */
    addKeyboardSupport(): void {
        this.removeKeyboardSupport();
        this._setKeyboardSupport();
    }

    /** Removes Menu keyboard support */
    removeKeyboardSupport(): void {
        if (this._destroyKeyboardHandlerListener) {
            this._destroyKeyboardHandlerListener();
        }
    }

    onDestroy(): void {
        this.removeKeyboardSupport();
    }

    /** @hidden Returns siblings of given node */
    private _nodeSiblings(node: MenuNode): MenuNode[] {
        return node.parent
            ? node.parent.children
            : this.menuMap.get(null).children;
    }

    /** @hidden Adds given element to the Active Node Path and setts as active*/
    private _addToActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        this._removeActiveSibling(menuItem);
        this.activeNodePath.push(menuNode);
        menuNode.item.setSelected(true);
    }

    /** @hidden Removes given element and all its successors from the Active Node Path and setts as inactive*/
    private _removeFromActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const pathIndex = this.activeNodePath.indexOf(menuNode);

        if (pathIndex !== -1) {
            this.activeNodePath.splice(pathIndex)
                .forEach(removedActiveNode => removedActiveNode.item.setSelected(false))
        }
    }

    /** @hidden Removes all elements from the Active Node Path and sets them as closed */
    private _clearActivePath(): void {
        if (this.activeNodePath.length) {
            this._removeFromActivePath(this.activeNodePath[0].item);
        }
    }

    /** @hidden
     * - Builds Menu Nodes based on Menu Items
     * - Creates Map of the Menu Nodes */
    private _buildMenuMap(menu: MenuComponent): MenuMap {

        function buildNode(menuItem: MenuItemComponent): MenuNode {
            return {
                item: menuItem,
                parent: null,
                children: menuItem.submenu
                    ? menuItem.submenu.menuItems.toArray().map(subMenuItem => buildNode(subMenuItem))
                    : []
            }
        }

        function setParents(node: MenuNode, parent: MenuNode): void {
            node.parent = parent;
            node.children.forEach(childNode => setParents(childNode, node));
        }

        function toMap(node: MenuNode, map = new Map() as MenuMap): MenuMap {
            map.set(node.item, node);
            node.children.forEach(childNode => toMap(childNode, map));
            return map;
        }

        const menuTree: MenuNode = {
            item: null,
            parent: null,
            children: menu.menuItems.toArray().map(item => buildNode(item))
        };

        setParents(menuTree, null);
        return toMap(menuTree);
    }

    /** @hidden Removes active sibling of a given menu item from the Active Path */
    private _removeActiveSibling(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const activeSibling = menuNode.parent.children.find(childNode => this.activeNodePath.indexOf(childNode) !== -1);
        const activeParentIndex = this.activeNodePath.indexOf(menuNode.parent);

        if (activeSibling) {
            this._removeFromActivePath(activeParentIndex !== -1
                ? activeSibling.item
                : this.activeNodePath[0].item
            );
        }
    }

    /** @hidden Adds keyboard support */
    private _setKeyboardSupport(): void {
        this._destroyKeyboardHandlerListener = this._renderer.listen(
            this.menu.elementRef.nativeElement,
            'keydown',
            (event: KeyboardEvent) => this._handleKey(event)
        );
    }

    private _handleKey(event: KeyboardEvent): void {
        const focusRight = (node) => setTimeout(() => this.setFocused(node.children[0].item));
        let matched = true;

        if (KeyUtil.isKey(event, 'ArrowRight')) {
            if (this.focusedNode.children.length) {
                this.setActive(true, this.focusedNode.item);
                focusRight(this.focusedNode);
            }
        } else if (KeyUtil.isKey(event, 'ArrowLeft')) {
            if (this.focusedNode.parent.item) {
                this.setActive(false, this.focusedNode.parent.item);
                this.setFocused(this.focusedNode.parent.item);
            }
        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            const closest = this._closestEnabled(this.focusedNode, 'down');
            if (closest) {
                this.setFocused(closest.item);
            }
        } else if (KeyUtil.isKey(event, 'ArrowUp')) {
            const closest = this._closestEnabled(this.focusedNode, 'up');
            if (closest) {
                this.setFocused(closest.item);
            }
        } else if (KeyUtil.isKey(event, [' ', 'Enter'])) {
            this.setActive(true, this.focusedNode.item);
            this.focusedNode.item.click();
            if (this.focusedNode.children.length) {
                focusRight(this.focusedNode);
            }
        } else if (KeyUtil.isKey(event, 'Escape') && this.menu.closeOnEscapeKey) {
            this.menu.close();
        } else {
            matched = false;
        }

        if (matched) {
            event.preventDefault();
        }
    }

    /** @hidden Emits an array of active menu items */
    private _emitActivePath(): void {
        this.menu.activePath.emit(
            this.activeNodePath.map(node => node.item)
        );
    }

    /** @hidden Depending on direction returns closest enabled sibling of given node */
    private _closestEnabled(node: MenuNode, direction: 'up' | 'down'): MenuNode | null {
        const siblings = direction === 'up'
            ? [...this._nodeSiblings(node)].reverse()
            : this._nodeSiblings(node);

        const startIndex = siblings.indexOf(node) + 1;

        for (let i = startIndex; i < siblings.length; i++) {
            if (!siblings[i].item.disabled) {
                return siblings[i];
            }
        }

        return null;
    };
}
