import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { Directive, EmbeddedViewRef, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItem, Nullable } from '@fundamental-ngx/cdk/utils';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
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
        }
    ]
})
export class AvatarGroupItemRendererDirective implements OnInit, FocusableItem {
    /** @hidden */
    @Input() avatarGroupItem: AvatarGroupItemDirective;

    /** @hidden */
    @Input()
    forceVisibility = false;

    /** @hidden */
    portalOutlet = inject(CdkPortalOutlet, { host: true });

    /** @hidden */
    viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    _element$ = new BehaviorSubject<Nullable<HTMLElement>>(null);

    /** @hidden */
    element$ = this._element$.asObservable();

    /** @hidden */
    keydown: Observable<KeyboardEvent> = this._element$.pipe(
        filter((element) => !!element),
        switchMap((element) => fromEvent(element as unknown as HTMLElement, 'keydown') as Observable<KeyboardEvent>)
    );

    /** @hidden */
    private templatePortal?: TemplatePortal<void>;

    /** @hidden */
    private _isFocusable = true;

    /** @hidden */
    private embeddedViewRef: EmbeddedViewRef<void>;

    /** @hidden */
    private lastSavedWidth = 0;

    /** @hidden */
    private lastSavedHeight = 0;

    /** @hidden */
    private hostConfig = inject(AVATAR_GROUP_HOST_CONFIG);

    /** @hidden */
    get visible(): boolean {
        return this.portalOutlet.hasAttached();
    }

    /** @hidden */
    get element(): HTMLElement {
        return this.embeddedViewRef?.rootNodes[0] as HTMLElement;
    }

    /** @hidden */
    get width(): number {
        if (this.visible) {
            this.lastSavedWidth =
                this.element.getBoundingClientRect().width +
                parseFloat(getComputedStyle(this.element).marginLeft) +
                parseFloat(getComputedStyle(this.element).marginRight);
        }
        return this.lastSavedWidth;
    }

    /** @hidden */
    get height(): number {
        if (this.visible) {
            this.lastSavedHeight =
                this.element.getBoundingClientRect().height +
                parseFloat(getComputedStyle(this.element).marginTop) +
                parseFloat(getComputedStyle(this.element).marginBottom);
        }
        return this.lastSavedHeight;
    }

    /** @hidden */
    ngOnInit(): void {
        this.show();
    }

    /** @hidden */
    hide(): void {
        this.portalOutlet.detach();
        this.setTabbable(false);
        this._isFocusable = false;
    }

    /** @hidden */
    show(): void {
        if (this.visible) {
            return;
        }
        if (!this.templatePortal) {
            this.templatePortal = new TemplatePortal(this.avatarGroupItem.templateRef, this.viewContainerRef);
        }
        this.embeddedViewRef = this.portalOutlet.attach(this.templatePortal);
        this.embeddedViewRef.detectChanges();
        this._element$.next(this.element);
        this.setTabbable(this.hostConfig.type === 'individual');
        this._isFocusable = this.hostConfig.type === 'individual';
    }

    /** @hidden */
    isFocusable = (): boolean => this._isFocusable && this.visible;

    /** @hidden */
    setTabbable(tabbable: boolean): void {
        this.element.tabIndex = tabbable ? 0 : -1;
    }

    /** @hidden */
    focus(): void {
        this.element?.focus();
    }
}
