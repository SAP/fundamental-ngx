import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'fdp-table-different-examples',
    templateUrl: './platform-table-different-examples.component.html'
})
export class PlatformTableDifferentExamplesComponent implements OnInit {
    source: any[] = [];

    constructor() {}

    ngOnInit(): void {}

    onRowSelectionChange(event): void {
        window.alert(event);
    }
}
