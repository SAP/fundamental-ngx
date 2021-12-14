import { ElementRef, EventEmitter, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/core/utils';

import { MenuItemComponent } from '../menu-item/menu-item.component';
import { MenuInterface } from '../menu.interface';

interface MenuNode {
    item: MenuItemComponent;
    parent: MenuNode;
    children: MenuNode[];
}

type MenuMap = Map<MenuItemComponent, MenuNode>;

@Injectable()
export class MenuService implements OnDestroy {
    /** Map of menu items to menu nodes */
    menuMap: MenuMap;

    /** Currently focused node */
    focusedNode: MenuNode;

    /** Collection of active menu nodes */
    activeNodePath: MenuNode[] = [];

    /** Collection of active menu nodes */
    private _isMobileMode$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /** @hidden */
    private _menu: MenuInterface;

    /** @hidden */
    private _destroyKeyboardHandlerListener: () => void | null;

    /** @hidden */
    constructor(private _renderer: Renderer2) {}

    /** Reference to menu component */
    get menu(): MenuInterface {
        return this._menu;
    }

    /** Returns menu mode observable */
    get isMobileMode(): Observable<boolean> {
        return this._isMobileMode$.asObservable().pipe(distinctUntilChanged());
    }

    /**
     * Returns isMobile mode flag
     * @hidden
     */
    get _isMobileMode(): boolean {
        return this._isMobileMode$.value;
    }

    /** Sets menu mode */
    setMenuMode(value: boolean): void {
        this._isMobileMode$.next(value);
    }

    /** Sets given menu item as focused */
    setFocused(menuItem: MenuItemComponent): void {
        this.focusedNode = this.menuMap.get(menuItem);
        this.focusedNode.item.focus();
    }

    /**
     * Sets state of a given menu item
     * @param isActive - Whether should be set as active or inactive
     * @param menuItem `MenuItemComponent` that should be set as active or inactive
     */
    setActive(isActive: boolean, menuItem: MenuItemComponent): void {
        if (isActive && menuItem.disabled) {
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
    setMenuRoot(menu: MenuInterface): void {
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

        const deadNode = this.activeNodePath.find((node) => !this.menuMap.has(node.item));
        if (deadNode) {
            this.setActive(false, deadNode.item);
        }

        const invalidFocusedElement = this.focusedNode && !this.menuMap.get(this.focusedNode.item);
        if (invalidFocusedElement) {
            this.focusedNode =
                this.activeNodePath[this.activeNodePath.length - 1] || this.menuMap.get(null).children[0];
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
            this._destroyKeyboardHandlerListener = null;
        }
    }

    /**
     * Go back to the parent item
     * and move focus on it.
     * Similar behavior as Left Arrow Key
     */
    goBackToParentMenuItem(): void {
        const parentItem = this.activeNodePath.slice(-1)[0]?.item;
        if (!parentItem) {
            return;
        }
        this.setActive(false, parentItem);
        this._delayedFocusOnMenuItem(parentItem, this._isMobileMode);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._isMobileMode$.complete();
        this.removeKeyboardSupport();
    }

    /** @hidden Returns siblings of given node */
    private _nodeSiblings(node: MenuNode): MenuNode[] {
        return node.parent ? node.parent.children : this.menuMap.get(null).children;
    }

    /** @hidden Adds given element to the Active Node Path and sets as active */
    private _addToActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        this._removeActiveSibling(menuItem);
        this.activeNodePath.push(menuNode);
        menuNode.item.setSelected(true);
    }

    /** @hidden Removes given element and all its successors from the Active Node Path and setts as inactive*/
    private _removeFromActivePath(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const pathIndex = this.activeNodePath.findIndex((i) => i.item === menuNode.item);

        if (pathIndex !== -1) {
            this.activeNodePath
                .splice(pathIndex)
                .forEach((removedActiveNode) => removedActiveNode.item.setSelected(false));
        }
    }

    /** @hidden Removes all elements from the Active Node Path and sets them as closed */
    private _clearActivePath(): void {
        if (this.activeNodePath.length) {
            this._removeFromActivePath(this.activeNodePath[0].item);
        }
    }

    /**
     * @hidden
     * - Builds Menu Nodes based on Menu Items
     * - Creates Map of the Menu Nodes */
    private _buildMenuMap(menu: MenuInterface): MenuMap {
        function buildNode(menuItem: MenuItemComponent): MenuNode {
            return {
                item: menuItem,
                parent: null,
                children: menuItem.submenu
                    ? menuItem.submenu.menuItems.toArray().map((subMenuItem) => buildNode(subMenuItem))
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
            children: menu.menuItems.toArray().map((item) => buildNode(item))
        };

        setParents(menuTree, null);

        return toMap(menuTree);
    }

    /** @hidden Removes active sibling of a given menu item from the Active Path */
    private _removeActiveSibling(menuItem: MenuItemComponent): void {
        const menuNode = this.menuMap.get(menuItem);
        const children = menuNode.parent.children.map((i) => i.item);
        const activeSibling = this.activeNodePath.find((i) => children.includes(i.item));
        const activeParentIndex = this.activeNodePath.indexOf(menuNode.parent);

        if (activeSibling) {
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

    /**
     * Delayed focus on menu item.
     * @param item MenuItemComponent to focus on
     * @param delayed when focus must be delayed to the next tick
     */
    private _delayedFocusOnMenuItem(item: MenuItemComponent, delayed: boolean) {
        delayed ? setTimeout(() => this.setFocused(item)) : this.setFocused(item);
    }

    /** @hidden */
    private _handleKey(event: KeyboardEvent): void {
        let matched = true;

        if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            if (this.focusedNode.children.length) {
                this.setActive(true, this.focusedNode.item);
                this._delayedFocusOnMenuItem(this.focusedNode.children[0].item, true);
            }
        } else if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            if (this.focusedNode.parent.item) {
                this.setActive(false, this.focusedNode.parent.item);
                this._delayedFocusOnMenuItem(this.focusedNode.parent.item, this._isMobileMode);
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
            this.setActive(true, focusedNode.item);
            focusedNode.item.click();
            if (focusedNode.children.length) {
                this._delayedFocusOnMenuItem(focusedNode.children[0].item, true);
            }
        } else if (KeyUtil.isKeyCode(event, ESCAPE) && this.menu.closeOnEscapeKey) {
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
        this.menu.activePath.emit(this.activeNodePath.map((node) => node.item));
    }

    /** @hidden Depending on direction returns closest enabled sibling of given node */
    private _closestEnabled(node: MenuNode, direction: 'up' | 'down'): MenuNode | null {
        const siblings = direction === 'up' ? [...this._nodeSiblings(node)].reverse() : this._nodeSiblings(node);

        const startIndex = siblings.indexOf(node) + 1;

        for (let i = startIndex; i < siblings.length; i++) {
            if (!siblings[i].item.disabled) {
                return siblings[i];
            }
        }

        return null;
    }
}
