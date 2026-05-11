import { PortalModule } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    QueryList,
    Renderer2,
    ViewChildren,
    ViewEncapsulation,
    computed,
    inject,
    input,
    output
} from '@angular/core';
import { FocusableListDirective, RtlService, elementClick$ } from '@fundamental-ngx/cdk/utils';
import { BarComponent, BarElementDirective, BarLeftDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subscription, map, merge, startWith } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AvatarGroupItemRendererDirective } from '../../directives/avatar-group-item-renderer.directive';
import { AvatarGroupItemDirective } from '../../directives/avatar-group-item.directive';
import { AVATAR_GROUP_HOST_CONFIG } from '../../tokens';
import { AvatarGroupHostConfig } from '../../types';

@Component({
    selector: 'fd-default-avatar-group-overflow-body',
    templateUrl: './default-avatar-group-overflow-body.component.html',
    imports: [
        PortalModule,
        AvatarGroupItemRendererDirective,
        FocusableListDirective,
        NgTemplateOutlet,
        PopoverBodyHeaderDirective,
        BarComponent,
        ButtonBarComponent,
        BarElementDirective,
        BarLeftDirective,
        FdTranslatePipe
    ],
    host: {
        class: 'fd-popover__wrapper',
        '[style.max-width.rem]': '20'
    },
    providers: [
        {
            // Override the parent group config so that items inside the overflow popup are always
            // rendered as individually focusable. Without this, a group-type parent would set
            // tabindex=-1 and isFocusable=false on each avatar via AvatarGroupItemRendererDirective,
            // making them invisible to fdkFocusableList and unreachable by keyboard.
            provide: AVATAR_GROUP_HOST_CONFIG,
            useValue: { type: 'individual', orientation: 'horizontal', size: 's' } as AvatarGroupHostConfig
        }
    ],
    styleUrl: './default-avatar-group-overflow-body.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultAvatarGroupOverflowBodyComponent implements AfterViewInit, OnDestroy {
    /**
     * List of avatars to be rendered in the overflow popover.
     **/
    @Input()
    avatars: Iterable<AvatarGroupItemRendererDirective> = [];

    /**
     * Title of the overflow popover.
     * */
    @Input()
    overflowPopoverTitle: string;

    /** @hidden */
    @ViewChildren(AvatarGroupItemRendererDirective)
    _avatarGroupItemPortals: QueryList<AvatarGroupItemRendererDirective>;

    /** Emitted when the Escape key is pressed inside the overflow body. */
    readonly escapePressed = output<void>();

    /**
     * Heading level for the overflow popover title.
     * @default 5
     */
    readonly overflowHeadingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(5);

    /** @hidden */
    _overflowPopoverStage: 'main' | 'details' = 'main';

    /** @hidden */
    _selectedItem: AvatarGroupItemDirective;

    /** @hidden */
    get _isDetailStage(): boolean {
        return this._overflowPopoverStage === 'details';
    }

    /** @hidden */
    protected readonly navigationArrow = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    /** @hidden */
    private _itemClickSubscription: Subscription;

    /** @hidden */
    private _escapeUnlisten: () => void;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef<HTMLElement>);

    /** @hidden */
    private readonly _changeDetectorRef = inject(ChangeDetectorRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    ngAfterViewInit(): void {
        this._registerEscapeListener();
        this._avatarGroupItemPortals.changes
            .pipe(
                startWith(this._avatarGroupItemPortals),
                map((avatarGroupItemPortals) => avatarGroupItemPortals.toArray())
            )
            .subscribe((items: AvatarGroupItemRendererDirective[]) => {
                if (this._itemClickSubscription) {
                    this._itemClickSubscription.unsubscribe();
                }
                this._itemClickSubscription = merge(
                    ...items.map((item) =>
                        item.element$.pipe(
                            filter(Boolean),
                            switchMap((el) => elementClick$(el, this._renderer).pipe(map(() => item)))
                        )
                    )
                ).subscribe((item: AvatarGroupItemRendererDirective) => {
                    this._overflowPopoverStage = 'details';
                    this._selectedItem = item.avatarGroupItem;
                    this._changeDetectorRef.detectChanges();
                    this._focusFirstTabbableElement();
                });
            });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._itemClickSubscription?.unsubscribe();
        this._escapeUnlisten();
    }

    /** @hidden */
    protected openOverflowMain(): void {
        this._overflowPopoverStage = 'main';
        this._changeDetectorRef.detectChanges();
        const target = this._avatarGroupItemPortals.find((r) => r.avatarGroupItem === this._selectedItem);
        if (target?.element) {
            target.element.focus();
        } else {
            this._focusFirstTabbableElement();
        }
    }

    /** @hidden */
    private _focusFirstTabbableElement(): void {
        requestAnimationFrame(() => {
            const el: HTMLElement | null = this._elementRef.nativeElement.querySelector(
                '[tabindex="0"], button, a, input'
            );
            el?.focus();
        });
    }

    /** @hidden */
    private _registerEscapeListener(): void {
        const el = this._elementRef.nativeElement;
        const escapeHandler = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                this.escapePressed.emit();
            }
        };
        // Capture phase is required: child elements (e.g. fdkFocusableList items) call
        // stopPropagation() on keydown, which would prevent the event from bubbling up.
        el.addEventListener('keydown', escapeHandler, true);
        this._escapeUnlisten = () => el.removeEventListener('keydown', escapeHandler, true);
    }
}
