import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { map } from 'rxjs/operators';
import { DEFAULT_SUFFIX, THEME_SUFFIX } from './product-switch-theme-suffix';

@Component({
    selector: 'fd-product-switch-two-column-example',
    templateUrl: './product-switch-two-column-example.component.html',
    imports: [ProductSwitchBodyComponent]
})
export class ProductSwitchTwoColumnExampleComponent {
    readonly list = computed<ProductSwitchItem[]>(() => {
        const suffix = THEME_SUFFIX[this._themeId()] ?? DEFAULT_SUFFIX;
        return [
            {
                title: 'SAP Start',
                subtitle: 'Central Home',
                avatar: { image: 'assets/images/SAP-Start' + suffix, contain: true, transparent: true },
                url: 'https://www.sap.com',
                stickToPosition: true,
                disabledDragAndDrop: true
            },
            {
                title: 'SAP Ariba',
                subtitle: 'Procurement',
                avatar: { image: 'assets/images/SAP-Ariba' + suffix, contain: true, transparent: true },
                url: 'https://www.sap.com/products/spend-management/ariba-network.html'
            }
        ];
    });

    private readonly _themeId = toSignal(inject(ThemingService).currentTheme.pipe(map((t) => t?.id ?? '')), {
        initialValue: ''
    });
}
