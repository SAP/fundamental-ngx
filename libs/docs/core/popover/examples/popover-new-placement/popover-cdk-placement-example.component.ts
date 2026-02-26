import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { XPositions, YPositions } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-popover-cdk-placement-example',
    templateUrl: './popover-cdk-placement-example.component.html',
    imports: [
        FormLabelComponent,
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        AvatarComponent
    ]
})
export class PopoverCdkPlacementExampleComponent {
    readonly popover = viewChild(PopoverComponent);

    readonly yPositions: YPositions[] = ['bottom', 'center', 'top'];
    readonly xPositions: XPositions[] = ['start', 'center', 'end'];

    originX = signal<XPositions>('center');
    originY = signal<YPositions>('center');
    overlayX = signal<XPositions>('center');
    overlayY = signal<YPositions>('center');

    cdkPosition = signal<ConnectionPositionPair[]>(this._buildCdkPositionObject());

    refresh(): void {
        this.cdkPosition.set(this._buildCdkPositionObject());
        this.popover()?.applyNewPosition(this.cdkPosition());
    }

    private _buildCdkPositionObject(): ConnectionPositionPair[] {
        return [
            {
                originX: this.originX(),
                originY: this.originY(),
                overlayX: this.overlayX(),
                overlayY: this.overlayY()
            }
        ];
    }
}
