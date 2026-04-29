import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Directive, EmbeddedViewRef, Input, OnInit, ViewContainerRef, inject } from '@angular/core';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItem, Nullable } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { AVATAR_GROUP_HOST_CONFIG } from '../tokens';
import { AvatarGroupItemDirective } from './avatar-group-item.directive';
@Directive({
    selector: '[fdAvatarGroupItemPortal]',
    exportAs: 'fdAvatarGroupItemPortal',
    standalone: true,
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: AvatarGroupItemRendererDirective
        },
        CdkPortalOutlet
    ]
})
export class AvatarGroupItemRendererDirective implements OnInit, FocusableItem {
    /**
     * Avatar group item to be rendered.
     **/
    @Input() avatarGroupItem: AvatarGroupItemDirective;

    /**
     * Whether the item should be forced to be visible.
     **/
    @Input()
    forceVisibility = false;

    /**
     * HTML element of the item.
     **/
    element$: Observable<Nullable<HTMLElement>>;

    /** @hidden */
    keydown: Observable<KeyboardEvent>;

    /**
     * Whether the item is visible.
     **/
    get visible(): boolean {
        return this._portalOutlet.hasAttached();
    }

    /**
     * Currently rendered element's HTMLElement.
     **/
    get element(): HTMLElement {
        return this._embeddedViewRef?.rootNodes[0] as HTMLElement;
    }

    /**
     * Rendered element's width or it's last saved width.
     **/
    get width(): number {
        if (this.visible) {
            const rect = this.element.getBoundingClientRect();
            const style = getComputedStyle(this.element);
            const width = rect.width;
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);

            if (!isNaN(width) && !isNaN(marginLeft) && !isNaN(marginRight)) {
                this._lastSavedWidth = width + marginLeft + marginRight;
            }
        }
        return this._lastSavedWidth;
    }

    /**
     * Rendered element's height or it's last saved height.
     **/
    get height(): number {
        if (this.visible) {
            this._lastSavedHeight =
                this.element.getBoundingClientRect().height +
                parseFloat(getComputedStyle(this.element).marginTop) +
                parseFloat(getComputedStyle(this.element).marginBottom);
        }
        return this._lastSavedHeight;
    }

    /** @hidden */
    private _portalOutlet = inject(CdkPortalOutlet, { host: true });

    /** @hidden */
    private _viewContainerRef = inject(ViewContainerRef);

    /**
     * @hidden
     **/
    private _element$ = new BehaviorSubject<Nullable<HTMLElement>>(null);

    /** @hidden */
    private _templatePortal?: TemplatePortal<void>;

    /** @hidden */
    private _isFocusable = true;

    /** @hidden */
    private _embeddedViewRef: EmbeddedViewRef<void>;

    /** @hidden */
    private _lastSavedWidth = 0;

    /** @hidden */
    private _lastSavedHeight = 0;

    /** @hidden */
    private _posInSet = 0;

    /** @hidden */
    private _setSize = 0;

    /** @hidden */
    private _hostConfig = inject(AVATAR_GROUP_HOST_CONFIG);

    /** @hidden */
    constructor() {
        this.element$ = this._element$.asObservable();
        this.keydown = this._element$.pipe(
            filter((element) => !!element),
            switchMap((element) => fromEvent(element as unknown as HTMLElement, 'keydown') as Observable<KeyboardEvent>)
        );
    }

    /** @hidden */
    ngOnInit(): void {
        this.show();
    }

    /**
     * Hides the item.
     **/
    hide(): void {
        this._portalOutlet.detach();
        this.setTabbable(false);
        this._isFocusable = false;
    }

    /**
     * Shows the item.
     **/
    show(): void {
        if (this.visible) {
            return;
        }
        if (!this._templatePortal) {
            this._templatePortal = new TemplatePortal(this.avatarGroupItem._templateRef, this._viewContainerRef);
        }
        this._embeddedViewRef = this._portalOutlet.attach(this._templatePortal);
        this._embeddedViewRef.detectChanges();
        this._element$.next(this.element);
        this.setTabbable(this._hostConfig.type === 'individual');
        this._isFocusable = this._hostConfig.type === 'individual';
        this._applyAriaPosition();
    }

    /**
     * Whether the item is focusable.
     **/
    isFocusable = (): boolean => this._isFocusable && this.visible;

    /**
     * Sets the tabbable state of the item.
     **/
    setTabbable(tabbable: boolean): void {
        this.element.tabIndex = tabbable ? 0 : -1;
    }

    /**
     * Sets aria-posinset and aria-setsize on the rendered element.
     * Stored values are applied immediately if the item is visible,
     * and re-applied on the next show() call otherwise.
     **/
    @Input()
    set posInSet(value: number) {
        this._posInSet = value;
        if (this.visible) {
            this._applyAriaPosition();
        }
    }

    get posInSet(): number {
        return this._posInSet;
    }

    /** @hidden */
    @Input()
    set setSize(value: number) {
        this._setSize = value;
        if (this.visible) {
            this._applyAriaPosition();
        }
    }

    get setSize(): number {
        return this._setSize;
    }

    /** @hidden */
    focus(): void {
        this.element?.focus();
    }

    /** @hidden */
    private _applyAriaPosition(): void {
        const el = this.element;
        if (!el || !this._posInSet || !this._setSize) {
            return;
        }
        el.setAttribute('aria-posinset', String(this._posInSet));
        el.setAttribute('aria-setsize', String(this._setSize));
    }
}
