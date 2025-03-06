import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { InfoLabelColor, InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';

@Component({
    selector: 'fd-overflow-layout-always-visible-example',
    templateUrl: './overflow-layout-always-visible-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [OverflowLayoutModule, InfoLabelComponent, ButtonComponent]
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

    infoLabelColorForIndex(i: number): InfoLabelColor {
        return (i % 10) as InfoLabelColor;
    }
}
