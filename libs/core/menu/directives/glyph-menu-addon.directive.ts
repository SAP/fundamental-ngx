import { CdkPortalOutlet, ComponentPortal, DomPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, DestroyRef, Directive, EmbeddedViewRef, Input, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { Observable, Subject, combineLatest, first, map, tap } from 'rxjs';
import { MenuComponent } from '../menu.component';
import { FD_MENU_COMPONENT, TOGGLE_MENU_ITEM } from '../menu.tokens';

@Directive({
    selector: '[fdMenuAddonGlyph], [fd-menu-addon-glyph]',
    standalone: true
})
export class GlyphMenuAddonDirective implements OnDestroy {
    /**
     *  The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     **/
    @Input() set glyph(glyph: string | undefined) {
        this._glyphName$.next(glyph);
    }

    /**
     * Toggle buttons always need a space, so we check if it is in a toggle button
     * */
    isInToggleButton = !!inject(TOGGLE_MENU_ITEM, { optional: true });

    /** @hidden */
    private _menuComponent = inject<MenuComponent>(FD_MENU_COMPONENT, { optional: true });

    /** @hidden */
    private _addonGlyphPortalOutlet$ = new Subject<CdkPortalOutlet>();

    /** @hidden */
    private _glyphName$ = new Subject<string | undefined>();

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        combineLatest([this._addonGlyphPortalOutlet$, this._glyphName$])
            .pipe(
                tap(([, glyphName]) => {
                    glyphName || this.isInToggleButton ? this._addGlyphAddonToMenu() : this._removeGlyphAddonFromMenu();
                }),
                tap(([outlet, glyphName]) => {
                    if (!glyphName) {
                        outlet.detach();
                        return;
                    }
                    const componentRef = outlet.attachComponentPortal(new ComponentPortal(IconComponent));
                    componentRef.setInput('glyph', glyphName);
                    const nativeElement = componentRef.location.nativeElement;
                    nativeElement.setAttribute('role', 'presentation');
                    if (this.isInToggleButton) {
                        nativeElement.classList.add('fd-menu__checkmark');
                    }
                    componentRef.changeDetectorRef.detectChanges();
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /** @hidden */
    setGlyphPortalOutlet(outlet: CdkPortalOutlet): void {
        this._addonGlyphPortalOutlet$.next(outlet);
    }

    /** @hidden */
    renderElement<ComponentType>(element: ComponentPortal<ComponentType>): Observable<ComponentRef<ComponentType>>;
    /** @hidden */
    renderElement<TemplateContext>(
        element: TemplatePortal<TemplateContext>
    ): Observable<EmbeddedViewRef<TemplateContext>>;
    /** @hidden */
    renderElement(element: DomPortal): Observable<any>;
    /** @hidden */
    renderElement(element: Portal<any>): Observable<any> {
        return this._addonGlyphPortalOutlet$.pipe(
            first(),
            tap((outlet) => outlet.detach()),
            map((outlet) => outlet.attach(element))
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._removeGlyphAddonFromMenu();
    }

    /** @hidden */
    private _addGlyphAddonToMenu(): void {
        this._menuComponent?.registerAddon(this);
    }

    /** @hidden */
    private _removeGlyphAddonFromMenu(): void {
        this._menuComponent?.unregisterAddon(this);
    }
}
