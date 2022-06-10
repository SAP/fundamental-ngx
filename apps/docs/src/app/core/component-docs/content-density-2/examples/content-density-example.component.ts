import { Component, OnInit } from '@angular/core';
import { ContentDensity, ContentDensityService } from '@fundamental-ngx/core/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html'
})
export class ContentDensityExampleComponent implements OnInit {
    selectedDensity: ContentDensityMode;

    constructor(private _contentDensityService: ContentDensityService) {}

    ngOnInit(): void {
        this.selectedDensity = this._contentDensityService.contentDensity.value as ContentDensityMode;
    }

    onChange(): void {
        this._contentDensityService.contentDensity.next(this.selectedDensity as ContentDensity);
    }
}
