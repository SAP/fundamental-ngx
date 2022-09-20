import { Component } from '@angular/core';
import { SkeletonGlobalService } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'skeleton-switch',
    template: `
        <label fd-form-label> Switch skeleton </label>
        <fd-switch style="margin-bottom: 18px" (checkedChange)="onChange()"></fd-switch>
    `
})
export class SkeletonSwitchComponent {
    constructor(private readonly _skeletonGlobalService: SkeletonGlobalService) {}

    onChange(): void {
        this._skeletonGlobalService.setSkeletonState(!this._skeletonGlobalService.skeletonState);
    }
}
