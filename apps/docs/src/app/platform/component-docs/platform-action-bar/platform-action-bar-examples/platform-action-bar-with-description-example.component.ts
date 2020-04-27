import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'fdp-platform-action-bar-with-description-example',
    templateUrl: './platform-action-bar-with-description-example.component.html',
    styleUrls: ['./platform-action-bar-with-description-example.component.scss'],
})
export class PlatformActionBarWithDescriptionExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onBackBuutonClick() {
        alert('Back button clicked');
    }
}
