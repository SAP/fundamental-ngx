import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormItemComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import {
    NestedItemComponent,
    NestedLinkComponent,
    NestedListButtonDirective,
    NestedListComponent,
    NestedListContentDirective,
    NestedListExpandIconComponent,
    NestedListHeaderDirective,
    NestedListIconComponent,
    NestedListPopoverComponent,
    NestedListTitleDirective,
    PreparedNestedListComponent
} from '@fundamental-ngx/cx/nested-list';
import {
    SideNavigationButtonDirective,
    SideNavigationComponent,
    SideNavigationMainComponent,
    SideNavigationUtilityDirective
} from '@fundamental-ngx/cx/side-navigation';
import { I18nModule } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fdx-side-navigation-filter-example',
    templateUrl: './side-navigation-filter-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormItemComponent,
        InputGroupModule,
        FormsModule,
        ButtonComponent,
        ScrollbarModule,
        I18nModule,
        SideNavigationMainComponent,
        SideNavigationUtilityDirective,
        SideNavigationButtonDirective,
        SideNavigationComponent,
        NestedListComponent,
        NestedLinkComponent,
        NestedItemComponent,
        NestedListIconComponent,
        NestedListTitleDirective,
        NestedListHeaderDirective,
        NestedListPopoverComponent,
        PreparedNestedListComponent,
        NestedListExpandIconComponent,
        NestedListContentDirective,
        NestedListButtonDirective,
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
