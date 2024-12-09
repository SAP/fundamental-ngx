import { Component, ViewEncapsulation } from '@angular/core';
import { DragAndDropModule } from '@fundamental-ngx/cdk/utils';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-dnd-example',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './list-dnd-example.component.html',
    imports: [ListModule, DragAndDropModule]
})
export class ListDndExampleComponent {
    values = [1, 2, 3, 4, 5];

    secondValues = [1, 2, 3, 4, 5];

    trackByFn(index: number): number {
        return index;
    }
}
