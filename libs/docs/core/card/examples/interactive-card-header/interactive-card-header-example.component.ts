import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent, ButtonComponent, TextComponent } from '@fundamental-ngx/core';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-interactive-card-header-example',
    templateUrl: './interactive-card-header-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, ListModule, AvatarComponent, ButtonComponent, TextComponent]
})
export class InteractiveCardHeaderExampleComponent {}
