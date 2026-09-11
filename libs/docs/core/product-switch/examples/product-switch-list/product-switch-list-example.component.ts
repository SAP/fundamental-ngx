import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { map } from 'rxjs/operators';
import { DEFAULT_SUFFIX, THEME_SUFFIX } from '../product-switch-theme-suffix';

@Component({
    selector: 'fd-product-switch-list-example',
    templateUrl: './product-switch-list-example.component.html',
    imports: [ProductSwitchBodyComponent]
})
export class ProductSwitchListComponent {
    readonly list = linkedSignal<ProductSwitchItem[]>(() => {
        const suffix = THEME_SUFFIX[this._themeId()] ?? DEFAULT_SUFFIX;
        return [
            {
                title: 'SAP Start',
                subtitle: 'Central Home',
                avatar: { image: 'assets/images/SAP-Start' + suffix, contain: true, transparent: true },
                stickToPosition: true,
                disabledDragAndDrop: true
            },
            {
                title: 'SAP Ariba',
                subtitle: 'Procurement',
                avatar: { image: 'assets/images/SAP-Ariba' + suffix, contain: true, transparent: true }
            },
            {
                title: 'Business Data Cloud',
                subtitle: 'Data & Analytics',
                avatar: { image: 'assets/images/SAP-BusinessDataCloud' + suffix, contain: true, transparent: true }
            },
            {
                title: 'Integration Suite',
                subtitle: 'Integration',
                avatar: { image: 'assets/images/SAP-IntegrationSuite' + suffix, contain: true, transparent: true }
            },
            {
                title: 'S/4HANA Cloud',
                subtitle: 'ERP',
                avatar: { image: 'assets/images/s4hana-cloud' + suffix, contain: true, transparent: true }
            },
            {
                title: 'SuccessFactors',
                subtitle: 'HXM Suite',
                avatar: { image: 'assets/images/SAP-SuccessFactors' + suffix, contain: true, transparent: true }
            },
            {
                title: 'Concur',
                subtitle: 'Travel & Expense',
                avatar: { image: 'assets/images/SAP-Concur' + suffix, contain: true, transparent: true }
            },
            {
                title: 'Sales Cloud',
                subtitle: 'CRM',
                avatar: { image: 'assets/images/SAP-SalesCloud' + suffix, contain: true, transparent: true }
            },
            {
                title: 'SAP Build',
                subtitle: 'Low-Code Platform',
                avatar: { image: 'assets/images/SAP-Build' + suffix, contain: true, transparent: true }
            },
            {
                title: 'Analytics Cloud',
                subtitle: 'BI & Planning',
                avatar: { image: 'assets/images/SAP-AnalyticsCloud' + suffix, contain: true, transparent: true }
            }
        ];
    });

    private readonly _themeId = toSignal(inject(ThemingService).currentTheme.pipe(map((t) => t?.id ?? '')), {
        initialValue: ''
    });

    productChangeHandle(products: ProductSwitchItem[]): void {
        this.list.set(products);
    }
}
