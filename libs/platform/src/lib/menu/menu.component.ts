/**
 * @license
 * Copyright (c) 2010-2020 SAP
 * Copyright (c) 2010-2020 Google LLC. http://angular.io/license
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { merge, Observable, Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

import { KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { MenuItemComponent } from './menu-item.component';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

export type MenuCloseMethod = void | 'mouse' | 'keyboard' | 'tab' | 'arrow';

/**
 * Variables for generating menu IDs.
 * Needed for establishing 'aria-control' between trigger and menu.
 */
const MENU_ID_ROOT = 'fdp-menu-';
let menuIdCounter = 0;

@Component({
    selector: 'fdp-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [contentDensityObserverProviders()]
})
export class MenuComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    /** Menu ID */
    @Input()
    set id(id: string) {
        this._id = id;

        // Use 'id' property to create menu ID for aria-control purposes.
        this.menuId = MENU_ID_ROOT + id;
    }
    get id(): string {
        return this._id;
    }

    /**
     * Whether menu can be opened using arrow keys
     * @default true
     */
    @Input()
    openByArrowKeys = true;

    /**
     * Horizontal position of menu in relation to trigger element.
     */
    @Input()
    xPosition: 'before' | 'after' = 'after';

    /**
     * The templateRef needs to be available to the menu trigger for
     * opening in a CDK overlay.
     */
    @ViewChild('menuTemplate', { static: false })
    templateRef: TemplateRef<any>;

    /**
     * Child items of the menu.
     */
    @ContentChildren(MenuItemComponent)
    menuItems: QueryList<MenuItemComponent>;

    /**
     * Emitted event when menu closes
     */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-native
    close: EventEmitter<MenuCloseMethod> = new EventEmitter();

    /** Menu direction */
    direction: 'ltr' | 'rtl' = 'ltr';

    /** @hidden */
    menuId: string;

    /** @hidden */
    private _id: string;

    /** @hidden */
    private _keyManager: FocusKeyManager<MenuItemComponent>;

    /** @hidden */
    private _tabSubscription = Subscription.EMPTY;

    /** @hidden */
    private _dirChangeSubscription = Subscription.EMPTY;

    /** @hidden */
    constructor(@Optional() private _rtl: RtlService, readonly contentDensityObserver: ContentDensityObserver) {
        if (this._rtl) {
            this._dirChangeSubscription = this._rtl.rtl.subscribe((value: boolean) => {
                this.direction = value ? 'rtl' : 'ltr';
                this._setMenuItemCascadeDirection();
            });
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (!this.menuId) {
            this.menuId = MENU_ID_ROOT + menuIdCounter++;
        }
        if (this.menuItems) {
            this._keyManager = new FocusKeyManager(this.menuItems);
            this._tabSubscription = this._keyManager.tabOut.subscribe(() => {
                this.close.emit('keyboard');
            });
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setMenuItemCascadeDirection();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.close.complete();
        this._tabSubscription.unsubscribe();
        this._dirChangeSubscription.unsubscribe();
    }

    /**
     * Set focus on first item
     * @param origin FocusOrigin
     */
    focusOnFirstItem(origin: FocusOrigin = 'program'): void {
        this._keyManager.setFocusOrigin(origin).setFirstItemActive();
    }

    /**
     * Close menu
     * @param method menu close method
     */
    closeMenu(method: MenuCloseMethod): void {
        this.close.emit(method);
    }

    /**
     * @hidden
     * Menu keydown handler
     */
    _onKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            if (this._cascadesRight()) {
                this.close.emit('arrow');
            }
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            if (this._cascadesLeft()) {
                this.close.emit('arrow');
            }
        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            this.close.emit('keyboard');
        } else if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            event.preventDefault();
            this.close.emit('keyboard');
        } else {
            this._keyManager.onKeydown(event);
        }
    }

    /**
     * @hidden
     * Menu click handler
     */
    _onClick(): void {
        this.close.emit('mouse');
    }

    /**
     * @hidden
     * Get stream of menu items hover change
     */
    _menuItemHoverChange(): Observable<MenuItemComponent> {
        const menuItems = this.menuItems.changes as Observable<QueryList<MenuItemComponent>>;
        return menuItems.pipe(
            startWith(this.menuItems),
            switchMap((items) => merge(...items.map((item: MenuItemComponent) => item.hovered)))
        ) as Observable<MenuItemComponent>;
    }

    /** @hidden */
    _setMenuItemCascadeDirection(): void {
        if (!this.menuItems) {
            return;
        }
        // set cascade direction
        this.menuItems.forEach((item) => {
            item.cascadeDirection = this._cascadesLeft() ? 'left' : 'right';
        });
    }

    /**
     * @hidden
     * Check if cascade menu should appear from right
     */
    _cascadesRight(): boolean {
        return (
            (this.xPosition === 'after' && this.direction === 'ltr') ||
            (this.xPosition === 'before' && this.direction === 'rtl')
        );
    }

    /**
     * @hidden
     * Check if cascade menu should appear from left
     */
    _cascadesLeft(): boolean {
        return (
            (this.xPosition === 'after' && this.direction === 'rtl') ||
            (this.xPosition === 'before' && this.direction === 'ltr')
        );
    }
}
