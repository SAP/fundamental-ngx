import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-card-table-example',
    templateUrl: './card-table-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTableExampleComponent {}
