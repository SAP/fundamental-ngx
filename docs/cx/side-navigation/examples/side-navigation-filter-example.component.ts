import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { CxNestedListModule } from '../../../../cx/src/lib/nested-list/nested-list.module';
import { CxSideNavigationModule } from '../../../../cx/src/lib/side-navigation/side-navigation.module';

@Component({
    selector: 'fundamental-ngx-side-navigation-filter-example',
    templateUrl: './side-navigation-filter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, FormItemComponent, InputGroupModule, FormsModule, CxNestedListModule, NgFor]
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
