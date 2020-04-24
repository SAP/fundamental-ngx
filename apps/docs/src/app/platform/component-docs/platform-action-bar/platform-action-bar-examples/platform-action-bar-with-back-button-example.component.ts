import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'fdp-platform-action-bar-with-back-button-example',
    templateUrl: './platform-action-bar-with-back-button-example.component.html',
    styleUrls: ['./platform-action-bar-with-back-button-example.component.scss']
})
export class PlatformActionbarWithBackButtonExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onBackButtonClick() {
        alert('Back button clicked');
    }
}
