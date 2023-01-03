import { ElementRef, Injectable, Optional, Renderer2 } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuComponent } from '../menu.component';
import { KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

interface MenuNode {
    item: MenuItemComponent | null;
    parent: MenuNode | null;
    children: MenuNode[];
}

/** `null` key is used for the root node */
type MenuMap = Map<MenuItemComponent | null, MenuNode>;

@Injectable()
export class MenuService {
    /** Map of menu items to menu nodes */
    menuMap: MenuMap;

    /** Currently focused node */
    focusedNode: MenuNode | undefined;

    /** Collection of active menu nodes */
    activeNodePath: MenuNode[] = [];

    /** Collection of active menu nodes */
    private _isMobileMode = new Subject<boolean>();

    /** @hidden */
    private _menuComponent: MenuComponent;

    /** @hidden */
    private _destroyKeyboardHandlerListener: () => void;

    /** @hidden */
    get _isRtl(): boolean {
        return this._rtlService?.rtl.value;
    }

    /** @hidden */
    constructor(private _renderer: Renderer2, @Optional() private readonly _rtlService: RtlService) {}

    /** Reference to menu component */
    get menuComponent(): MenuComponent {
        return this._menuComponent;
    }

    /** Returns menu mode observable */
    get isMobileMode(): Observable<boolean> {
        return this._isMobileMode.pipe(distinctUntilChanged());
    }

    /** Sets menu mode */
    setMenuMode(value: boolean): void {
        this._isMobileMode.next(value);
    }

    /** Sets given menu item as focused */
    setFocused(menuItem: MenuItemComponent | null): void {
        this.focusedNode = this.menuMap.get(menuItem);
        this.focusedNode?.item?.focus();
    }

    /**
     * Sets state of a given menu item
     * @param isActive - Whether should be set as active or inactive
     * @param menuItem `MenuItemComponent` that should be set as active or inactive
     */
    setActive(isActive: boolean, menuItem: MenuItemComponent | null): void {
        if (!menuItem || (isActive && menuItem.disabled)) {
            return;
        }

        if (isActive) {
            this._addToActivePath(menuItem);
        } else {
            this._removeFromActivePath(menuItem);
        }

        this._emitActivePath();
    }

    /**
     * Close active sibling submenu if any
     * @param menuItem to look for active siblings
     */
    setInactiveSiblingMenuItem(menuItem: MenuItemComponent): void {
        this._removeActiveSibling(menuItem);
        this._emitActivePath();
    }

    /** Initializes menu service based on given Menu Component */
    setMenuComponent(menu: MenuComponent): void {
        this._menuComponent = menu;
        this.menuMap = this._buildMenuMap(this._menuComponent);
    }

    /** Clears Active Node Path and resets Focused Node */
    resetMenuState(): void {
        this._clearActivePath();
        this.focusedNode = undefined;
        this._emitActivePath();
    }

    /** - Updates the structure of the menu
     *  - Validates Active Node Path
     *  - Validates Focused Node */
    rebuildMenu(): void {
        this.menuMap = this._buildMenuMap(this._menuComponent);

        const deadNode = this.activeNodePath.find((node) => !this.menuMap.has(node.item));
        if (deadNode?.item) {
            this.setActive(false, deadNode.item);
        }

        const invalidFocusedElement = this.focusedNode && !this.menuMap.get(this.focusedNode.item);
        if (invalidFocusedElement) {
            this.focusedNode =
                this.activeNodePath[this.activeNodePath.length - 1] || this.menuMap.get(null)!.children[0];
        }
    }

    /** Adds Menu keyboard support */
    addKeyboardSupport(elementRef: ElementRef): void {
        this.removeKeyboardSupport();
        this._setKeyboardSupport(elementRef);
    }

    /** Removes Menu keyboard support */
    removeKeyboardSupport(): void {
        if (this._destroyKeyboardHandlerListener) {
            this._destroyKeyboardHandlerListener();
        }
    }

    /** @hidden */
    onDestroy(): void {
        this.removeKeyboardSupport();
    }

    /** @hidden Returns siblings of given node */
    private _nodeSiblings(node: MenuNode): MenuNode[] | undefined {
        return node.parent ? node.parent.children : this.menuMap.get(null)?.children;
    }

    /** @hidden Adds given element to the Active Node Path and setts as active*/
    private _addToActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);

        this._removeActiveSibling(menuItem);

        if (menuNode) {
            this.activeNodePath.push(menuNode);
            menuNode.item?.setSelected(true);
        }
    }

    /** @hidden Removes given element and all its successors from the Active Node Path and setts as inactive*/
    private _removeFromActivePath(menuItem: MenuItemComponent | null): void {
        const menuNode = this.menuMap.get(menuItem);
        if (menuNode) {
            const pathIndex = this.activeNodePath.findIndex((i) => i.item === menuNode.item);

            if (pathIndex !== -1) {
                this.activeNodePath
                    .splice(pathIndex)
                    .forEach((removedActiveNode) => removedActiveNode.item?.setSelected(false));
            }
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
                    ? menuItem.submenu.menuItems.map((subMenuItem) => buildNode(subMenuItem))
                    : []
            };
        }

        function setParents(node: MenuNode, parent: MenuNode | null): void {
            node.parent = parent;
            node.children.forEach((childNode) => setParents(childNode, node));
        }

        function toMap(node: MenuNode, map = new Map() as MenuMap): MenuMap {
            map.set(node.item, node);
            node.children.forEach((childNode) => toMap(childNode, map));
            return map;
        }

        const rootItems = menu._menuItems.filter((rootItem) => !rootItem.parentSubmenu);

        /** root item */
        const menuTree: MenuNode = {
            item: null,
            parent: null,
            children: rootItems.map((item) => buildNode(item))
        };

        setParents(menuTree, null);

        return toMap(menuTree);
    }

    /** @hidden Removes active sibling of a given menu item from the Active Path */
    private _removeActiveSibling(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const children = menuNode?.parent?.children.map((i) => i.item);
        const activeSibling = this.activeNodePath.find((i) => children?.includes(i.item));

        if (activeSibling) {
            const activeParentIndex = this.activeNodePath.indexOf(menuNode?.parent as MenuNode);
            this._removeFromActivePath(activeParentIndex !== -1 ? activeSibling.item : this.activeNodePath[0].item);
        }
    }

    /** @hidden Adds keyboard support */
    private _setKeyboardSupport(elementRef: ElementRef): void {
        this._destroyKeyboardHandlerListener = this._renderer.listen(
            elementRef.nativeElement,
            'keydown',
            (event: KeyboardEvent) => this._handleKey(event)
        );
    }

    /** @hidden */
    private _handleKey(event: KeyboardEvent): void {
        const focusRight = (node): void => {
            setTimeout(() => this.setFocused(node.children[0].item));
        };
        let matched = true;

        if (!this.focusedNode) {
            return;
        }

        if (
            (KeyUtil.isKeyCode(event, RIGHT_ARROW) && !this._isRtl) ||
            (KeyUtil.isKeyCode(event, LEFT_ARROW) && this._isRtl)
        ) {
            if (this.focusedNode?.children.length) {
                this.setActive(true, this.focusedNode.item);
                focusRight(this.focusedNode);
            }
        } else if (
            (KeyUtil.isKeyCode(event, LEFT_ARROW) && !this._isRtl) ||
            (KeyUtil.isKeyCode(event, RIGHT_ARROW) && this._isRtl)
        ) {
            if (this.focusedNode.parent?.item) {
                this.setActive(false, this.focusedNode.parent.item);
                this.setFocused(this.focusedNode.parent.item);
            }
        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            const closest = this._closestEnabled(this.focusedNode, 'down');
            if (closest) {
                this.setFocused(closest.item);
            }
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            const closest = this._closestEnabled(this.focusedNode, 'up');
            if (closest) {
                this.setFocused(closest.item);
            }
        } else if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            const focusedNode = this.focusedNode;
            this.setActive(true, focusedNode?.item);
            focusedNode.item?.click();
            if (focusedNode.children.length) {
                focusRight(focusedNode);
            }
        } else if (KeyUtil.isKeyCode(event, ESCAPE) && this.menuComponent.closeOnEscapeKey) {
            this.menuComponent.close();
        } else {
            matched = false;
        }

        if (matched) {
            event.preventDefault();
        }
    }

    /** @hidden Emits an array of active menu items */
    private _emitActivePath(): void {
        this.menuComponent.activePath.emit(this.activeNodePath.map((node) => node.item) as MenuItemComponent[]);
    }

    /** @hidden Depending on direction returns closest enabled sibling of given node */
    private _closestEnabled(node: MenuNode, direction: 'up' | 'down'): MenuNode | null {
        const siblings =
            direction === 'up' ? [...(this._nodeSiblings(node) ?? [])].reverse() : this._nodeSiblings(node);

        if (siblings) {
            const startIndex = siblings.indexOf(node) + 1;

            for (let i = startIndex; i < siblings.length; i++) {
                if (siblings[i].item && !siblings[i].item!.disabled) {
                    return siblings[i];
                }
            }
        }

        return null;
    }
}
