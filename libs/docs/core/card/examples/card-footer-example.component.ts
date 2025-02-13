import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-card-footer-example',
    templateUrl: './card-footer-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, ListModule, ButtonComponent, MenuModule, LinkComponent]
})
export class CardFooterExampleComponent {}
