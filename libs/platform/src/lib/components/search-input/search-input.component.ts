import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'fp-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss']
})
export class SearchInput2Component implements OnInit {
    /**
     * Place holder text for search input field.
     */
    @Input() placeholder: string;

    /**
     * List of string values to populate dropdown selection.
     */
    @Input() dropdownValues: string[] = [];

    constructor() {}

    ngOnInit() {}
}
