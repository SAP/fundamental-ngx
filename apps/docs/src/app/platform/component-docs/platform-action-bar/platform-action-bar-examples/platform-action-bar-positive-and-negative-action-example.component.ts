import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-positive-and-negative-action-example',
    templateUrl: './platform-action-bar-positive-and-negative-action-example.component.html',
    styleUrls: ['./platform-action-bar-positive-and-negative-action-example.component.scss']
})
export class PlatformActionbarWithPositiveNegativeActionsExampleComponent implements OnInit {
    actionItems: any[];
    constructor() {}

    ngOnInit() {}

    onBackBuutonClick() {
        alert('Back button clicked');
    }
}
