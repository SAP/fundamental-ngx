import { Component, ViewChild } from '@angular/core';
import { CdkPopoverComponent, XPositions, YPositions } from '@fundamental-ngx/core';
import { ConnectionPositionPair } from '@angular/cdk/overlay';

@Component({
    selector: 'fd-popover-placement-example',
    templateUrl: './popover-placement-example.component.html',
    styleUrls: ['popover-placement-example.component.scss']
})
export class PopoverPlacementExampleComponent {
    list = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

    @ViewChild(CdkPopoverComponent)
    popover: CdkPopoverComponent

    yPositions: YPositions[] = ['bottom', 'center', 'top'];
    xPositions: XPositions[] = ['start', 'center', 'end'];
    arrowPositions = ['top', 'bottom', 'left', 'right'];

    originX: XPositions = 'center';
    originY: YPositions = 'center';
    overlayX: XPositions = 'center';
    overlayY: YPositions = 'center';

    cdkPosition: ConnectionPositionPair[]

    refresh(): void {
        this.cdkPosition = [{
            originX: this.originX,
            originY: this.originY,
            overlayX: this.overlayX,
            overlayY: this.overlayY
        }];

        this.popover.applyNewPosition(this.cdkPosition);
    }
}
