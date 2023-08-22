import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { NgFor } from '@angular/common';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';

@Component({
    selector: 'fd-overflow-layout-always-visible-example',
    templateUrl: './overflow-layout-always-visible-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [OverflowLayoutModule, NgFor, InfoLabelModule, ButtonModule]
})
export class OverflowLayoutAlwaysVisibleExampleComponent {
    itemsToRender: { forcedVisibility: boolean }[] = new Array(15).fill({ forcedVisibility: false });

    constructor(private _cdr: ChangeDetectorRef) {}

    addItem(): void {
        this.itemsToRender.push({ forcedVisibility: false });
    }

    removeItem(): void {
        this.itemsToRender.pop();
    }

    toggleForcedVisibility(index: number): void {
        this.itemsToRender.forEach((item) => (item.forcedVisibility = false));
        this.itemsToRender[index] = { forcedVisibility: true };
        this._cdr.detectChanges();
    }
}
