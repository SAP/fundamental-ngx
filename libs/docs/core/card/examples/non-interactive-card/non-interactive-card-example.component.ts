import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, TextComponent } from '@fundamental-ngx/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-non-interactive-card-example',
    templateUrl: './non-interactive-card-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CardModule, ListModule, AvatarComponent, ButtonComponent, TextComponent]
})
export class NonInteractiveCardExampleComponent {}
