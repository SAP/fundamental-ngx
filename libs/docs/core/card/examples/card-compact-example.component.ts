import { Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { CardModule } from '@fundamental-ngx/core/card';

@Component({
    selector: 'fd-card-compact-example',
    templateUrl: './card-compact-example.component.html',
    standalone: true,
    imports: [CardModule, ContentDensityDirective, ListModule]
})
export class CardCompactExampleComponent {}
