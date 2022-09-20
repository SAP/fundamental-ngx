import { Component } from '@angular/core';
import { SkeletonGlobalService } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-skeleton-template-directive-example',
    templateUrl: './skeleton-template-directive-example.component.html',
    styleUrls: ['./skeleton-template-directive-example.component.scss']
})
export class SkeletonTemplateDirectiveExampleComponent {
    localLoading = false;

    constructor(private readonly _skeletonGlobalService: SkeletonGlobalService) {}

    changeGlobalState(): void {
        this._skeletonGlobalService.setSkeletonState(!this._skeletonGlobalService.skeletonState);
    }
}
