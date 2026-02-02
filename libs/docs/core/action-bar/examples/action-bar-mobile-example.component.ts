import { Component, computed, inject, viewChild } from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import {
    ActionBarActionsDirective,
    ActionBarBackDirective,
    ActionBarComponent,
    ActionBarDescriptionDirective,
    ActionBarHeaderDirective,
    ActionBarMobileDirective,
    ActionBarTitleComponent
} from '@fundamental-ngx/core/action-bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-action-bar-mobile-example',
    templateUrl: './action-bar-mobile-example.component.html',
    imports: [
        ActionBarMobileDirective,
        ActionBarComponent,
        ActionBarHeaderDirective,
        ActionBarBackDirective,
        ActionBarTitleComponent,
        ActionBarActionsDirective,
        ActionBarDescriptionDirective,
        ButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuTriggerDirective
    ]
})
export class ActionBarMobileExampleComponent {
    protected readonly menu = viewChild.required<MenuComponent>('menu');

    protected readonly navigationArrow = computed(() =>
        this._rtlService?.rtl() ? 'navigation-right-arrow' : 'navigation-left-arrow'
    );

    private readonly _rtlService = inject(RtlService, { optional: true });

    protected closeMenu(): void {
        this.menu().close();
    }
}
