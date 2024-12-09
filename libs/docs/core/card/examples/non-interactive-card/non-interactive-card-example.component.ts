import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent, IllustratedMessageModule, TextComponent } from '@fundamental-ngx/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-non-interactive-card-example',
    templateUrl: './non-interactive-card-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, ListModule, AvatarComponent, ButtonComponent, TextComponent, IllustratedMessageModule]
})
export class NonInteractiveCardExampleComponent {
    sceneConfig = {
        scene: { url: 'assets/images/sapIllus-Scene-NoMail.svg', id: 'sapIllus-Scene-NoMail-1' },
        dialog: { url: 'assets/images/sapIllus-Dialog-NoMail.svg', id: 'sapIllus-Dialog-NoMail' }
    };
}
