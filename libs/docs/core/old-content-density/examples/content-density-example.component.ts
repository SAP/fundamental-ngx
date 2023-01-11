import { Component, OnInit } from '@angular/core';
import { ContentDensity, ContentDensityService } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html'
})
export class ContentDensityExampleComponent implements OnInit {
    selectedDensity: ContentDensity;

    constructor(private _contentDensityService: ContentDensityService) {}

    ngOnInit(): void {
        this.selectedDensity = this._contentDensityService.contentDensity.value;
    }

    onChange(): void {
        this._contentDensityService.contentDensity.next(this.selectedDensity);
    }
}
