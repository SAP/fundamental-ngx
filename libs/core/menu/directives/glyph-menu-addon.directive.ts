import { CdkPortalOutlet, ComponentPortal, DomPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, DestroyRef, Directive, EmbeddedViewRef, Input, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject, combineLatest, first, map, of, shareReplay, tap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { switchMap } from 'rxjs/operators';
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

    /** IconComponent loader */
    private _iconComponent$ = fromPromise(
        import('@fundamental-ngx/core/icon').then(({ IconComponent }) => IconComponent)
    ).pipe(shareReplay(1));

    /** @ignore */
    private _menuComponent = inject<MenuComponent>(FD_MENU_COMPONENT, { optional: true });

    /** @ignore */
    private _addonGlyphPortalOutlet$ = new Subject<CdkPortalOutlet>();

    /** @ignore */
    private _glyphName$ = new Subject<string | undefined>();

    /** @ignore */
    private _destroyRef = inject(DestroyRef);

    /** @ignore */
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

    /** @ignore */
    setGlyphPortalOutlet(outlet: CdkPortalOutlet): void {
        this._addonGlyphPortalOutlet$.next(outlet);
    }

    /** @ignore */
    renderElement<ComponentType>(element: ComponentPortal<ComponentType>): Observable<ComponentRef<ComponentType>>;
    /** @ignore */
    renderElement<TemplateContext>(
        element: TemplatePortal<TemplateContext>
    ): Observable<EmbeddedViewRef<TemplateContext>>;
    /** @ignore */
    renderElement(element: DomPortal): Observable<any>;
    /** @ignore */
    renderElement(element: Portal<any>): Observable<any> {
        return this._addonGlyphPortalOutlet$.pipe(
            first(),
            tap((outlet) => outlet.detach()),
            map((outlet) => outlet.attach(element))
        );
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._removeGlyphAddonFromMenu();
    }

    /** @ignore */
    private _addGlyphAddonToMenu(): void {
        this._menuComponent?.registerAddon(this);
    }

    /** @ignore */
    private _removeGlyphAddonFromMenu(): void {
        this._menuComponent?.unregisterAddon(this);
    }
}
