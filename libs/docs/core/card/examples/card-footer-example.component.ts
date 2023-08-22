import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-footer-example',
    templateUrl: './card-footer-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CardModule, ListModule, ButtonModule, MenuModule, LinkComponent]
})
export class CardFooterExampleComponent {}
