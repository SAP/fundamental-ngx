import { Injectable, Renderer2 } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu.component';

interface MenuNode {
    item: MenuItemComponent;
    parent: MenuNode;
    children: MenuNode[];
}

type MenuMap = Map<MenuItemComponent, MenuNode>

@Injectable()
export class MenuService {
    menuMap: MenuMap;
    activeNodePath: MenuNode[] = [];

    private _menu: MenuComponent;
    private _destroyOutsideClickListener: () => void;

    constructor(private _renderer: Renderer2) {}

    get menu(): MenuComponent {
        return this._menu;
    }

    setActive(isActive: boolean, menuItem: MenuItemComponent): void {
        if (isActive) {
            this._addToActivePath(menuItem);
        } else {
            this._removeFromActivePath(menuItem);
        }
    }

    setMenuRoot(menu: MenuComponent): void {
        this._menu = menu;
        this.menuMap = this._buildMenuMap(this._menu);
    }

    private _addToActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        this._removeActiveSibling(menuItem);
        this.activeNodePath.push(menuNode);
        menuNode.item.open();

        if (this.activeNodePath.length === 1) {
            this._addListenerForOutsideClick();
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

    private _addListenerForOutsideClick(): void {
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
}
