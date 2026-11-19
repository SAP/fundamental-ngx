import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListComponent,
    NestedListIconComponent,
    NestedListTitleDirective
} from '@fundamental-ngx/cx/nested-list';
import { SideNavigationComponent, SideNavigationMainComponent } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-filter-example',
    templateUrl: './side-navigation-filter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormItemComponent,
        InputGroupModule,
        FormsModule,
        ScrollbarDirective,
        SideNavigationMainComponent,
        SideNavigationComponent,
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        ContentDensityModule
    ]
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

    ngOnInit(): void {
        this.displayedItems = this.items;
    }

    handleSearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.displayedItems = this.items.filter((item) =>
            item.text.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    }
}
