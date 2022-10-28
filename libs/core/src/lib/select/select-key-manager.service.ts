import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { UP_ARROW, DOWN_ARROW, ENTER, SPACE, HOME, TAB, END, ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';

import { SelectInterface } from './select.interface';
import { OptionsInterface } from './options.interface';

@Injectable()
export class SelectKeyManagerService {
    /** @hidden */
    _component: SelectInterface;

    /** @hidden */
    _keyManager: ActiveDescendantKeyManager<OptionsInterface>;

    /**
     * Sets up a key manager to listen to keyboard events on the overlay panel.
     * @hidden
     */
    _initKeyManager(_component: SelectInterface): void {
        this._keyManager = new ActiveDescendantKeyManager<OptionsInterface>(this._component._options)
            .withTypeAhead(this._component.typeaheadDebounceInterval)
            .withVerticalOrientation()
            .withHorizontalOrientation(this._component._isRtl() ? 'rtl' : 'ltr')
            .withAllowedModifierKeys(['shiftKey']);

        this._keyManager.tabOut.pipe(takeUntil(this._component._destroy)).subscribe(() => {
            // tab focus fix for mobile
            if (!this._component.mobile) {
                this._component.focus();
                this._component.close();
            }
        });

        this._keyManager.change.pipe(takeUntil(this._component._destroy)).subscribe(() => {
            if (this._component._isOpen && this._component._optionPanel) {
                this._scrollActiveOptionIntoView();
            } else if (!this._component._isOpen && this._keyManager.activeItem) {
                this._keyManager.activeItem._selectViaInteraction();
            }
        });
    }

    /** @hidden */
    _scrollActiveOptionIntoView(): void {
        const activeOptionIndex = this._keyManager.activeItemIndex || 0;
        this._component._optionPanel.nativeElement.scrollTop = this._component._getOptionScrollPosition(
            activeOptionIndex,
            this._component._getItemHeight(),
            this._component._optionPanel.nativeElement.scrollTop
        );
    }

    /**
     * Handles keyboard events while the select is closed.
     * @hidden
     */
    _handleClosedKeydown(event: KeyboardEvent): void {
        const isOpenKey = KeyUtil.isKeyCode(event, [ENTER, SPACE]);
        const manager = this._keyManager;

        // Open the select on ALT + arrow key to match the native <select>
        if (!manager.isTyping() && isOpenKey && !hasModifierKey(event)) {
            // prevents the page from scrolling down when pressing space
            event.preventDefault();
            this._component.open();
        } else {
            const previouslySelectedOption = this._component.selected;

            if (KeyUtil.isKeyCode(event, [HOME, END])) {
                if (KeyUtil.isKeyCode(event, HOME)) {
                    manager.setFirstItemActive();
                } else {
                    manager.setLastItemActive();
                }
                event.preventDefault();
            }

            const selectedOption = this._component.selected;

            // a11y Since the value has changed, we need to announce it.
            if (selectedOption && previouslySelectedOption !== selectedOption) {
                this._component._liveAnnouncer.announce((selectedOption as OptionsInterface).viewValue, 10000);
            }
            manager.onKeydown(event);
        }
    }

    /**
     * Handles keyboard events when the selected is open.
     *
     * @hidden
     */
    _handleOpenKeydown(event: KeyboardEvent): void {
        const manager = this._keyManager;
        const isArrowKey = KeyUtil.isKeyCode(event, [UP_ARROW, DOWN_ARROW]);
        const isTyping = manager.isTyping();

        if (KeyUtil.isKeyCode(event, [HOME, END])) {
            event.preventDefault();
            if (KeyUtil.isKeyCode(event, HOME)) {
                manager.setFirstItemActive();
            } else {
                manager.setLastItemActive();
            }
        } else if ((isArrowKey && event.altKey) || KeyUtil.isKeyCode(event, [ESCAPE])) {
            // Close the select on ALT + arrow key to match the native <select>
            event.preventDefault();
            this._component.blur();
            this._component.close();
            // When user is typing do nothing,
            // because the typing sequence can include the space key.
        } else if (
            !isTyping &&
            KeyUtil.isKeyCode(event, [ENTER, SPACE]) &&
            manager.activeItem &&
            !hasModifierKey(event)
        ) {
            event.preventDefault();
            manager.activeItem._selectViaInteraction();
            this._component.blur();
        } else if (!isTyping && KeyUtil.isKeyCode(event, [TAB]) && this._component.mobile) {
            event.preventDefault();
        } else {
            manager.onKeydown(event);
        }
    }
}
