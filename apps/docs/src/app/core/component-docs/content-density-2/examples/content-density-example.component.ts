import { Component, OnInit } from '@angular/core';
import { ContentDensityMode, ContentDensityControllerService } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-content-density-example',
    templateUrl: './content-density-example.component.html'
})
export class ContentDensityExampleComponent implements OnInit {
    selectedDensity: ContentDensityMode;

    constructor(private _contentDensityService: ContentDensityControllerService) {}

    ngOnInit(): void {
        this.selectedDensity = this._contentDensityService.currentContentDensity;
    }

    onChange($event: any): void {
        this._contentDensityService.updateContentDensity($event);
    }
}
