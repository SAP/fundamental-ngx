import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ProductSwitchBodyComponent, ProductSwitchItem } from '@fundamental-ngx/core/product-switch';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { map } from 'rxjs/operators';
import { DEFAULT_SUFFIX, THEME_SUFFIX } from './product-switch-theme-suffix';

@Component({
    selector: 'fd-product-switch-busy-example',
    templateUrl: './product-switch-busy-example.component.html',
    imports: [ProductSwitchBodyComponent, ButtonComponent]
})
export class ProductSwitchBusyExampleComponent {
    readonly busy = signal(false);

    readonly list = computed<ProductSwitchItem[]>(() => {
        const suffix = THEME_SUFFIX[this._themeId()] ?? DEFAULT_SUFFIX;
        return [
            {
                title: 'SAP Start',
                subtitle: 'Central Home',
                avatar: { image: 'assets/images/SAP-Start' + suffix, contain: true, transparent: true }
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
            }
        ];
    });

    private readonly _themeId = toSignal(inject(ThemingService).currentTheme.pipe(map((t) => t?.id ?? '')), {
        initialValue: ''
    });
}
