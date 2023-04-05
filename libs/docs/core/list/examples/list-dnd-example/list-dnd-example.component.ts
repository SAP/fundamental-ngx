import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-list-dnd-example',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './list-dnd-example.component.html'
})
export class ListDndExampleComponent {
    values = [1, 2, 3, 4, 5];

    secondValues = [1, 2, 3, 4, 5];

    trackByFn(index: number): number {
        return index;
    }
}
