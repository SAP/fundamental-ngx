import { Injectable, Renderer2 } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu.component';
import { KeyUtil, MenuKeyboardService } from '@fundamental-ngx/core';

interface MenuNode {
    item: MenuItemComponent;
    parent: MenuNode;
    children: MenuNode[];
}

type MenuMap = Map<MenuItemComponent, MenuNode>

@Injectable()
export class MenuService {
    /** Map of menu nodes
     * Key - Menu item
     * Value - Menu node*/
    menuMap: MenuMap;

    /** Currently focused node */
    focusedNode: MenuNode;

    /** Collection of active menu nodes */
    activeNodePath: MenuNode[] = [];

    /** @hidden */
    private _menu: MenuComponent;

    /** @hidden */
    private _destroyOutsideClickListener: () => void;

    /** @hidden */
    private _destroyKeyboardHandlerListener: () => void;

    constructor(private _renderer: Renderer2,
                private _menuKeyboardService: MenuKeyboardService) { }

    /** Reference to menu component */
    get menu(): MenuComponent {
        return this._menu;
    }

    /** Sets given menu item as focused */
    setFocused(menuItem: MenuItemComponent): void {
        this.focusedNode = this.menuMap.get(menuItem);
        this.focusedNode.item.focus();
    }

    /** Sets state of a given menu item
     * @param isActive - Whether should be set as active or inactive*/
    setActive(isActive: boolean, menuItem: MenuItemComponent): void {
        if (isActive) {
            this._addToActivePath(menuItem)
        } else {
            this._removeFromActivePath(menuItem);
        }
        this._emitActivePath();
    }

    /** Initializes menu service based on given Menu Component */
    setMenuRoot(menu: MenuComponent, keyboardSupport: boolean = true): void {
        this._menu = menu;
        this.menuMap = this._buildMenuMap(this._menu);

        if (keyboardSupport) {
            this._setKeyboardSupport();
        }
    }

    /** Sets given menu item as active and recreates the Active Path */
    setSelectProgrammatic(menuItem: MenuItemComponent): void {
        this._clearActivePath();
        const newPath = [];
        let traverserNode = this.menuMap.get(menuItem);
        do {
            newPath.unshift(traverserNode);
            traverserNode = traverserNode.parent;
        }
        while (traverserNode.parent);
        newPath.forEach(node => this._addToActivePath(node.item));
        this._emitActivePath();
    }

    /** - Clears Active Node Path
     *  - Resets Focused Node */
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
            this._removeFromActivePath(deadNode.item);
            const invalidFocusedElement = this.focusedNode
                && this.focusedNode.parent !== null
                && this.activeNodePath.indexOf(this.focusedNode.parent) === -1;
            if (invalidFocusedElement) {
                this.focusedNode = this.activeNodePath[0] || this.menuMap.get(null).children[0];
            }
        }
    }

    /** @hidden Whether outside click listener should be added/removed */
    private _canOutsideClickListener(action: 'add' | 'remove'): boolean {
        return action === 'add'
            ? this.menu.closeOnOutsideClick && this.activeNodePath.length === 1
            : this.activeNodePath.length === 0 && !!this._destroyOutsideClickListener;
    }

    /** @hidden Returns siblings of given node */
    private _nodeSiblings(node: MenuNode): MenuNode[] {
        return node.parent
            ? node.parent.children
            : this.menuMap.get(null).children;
    }

    /** @hidden Returns index of given node in local menu list */
    private _nodeListIndex(node: MenuNode): number {
        return this._nodeSiblings(node).indexOf(node);
    }

    /** @hidden
     * - Adds given element to the Active Node Path
     * - Setts given element as active
     * - Conditionally adds outside click listener */
    private _addToActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        this._removeActiveSibling(menuItem);
        this.activeNodePath.push(menuNode);
        menuNode.item.setSelected(true);
        menuNode.item.open();

        if (this._canOutsideClickListener('add')) {
            this._listenOnOutsideClick();
        }
    }

    /** @hidden
     * - Removes given element and all its successors from the Active Node Path
     * - Setts given element as inactive
     * - Conditionally removes outside click listener */
    private _removeFromActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const pathIndex = this.activeNodePath.indexOf(menuNode);

        if (pathIndex !== -1) {
            this.activeNodePath.splice(pathIndex)
                .forEach(removedActiveNode => removedActiveNode.item.close());
        }

        if (this._canOutsideClickListener('remove')) {
            this._destroyOutsideClickListener();
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
                children: menuItem.subMenu
                    ? menuItem.subMenu.menuItems.toArray().map(subMenuItem => buildNode(subMenuItem))
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

    /** @hidden Creates outside click listener */
    private _listenOnOutsideClick(): void {
        this._destroyOutsideClickListener = this._renderer.listen('document', 'click', (event: MouseEvent) => {
                const isOutsideClick = !this.activeNodePath[this.activeNodePath.length - 1].item.elementRef.nativeElement
                    .contains(event.target);

                if (isOutsideClick) {
                    this._removeFromActivePath(this.activeNodePath[0].item);
                }
            }
        );
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
            (event: KeyboardEvent) => {
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
                    const index = this._nodeListIndex(this.focusedNode);
                    const siblings = this._nodeSiblings(this.focusedNode);
                    if (index < siblings.length - 1) {
                        this.setFocused(siblings[index + 1].item);
                    }
                } else if (KeyUtil.isKey(event, 'ArrowUp')) {
                    const index = this._nodeListIndex(this.focusedNode);
                    const siblings = this._nodeSiblings(this.focusedNode);
                    if (index > 0) {
                        this.setFocused(siblings[index - 1].item);
                    }
                } else if (KeyUtil.isKey(event, [' ', 'Enter'])) {
                    this.setActive(true, this.focusedNode.item);
                    this.focusedNode.item.click();
                    if (this.focusedNode.children.length) {
                        focusRight(this.focusedNode);
                    }
                } else if (KeyUtil.isKey(event, 'Escape')) {
                    this.menu.close();
                } else {
                    matched = false;
                }

                if (matched) {
                    event.preventDefault();
                }
            }
        );
    }

    /** @hidden Emits an array of active menu items */
    private _emitActivePath(): void {
        this.menu.activePath.emit(
            this.activeNodePath.map(node => node.item)
        );
    }
}
