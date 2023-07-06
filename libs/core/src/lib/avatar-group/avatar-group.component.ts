import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ViewportRuler } from '@angular/cdk/overlay';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB } from '@angular/cdk/keycodes';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ColorAccent, KeyUtil, RtlService, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupItemDirective } from './directives/avatar-group-item.directive';
import { AvatarGroupInterface } from './avatar-group.interface';
import { AVATAR_GROUP_COMPONENT } from './tokens';

export type AvatarGroupType = 'group' | 'individual';
export type AvatarGroupOverflowButtonColor = 'neutral' | 'random' | ColorAccent;

let avatarGroupCount = 0;

@Component({
    selector: 'fd-avatar-group',
    templateUrl: './avatar-group.component.html',
    styleUrls: ['./avatar-group.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: AVATAR_GROUP_COMPONENT,
            useExisting: forwardRef(() => AvatarGroupComponent)
        }
    ],
    standalone: true
})
export class AvatarGroupComponent implements AvatarGroupInterface, OnChanges, OnInit, AfterViewInit, OnDestroy {
    /** Id of the Avatar Group. */
    @Input()
    id = `fd-avatar-group-${avatarGroupCount++}`;

    /** Apply user custom class. */
    @Input()
    class: string;

    /** The size of the Avatar Group. Options include: *xs*, *s*, *m*, *l* and *xl* (default: *s*). */
    @Input()
    size: Size = 's';

    /** The type of the Avatar Group. Options include: *group* and *individual* (default: *group*). */
    @Input()
    type: AvatarGroupType = 'group';

    /** Aria-label for Avatar Group. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Counter for all avatars. */
    allItemsCount = 0;

    /** Counter for visible in overflow popover avatars. */
    overflowItemsCount = 0;

    /** @hidden Avatar Group items. */
    @ContentChildren(AvatarGroupItemDirective, { descendants: true })
    mainItems: QueryList<AvatarGroupItemDirective>;

    /** @hidden */
    @ViewChild('avatarGroupContainer')
    avatarGroupContainer: ElementRef<HTMLDivElement>;

    /** @hidden */
    rootClassNames: Record<string, boolean | undefined | null>;

    /** @hidden */
    get isGroupType(): boolean {
        return this.type === 'group';
    }

    /** @hidden */
    private get _avatarGroupWidth(): number {
        return this.avatarGroupContainer?.nativeElement?.offsetWidth;
    }

    /** @hidden */
    private get _avatarGroupItemWidth(): number {
        return this.mainItems.first?._element.offsetWidth ?? 0;
    }

    /** @hidden */
    private get _avatarGroupItemWithMarginsWidth(): number {
        if (!this.mainItems.first) {
            return this._avatarGroupItemWidth;
        }

        const elementStyles = getComputedStyle(this.mainItems.first._element);
        const marginLeft = elementStyles.marginLeft || '0';
        const marginRight = elementStyles.marginRight || '0';

        return this._avatarGroupItemWidth + parseInt(marginLeft, 10) + parseInt(marginRight, 10);
    }

    /** @hidden FocusKeyManager instance */
    private _keyboardEventsManager: FocusKeyManager<AvatarGroupItemDirective>;

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden handles rtl service */
    private _dir: 'ltr' | 'rtl' | null = 'ltr';

    /** @hidden */
    constructor(private readonly _viewportRuler: ViewportRuler, @Optional() private _rtlService: RtlService) {}

    /** @hidden */
    ngOnInit(): void {
        this._subscription.add(this._viewportRuler.change().subscribe(() => this._onResize()));
    }

    /** @hidden */
    ngOnChanges(): void {
        this._assignCssClasses();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._reset();

        this._subscription.add(
            of(true)
                .pipe(delay(5))
                .subscribe(() => this._collapseItems())
        );

        this._listenForItemChanges();
        this._setKeyboardEventsManager();
        this._subscribeToRtl();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._keyboardEventsManager.destroy();
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    keyUpHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, TAB)) {
            const index = this.mainItems.toArray().findIndex((item) => item._element === event.target);
            if (index !== -1) {
                this._keyboardEventsManager.setActiveItem(index);
            }
        }

        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW])) {
            event.preventDefault();

            // passing the event to key manager so we get a change fired
            this._keyboardEventsManager.onKeydown(event);
        }
    }

    /** @hidden */
    _setActiveItem(item: AvatarGroupItemDirective): void {
        this._keyboardEventsManager.setActiveItem(item);
    }

    /** @hidden */
    private _onResize(): void {
        this._reset();
        this._collapseItems();
    }

    /** @hidden */
    private _reset(): void {
        this.allItemsCount = this.mainItems.length;
        this.overflowItemsCount = 0;

        this.mainItems.forEach((it) => {
            it._element.style.display = 'inline-block';
            it.disabled = false;
        });
    }

    /** @hidden */
    private _collapseItems(): void {
        const allItemsCounter = this.mainItems?.length || 0;
        let contentWidth = 0;
        let idx = 0;
        const avatarGroupItemWidth = this._avatarGroupItemWidth;
        const avatarGroupItemWithMarginsWidth = this._avatarGroupItemWithMarginsWidth;

        while (idx < allItemsCounter) {
            const newContentWidth =
                idx === 0 && this.isGroupType
                    ? contentWidth + avatarGroupItemWidth
                    : contentWidth + avatarGroupItemWithMarginsWidth;

            if (newContentWidth >= this._avatarGroupWidth) {
                // -1 because the last element in the loop will be replaced by the overflow button
                const newIdx = idx - 1;
                this.overflowItemsCount = allItemsCounter - newIdx;
                const mainItemsToHide = this.mainItems.toArray().slice(newIdx);
                mainItemsToHide.forEach((it) => {
                    it._element.style.display = 'none';
                    it.disabled = true;
                });

                break;
            }

            contentWidth = newContentWidth;
            idx++;
        }
    }

    /** @hidden */
    private _listenForItemChanges(): void {
        this._subscription.add(this.mainItems.changes.subscribe(() => this._onResize()));
    }

    /** @hidden */
    private _assignCssClasses(): void {
        this.rootClassNames = {
            'fd-avatar-group': true,
            [`fd-avatar-group--${this.type}-type`]: !!this.type,
            [`fd-avatar-group--${this.size}`]: !!this.size,
            [this.class]: !!this.class
        };
    }

    /** @hidden */
    private _setKeyboardEventsManager(): void {
        this._keyboardEventsManager?.destroy();
        this._keyboardEventsManager = new FocusKeyManager(this.mainItems)
            .withWrap()
            .withHorizontalOrientation(this._dir);
    }

    /** @hidden Rtl change subscription */
    private _subscribeToRtl(): void {
        if (!this._rtlService) {
            return;
        }

        const rtlSub = this._rtlService.rtl.subscribe((isRtl) => {
            this._dir = isRtl ? 'rtl' : 'ltr';

            this._keyboardEventsManager = this._keyboardEventsManager.withHorizontalOrientation(this._dir);
        });

        this._subscription.add(rtlSub);
    }
}
