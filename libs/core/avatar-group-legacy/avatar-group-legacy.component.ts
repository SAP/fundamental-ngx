import { FocusKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/overlay';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    computed,
    effect,
    forwardRef,
    inject
} from '@angular/core';
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ColorAccent, KeyUtil, Nullable, RtlService, Size } from '@fundamental-ngx/cdk/utils';
import { AvatarGroupLegacyInterface } from './avatar-group-legacy.interface';
import { AvatarGroupLegacyItemDirective } from './directives/avatar-group-legacy-item.directive';
import { AVATAR_GROUP_LEGACY_COMPONENT } from './tokens';

export type AvatarGroupLegacyType = 'group' | 'individual';
export type AvatarGroupLegacyOverflowButtonColor = 'neutral' | 'random' | ColorAccent;

let avatarGroupCount = 0;

@Component({
    selector: 'fd-avatar-group-legacy',
    templateUrl: './avatar-group-legacy.component.html',
    styleUrl: './avatar-group-legacy.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: AVATAR_GROUP_LEGACY_COMPONENT,
            useExisting: forwardRef(() => AvatarGroupLegacyComponent)
        }
    ]
})
export class AvatarGroupLegacyComponent
    implements AvatarGroupLegacyInterface, OnChanges, OnInit, AfterViewInit, OnDestroy
{
    /** Id of the Avatar Group. */
    @Input()
    id = `fd-avatar-group-legacy-${avatarGroupCount++}`;

    /** Apply user custom class. */
    @Input()
    class: string;

    /** The size of the Avatar Group. Options include: *xs*, *s*, *m*, *l* and *xl* (default: *s*). */
    @Input()
    size: Size = 's';

    /** The type of the Avatar Group. Options include: *group* and *individual* (default: *group*). */
    @Input()
    type: AvatarGroupLegacyType = 'group';

    /** Aria-label for Avatar Group. */
    @Input()
    ariaLabel: Nullable<string>;

    /** @hidden Avatar Group items. */
    @ContentChildren(AvatarGroupLegacyItemDirective, { descendants: true })
    mainItems: QueryList<AvatarGroupLegacyItemDirective>;

    /** @hidden */
    @ViewChild('avatarGroupContainer')
    avatarGroupContainer: ElementRef<HTMLDivElement>;

    /** Counter for all avatars. */
    allItemsCount = 0;

    /** Counter for visible in overflow popover avatars. */
    overflowItemsCount = 0;

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
    private _keyboardEventsManager: FocusKeyManager<AvatarGroupLegacyItemDirective>;

    /** @hidden */
    private readonly _subscription = new Subscription();

    /** @hidden */
    private readonly _viewportRuler = inject(ViewportRuler);

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
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._keyboardEventsManager.destroy();
    }

    /** @hidden */
    _setActiveItem(item: AvatarGroupLegacyItemDirective): void {
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
            'fd-avatar-group-legacy': true,
            [`fd-avatar-group-legacy--${this.type}-type`]: !!this.type,
            [`fd-avatar-group-legacy--${this.size}`]: !!this.size,
            [this.class]: !!this.class
        };
    }

    /** @hidden */
    private _setKeyboardEventsManager(): void {
        this._keyboardEventsManager?.destroy();
        this._keyboardEventsManager = new FocusKeyManager(this.mainItems)
            .withWrap()
            .withHorizontalOrientation(this._dir());
    }
}
