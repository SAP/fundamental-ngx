import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-usage',
    templateUrl: './usage.component.html'
})
export class UsageDocsComponent implements OnInit {
    usageExampleHtml = `<fd-alert [dismissible]="true" type="warning" (close)="showAlert($event)">
  A dismissible warning type alert.
</fd-alert>`;

    constructor() {}

    ngOnInit() {}
}
