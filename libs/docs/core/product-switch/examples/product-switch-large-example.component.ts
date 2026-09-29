import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { map } from 'rxjs/operators';
import { DEFAULT_SUFFIX, THEME_SUFFIX } from './product-switch-theme-suffix';

const BASE_PRODUCTS = [
    {
        title: 'SAP Start',
        subtitle: 'Central Home',
        basePath: 'assets/images/SAP-Start',
        stickToPosition: true,
        disabledDragAndDrop: true
    },
    { title: 'SAP Ariba', subtitle: 'Procurement', basePath: 'assets/images/SAP-Ariba' },
    { title: 'Business Data Cloud', subtitle: 'Data & Analytics', basePath: 'assets/images/SAP-BusinessDataCloud' },
    { title: 'Integration Suite', subtitle: 'Integration', basePath: 'assets/images/SAP-IntegrationSuite' },
    { title: 'S/4HANA Cloud', subtitle: 'ERP', basePath: 'assets/images/s4hana-cloud' },
    { title: 'SuccessFactors', subtitle: 'HXM Suite', basePath: 'assets/images/SAP-SuccessFactors' },
    { title: 'Concur', subtitle: 'Travel & Expense', basePath: 'assets/images/SAP-Concur' },
    { title: 'Sales Cloud', subtitle: 'CRM', basePath: 'assets/images/SAP-SalesCloud' },
    { title: 'SAP Build', subtitle: 'Low-Code Platform', basePath: 'assets/images/SAP-Build' },
    { title: 'Analytics Cloud', subtitle: 'BI & Planning', basePath: 'assets/images/SAP-AnalyticsCloud' },
    { title: 'Marketing Cloud', subtitle: 'Marketing Cloud', icon: 'marketing-campaign' },
    { title: 'Service Cloud', icon: 'family-care' },
    { title: 'Customer Data Cloud', icon: 'customer-and-contacts' },
    {
        title: 'S/4HANA',
        icon: 'batch-payments',
        url: 'https://www.sap.com/products/erp/s4hana.html',
        target: '_parent' as const
    },
    { title: 'Fieldglass', subtitle: 'SAP Fieldglass', icon: 'personnel-view' },
    { title: 'SuccessFactors', subtitle: 'HXM Suite', icon: 'learning-assistant' },
    { title: 'Ariba Network', subtitle: 'Procurement', icon: 'supplier' },
    { title: 'Concur Invoice', subtitle: 'Invoice Management', icon: 'expense-report' },
    { title: 'Business Network', subtitle: 'Logistics', icon: 'connected' },
    { title: 'Data Intelligence', subtitle: 'SAP DI', icon: 'database' }
] as const;

function resolveProducts(suffix: string): ProductSwitchItem[] {
    return BASE_PRODUCTS.map((p) => ({
        title: p.title,
        subtitle: 'subtitle' in p ? p.subtitle : undefined,
        icon: 'icon' in p ? p.icon : undefined,
        url: 'url' in p ? p.url : undefined,
        target: 'target' in p ? p.target : undefined,
        stickToPosition: 'stickToPosition' in p ? p.stickToPosition : undefined,
        disabledDragAndDrop: 'disabledDragAndDrop' in p ? p.disabledDragAndDrop : undefined,
        ...('basePath' in p && { avatar: { image: p.basePath + suffix, contain: true, transparent: true } })
    }));
}

@Component({
    selector: 'fd-product-switch-large-example',
    templateUrl: './product-switch-large-example.component.html',
    imports: [ProductSwitchBodyComponent]
})
export class ProductSwitchLargeExampleComponent {
    readonly list = linkedSignal<ProductSwitchItem[]>(() =>
        resolveProducts(THEME_SUFFIX[this._themeId()] ?? DEFAULT_SUFFIX)
    );

    private readonly _themeId = toSignal(inject(ThemingService).currentTheme.pipe(map((t) => t?.id ?? '')), {
        initialValue: ''
    });

    productChangeHandle(products: ProductSwitchItem[]): void {
        this.list.set(products);
    }
}
