import { Component, ViewChild } from '@angular/core';
import { PopoverComponent, XPositions, YPositions } from '@fundamental-ngx/core';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
    selector: 'fd-popover-cdk-placement-example',
    templateUrl: './popover-cdk-placement-example.component.html'
})
export class PopoverCdkPlacementExampleComponent {
    list = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

    @ViewChild(PopoverComponent)
    popover: PopoverComponent

    yPositions: YPositions[] = ['bottom', 'center', 'top'];
    xPositions: XPositions[] = ['start', 'center', 'end'];

    originX: XPositions = 'center';
    originY: YPositions = 'center';
    overlayX: XPositions = 'center';
    overlayY: YPositions = 'center';

    cdkPosition: ConnectionPositionPair[]

    constructor() {
        this.cdkPosition = this._buildCdkPositionObject();
    }

    refresh(): void {
        this.cdkPosition = this._buildCdkPositionObject();
        this.popover.applyNewPosition(this.cdkPosition);
    }

    private _buildCdkPositionObject(): ConnectionPositionPair[] {
        return [{
            originX: this.originX,
            originY: this.originY,
            overlayX: this.overlayX,
            overlayY: this.overlayY
        }];
    }
}
