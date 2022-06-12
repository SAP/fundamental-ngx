import { Component, OnInit } from '@angular/core';
import { ContentDensityControllerService, ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html'
})
export class ContentDensityExampleComponent implements OnInit {
    selectedDensity: ContentDensityMode;

    constructor(readonly _contentDensityService: ContentDensityControllerService) {}

    ngOnInit(): void {
        this.selectedDensity = this._contentDensityService.currentContentDensity;
    }

    onChange($event: any): void {
        this._contentDensityService.updateContentDensity($event);
    }
}
