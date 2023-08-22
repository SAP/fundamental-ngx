import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { NgFor } from '@angular/common';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [OverflowLayoutModule, NgFor, InfoLabelModule, ButtonModule]
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
