import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormLabelModule } from '@fundamental-ngx/core/form';
import {
    PopoverBodyComponent,
    PopoverComponent,
    PopoverComponent as PopoverComponent_1,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { XPositions, YPositions } from '@fundamental-ngx/core/shared';

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
