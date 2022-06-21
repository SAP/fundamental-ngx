import { Component } from '@angular/core';
import { SkeletonService } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fd-skeleton-template-directive-example',
    templateUrl: './skeleton-template-directive-example.component.html',
    styleUrls: ['./skeleton-template-directive-example.component.scss']
})
export class SkeletonTemplateDirectiveExampleComponent {
    localLoading = false;

    constructor(private readonly _skeletonService: SkeletonService) {}

    changeGlobalState(): void {
        this._skeletonService.setSkeletonState(!this._skeletonService.skeletonState);
    }
}
