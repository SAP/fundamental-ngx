import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';

@Component({
    selector: 'fd-vertical-navigation-condensed-example',
    templateUrl: './vertical-navigation-condensed-example.component.html',
    imports: [VerticalNavigationModule, ListModule, IconComponent, ButtonComponent]
})
export class VerticalNavigationCondensedExampleComponent {
    condensed = signal(true);

    toggleCondensed(): void {
        this.condensed.update((condensed) => !condensed);
    }
}
