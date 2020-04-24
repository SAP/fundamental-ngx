import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-edit-title-example',
    templateUrl: './platform-action-bar-edit-title-example.component.html',
    styleUrls: ['./platform-action-bar-edit-title-example.component.scss']
})
export class PlatformActionbarEditTitleExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onBackBuutonClick() {
        alert('Back button clicked');
    }
}
