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
    menuMap: MenuMap;
    focusedNode: MenuNode;
    activeNodePath: MenuNode[] = [];

    private _menu: MenuComponent;
    private _keyboardHandlerListener: () => void;
    private _destroyOutsideClickListener: () => void;

    constructor(private _renderer: Renderer2,
                private _menuKeyboardService: MenuKeyboardService) { }

    get menu(): MenuComponent {
        return this._menu;
    }

    setFocused(menuItem: MenuItemComponent): void {
        this.focusedNode = this.menuMap.get(menuItem);
        this.focusedNode.item.focus();
    }

    setActive(menuItem: MenuItemComponent): void {
        this._addToActivePath(menuItem);
        this.menu.emitActivePath();
    }

    setMenuRoot(menu: MenuComponent, keyboardSupport: boolean = true): void {
        this._menu = menu;
        this.menuMap = this._buildMenuMap(this._menu);

        if (keyboardSupport) {
            this._setKeyboardSupport();
        }
    }

    setSelectProgrammatic(menuItem: MenuItemComponent): void {
        this._clearMenuState();
        const newPath = [];
        let traverserNode = this.menuMap.get(menuItem);
        do {
            newPath.unshift(traverserNode);
            traverserNode = traverserNode.parent;
        }
        while (traverserNode.parent);
        newPath.forEach(node => this._addToActivePath(node.item));
        this.menu.emitActivePath();
    }

    private _nodeSiblings(node: MenuNode): MenuNode[] {
        return node.parent
            ? node.parent.children
            : this.menuMap.get(null).children;
    }

    private _nodeListIndex(node: MenuNode): number {
        return this._nodeSiblings(node).indexOf(node);
    }

    private _addToActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        this._removeActiveSibling(menuItem);
        this.activeNodePath.push(menuNode);
        menuNode.item.setSelected(true);
        menuNode.item.open();

        if (this.activeNodePath.length === 1) {
            this._listenOnOutsideClick();
        }
    }

    private _removeFromActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const pathIndex = this.activeNodePath.indexOf(menuNode);

        if (pathIndex !== -1) {
            this.activeNodePath.splice(pathIndex)
                .forEach(removedActiveNode => removedActiveNode.item.close());
        }

        if (this.activeNodePath.length === 0) {
            this._destroyOutsideClickListener();
        }
    }

    private _clearMenuState(): void {
        if (this.activeNodePath.length) {
            this._removeFromActivePath(this.activeNodePath[0].item);
        }
    }

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

    private _setKeyboardSupport(): void {
        this._keyboardHandlerListener = this._renderer.listen(
            this.menu.elementRef.nativeElement,
            'keydown',
            (event: KeyboardEvent) => {
                const focusRight = (node) => setTimeout(() => this.setFocused(node.children[0].item));
                let matched = true;

                if (KeyUtil.isKey(event, 'ArrowRight')) {
                    if (this.focusedNode.children.length) {
                        this._addToActivePath(this.focusedNode.item);
                        focusRight(this.focusedNode);
                    }
                } else if (KeyUtil.isKey(event, 'ArrowLeft')) {
                    if (this.focusedNode.parent.item) {
                        this._removeFromActivePath(this.focusedNode.parent.item);
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
                    this._addToActivePath(this.focusedNode.item);
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
}
