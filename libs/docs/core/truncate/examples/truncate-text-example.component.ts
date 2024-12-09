import { Component } from '@angular/core';
import { TruncatePipe } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-truncate-text-example',
    template: ` <p>{{ text | truncate: 30 }}</p> `,
    imports: [TruncatePipe]
})
export class TruncateTextExampleComponent {
    text =
        'Very very long text very very very very very Long long  very very very very very very very very very very very very very very long';
}
