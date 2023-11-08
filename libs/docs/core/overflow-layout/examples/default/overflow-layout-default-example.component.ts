import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';

@Component({
    selector: 'fd-overflow-layout-default-example',
    templateUrl: './overflow-layout-default-example.component.html',
    styles: [
        `
            ::ng-deep .fd-overflow-layout__items .fd-info-label {
                margin: 0 0.5rem;
            }

            ::ng-deep .fd-overflow-layout__items .fd-info-label .fd-info-label__text {
                white-space: nowrap;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [OverflowLayoutModule, NgFor, InfoLabelModule, ButtonComponent]
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
