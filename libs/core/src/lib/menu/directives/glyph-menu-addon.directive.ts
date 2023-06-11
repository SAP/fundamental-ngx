import { Directive, inject, Input } from '@angular/core';
import { MenuAddonDirective } from './menu-addon.directive';
import { ComponentPortal } from '@angular/cdk/portal';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-menu-addon[glyph]',
    standalone: true
})
export class GlyphMenuAddonDirective {
    /**
     *  The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     **/
    @Input() set glyph(glyph: string) {
        import('@fundamental-ngx/core/icon').then(({ IconComponent }) => {
            const componentRef = this.addonComponent.addonGlyphPortalOutlet.attachComponentPortal(
                new ComponentPortal(IconComponent)
            );
            componentRef.instance.glyph = glyph;
            componentRef.instance.elementRef().nativeElement.setAttribute('role', 'presentation');
            componentRef.changeDetectorRef.detectChanges();
        });
    }

    /** @hidden */
    private addonComponent = inject(MenuAddonDirective, { optional: false, host: true });
}
