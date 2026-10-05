import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { map } from 'rxjs/operators';
import { DEFAULT_SUFFIX, THEME_SUFFIX } from './product-switch-theme-suffix';

@Component({
    selector: 'fd-product-switch-navigation-example',
    templateUrl: './product-switch-navigation-example.component.html',
    imports: [ProductSwitchBodyComponent]
})
export class ProductSwitchNavigationExampleComponent {
    readonly list = computed<ProductSwitchItem[]>(() => {
        const suffix = THEME_SUFFIX[this._themeId()] ?? DEFAULT_SUFFIX;
        return [
            {
                title: 'SAP Start',
                subtitle: 'Opens in new tab (default)',
                avatar: { image: 'assets/images/SAP-Start' + suffix, contain: true, transparent: true },
                url: 'https://www.sap.com'
            },
            {
                title: 'SAP Ariba',
                subtitle: 'Opens in new tab (explicit)',
                avatar: { image: 'assets/images/SAP-Ariba' + suffix, contain: true, transparent: true },
                url: 'https://www.sap.com/products/spend-management/ariba-network.html',
                target: '_blank'
            },
            {
                title: 'Business Data Cloud',
                subtitle: 'Opens in same tab',
                avatar: { image: 'assets/images/SAP-BusinessDataCloud' + suffix, contain: true, transparent: true },
                url: 'https://www.sap.com/products/technology-platform/business-data-cloud.html',
                target: '_self'
            },
            {
                title: 'Callback Only',
                subtitle: 'No navigation, fires callback',
                icon: 'action',
                callback: () => alert('Custom callback fired')
            }
        ];
    });

    private readonly _themeId = toSignal(inject(ThemingService).currentTheme.pipe(map((t) => t?.id ?? '')), {
        initialValue: ''
    });
}
