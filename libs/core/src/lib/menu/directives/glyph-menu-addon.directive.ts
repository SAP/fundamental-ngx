import { CdkPortalOutlet, ComponentPortal, DomPortal, Portal, TemplatePortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, EmbeddedViewRef, inject, Input, OnDestroy } from '@angular/core';
import { DestroyedService } from '@fundamental-ngx/cdk/utils';
import { combineLatest, first, map, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MenuComponent } from '../menu.component';
import { FD_MENU_COMPONENT, TOGGLE_MENU_ITEM } from '../menu.tokens';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-menu-addon[glyph]',
    standalone: true,
    providers: [DestroyedService]
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
    private iconComponent$ = fromPromise(
        import('@fundamental-ngx/core/icon').then(({ IconComponent }) => IconComponent)
    ).pipe(shareReplay(1));

    /** @hidden */
    private menuComponent = inject<MenuComponent>(FD_MENU_COMPONENT, { optional: true });

    /** @hidden */
    private _addonGlyphPortalOutlet$ = new Subject<CdkPortalOutlet>();

    /** @hidden */
    private _glyphName$ = new Subject<string | undefined>();

    /** @hidden */
    private _destroyed$ = inject(DestroyedService);

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
                    glyphName || this.isInToggleButton ? this.addGlyphAddonToMenu() : this.removeGlyphAddonFromMenu();
                }),
                switchMap(([outlet, glyphName]) => {
                    if (!glyphName) {
                        outlet.detach();
                        return of(null);
                    }
                    return this.iconComponent$.pipe(
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
                takeUntil(this._destroyed$)
            )
            .subscribe();
    }

    /** @hidden */
    private addGlyphAddonToMenu(): void {
        if (this.menuComponent && !this.menuComponent._addons.includes(this)) {
            this.menuComponent._addons = [...this.menuComponent._addons, this];
            this.menuComponent.detectChanges();
        }
    }

    /** @hidden */
    private removeGlyphAddonFromMenu(): void {
        if (this.menuComponent) {
            this.menuComponent._addons = this.menuComponent._addons.filter((item) => item !== this);
            this.menuComponent.detectChanges();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.removeGlyphAddonFromMenu();
    }
}
