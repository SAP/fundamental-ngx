import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-overflow-layout-default-example',
    templateUrl: './overflow-layout-default-example.component.html',
    styles: [
        `
            ::ng-deep .fd-overflow-layout__items .fd-info-label {
                margin: 0 0.5rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverflowLayoutDefaultExampleComponent {
    itemsToRender = new Array(10).fill(null);

    addItem(): void {
        this.itemsToRender.push(null);
    }

    removeItem(): void {
        this.itemsToRender.pop();
    }
}
