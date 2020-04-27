import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdp-platform-action-bar-contextual-menu-example',
    templateUrl: './platform-action-bar-contextual-menu-example.component.html',
    styleUrls: ['./platform-action-bar-contextual-menu-example.component.scss'],
})
export class PlatformActionBarWithContextualMenuExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onBackButtonClick() {
        alert('Back button clicked');
    }
}
