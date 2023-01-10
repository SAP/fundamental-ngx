import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-side-navigation-filter-example',
    templateUrl: './side-navigation-filter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavigationFilterExampleComponent implements OnInit {
    searchTerm = '';

    items = [
        { glyph: 'home', text: 'Level 1 Item' },
        { glyph: 'calendar', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' },
        { glyph: 'customer', text: 'Sed do eiusmod tempor incididunt ut labore' },
        { glyph: 'wrench', text: 'Nemo enim ipsam' }
    ];

    displayedItems: any[] = [];

    ngOnInit() {
        this.displayedItems = this.items;
    }

    handleSearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.displayedItems = this.items.filter((item) =>
            item.text.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    }
}
