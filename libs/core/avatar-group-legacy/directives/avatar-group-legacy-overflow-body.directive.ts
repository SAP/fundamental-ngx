import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    computed,
    ContentChildren,
    Directive,
    effect,
    HostListener,
    inject,
    Input,
    OnDestroy,
    QueryList
} from '@angular/core';
import { Subscription } from 'rxjs';

import { HasElementRef, KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { AVATAR_GROUP_LEGACY_FOCUSABLE_AVATAR_DIRECTIVE, FocusableWithElementRef } from '../tokens';

// import { AvatarGroupLegacyFocusableAvatarDirective } from './avatar-group-legacy-focusable-avatar.directive';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-avatar-group-legacy-overflow-body]',
    host: {
        class: 'fd-avatar-group-legacy__overflow-body',
        '[class.fd-avatar-group-legacy__overflow-body--no-padding]': 'noPadding',
        '[class.fd-avatar-group-legacy__overflow-body--no-horizontal-scroll]': 'noHorizontalScroll',
        '[class.fd-avatar-group-legacy__overflow-body--no-vertical-scroll]': 'noVerticalScroll'
    }
})
export class AvatarGroupLegacyOverflowBodyDirective implements AfterViewInit, OnDestroy {
    /** Remove the padding from the overflow body. */
    @Input()
    noPadding = false;

    /** Hide horizontal scrollbar from the overflow body. */
    @Input()
    noHorizontalScroll = true;

    /** Hide vertical scrollbar from the overflow body. */
    @Input()
    noVerticalScroll = true;

    /** @hidden Avatar Group Overflow items. */
    @ContentChildren(AVATAR_GROUP_LEGACY_FOCUSABLE_AVATAR_DIRECTIVE, { descendants: true })
    overflowItems: QueryList<FocusableWithElementRef>;

    /** @hidden FocusKeyManager instance */
    private _keyboardEventsManager: FocusKeyManager<HasElementRef>;

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _dir = computed<'ltr' | 'rtl'>(() => (this._rtlService?.rtl() ? 'rtl' : 'ltr'));

    /** @hidden */
    constructor() {
        // React to RTL changes and update keyboard manager orientation
        effect(() => {
            const dir = this._dir();
            this._keyboardEventsManager?.withHorizontalOrientation(dir);
        });
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    keyUpHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, TAB)) {
            const index = this.overflowItems
                .toArray()
                .findIndex((item) => item.elementRef.nativeElement === event.target);
            if (index !== -1) {
                this._keyboardEventsManager.setActiveItem(index);
            }
        }

        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
            // passing the event to key manager so we get a change fired
            this._keyboardEventsManager.onKeydown(event);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenForItemChanges();

        this._setKeyboardEventsManager();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._keyboardEventsManager?.destroy();
    }

    /** @hidden */
    _setActiveItem(item: FocusableOption & HasElementRef): void {
        this._keyboardEventsManager.setActiveItem(item);
    }

    /** @hidden */
    private _listenForItemChanges(): void {
        this.overflowItems.changes.subscribe(() => this._setKeyboardEventsManager());
    }

    /** @hidden */
    private _setKeyboardEventsManager(): void {
        this._keyboardEventsManager?.destroy();
        this._keyboardEventsManager = new FocusKeyManager(this.overflowItems)
            .withWrap()
            .withHorizontalOrientation(this._dir());

        this._keyboardEventsManager.setFirstItemActive();
    }
}
