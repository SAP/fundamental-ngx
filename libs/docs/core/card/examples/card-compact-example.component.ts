import { Component } from '@angular/core';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-card-compact-example',
    templateUrl: './card-compact-example.component.html',
    imports: [CardModule, ContentDensityDirective, ListModule]
})
export class CardCompactExampleComponent {}
