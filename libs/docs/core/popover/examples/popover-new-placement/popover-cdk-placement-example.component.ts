import { Component, ViewChild } from '@angular/core';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { XPositions, YPositions } from '@fundamental-ngx/core/shared';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent as PopoverComponent_1 } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-popover-cdk-placement-example',
    templateUrl: './popover-cdk-placement-example.component.html',
    standalone: true,
    imports: [
        FormLabelModule,
        SegmentedButtonModule,
        FormsModule,
        NgFor,
        ButtonModule,
        PopoverComponent_1,
        PopoverControlComponent,
        PopoverBodyComponent,
        AvatarModule
    ]
})
export class PopoverCdkPlacementExampleComponent {
    @ViewChild(PopoverComponent)
    popover: PopoverComponent;

    yPositions: YPositions[] = ['bottom', 'center', 'top'];
    xPositions: XPositions[] = ['start', 'center', 'end'];

    originX: XPositions = 'center';
    originY: YPositions = 'center';
    overlayX: XPositions = 'center';
    overlayY: YPositions = 'center';

    cdkPosition: ConnectionPositionPair[];

    constructor() {
        this.cdkPosition = this._buildCdkPositionObject();
    }

    refresh(): void {
        this.cdkPosition = this._buildCdkPositionObject();
        this.popover.applyNewPosition(this.cdkPosition);
    }

    private _buildCdkPositionObject(): ConnectionPositionPair[] {
        return [
            {
                originX: this.originX,
                originY: this.originY,
                overlayX: this.overlayX,
                overlayY: this.overlayY
            }
        ];
    }
}
