import { CdkPortalOutlet, ComponentPortal, DomPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, DestroyRef, Directive, EmbeddedViewRef, inject, Input, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, first, map, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { switchMap } from 'rxjs/operators';
import { MenuComponent } from '../menu.component';
import { FD_MENU_COMPONENT, TOGGLE_MENU_ITEM } from '../menu.tokens';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-menu-addon[glyph]',
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

    /** IconComponent loader */
    private _iconComponent$ = fromPromise(
        import('@fundamental-ngx/core/icon').then(({ IconComponent }) => IconComponent)
    ).pipe(shareReplay(1));

    /** @hidden */
    private _menuComponent = inject<MenuComponent>(FD_MENU_COMPONENT, { optional: true });

    /** @hidden */
    private _addonGlyphPortalOutlet$ = new Subject<CdkPortalOutlet>();

    /** @hidden */
    private _glyphName$ = new Subject<string | undefined>();

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

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
    constructor() {
        combineLatest([this._addonGlyphPortalOutlet$, this._glyphName$])
            .pipe(
                tap(([, glyphName]) => {
                    glyphName || this.isInToggleButton ? this._addGlyphAddonToMenu() : this._removeGlyphAddonFromMenu();
                }),
                switchMap(([outlet, glyphName]) => {
                    if (!glyphName) {
                        outlet.detach();
                        return of(null);
                    }
                    return this._iconComponent$.pipe(
                        tap((IconComponent) => {
                            const componentRef = outlet.attachComponentPortal(new ComponentPortal(IconComponent));
                            componentRef.instance.glyph = glyphName;
                            componentRef.instance.elementRef.nativeElement.setAttribute('role', 'presentation');
                            if (this.isInToggleButton) {
                                componentRef.instance.elementRef.nativeElement.classList.add('fd-menu__checkmark');
                            }
                            componentRef.changeDetectorRef.detectChanges();
                        })
                    );
                }),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe();
    }

    /** @hidden */
    private _addGlyphAddonToMenu(): void {
        this._menuComponent?.registerAddon(this);
    }

    /** @hidden */
    private _removeGlyphAddonFromMenu(): void {
        this._menuComponent?.unregisterAddon(this);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._removeGlyphAddonFromMenu();
    }
}
