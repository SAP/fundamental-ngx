import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { SortByPipe } from '../../../../shared/src/lib/core-helpers/pipes/sort.pipe';
import { ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { ListModule } from '@fundamental-ngx/core/list';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-list-data-example',
    templateUrl: './list-data-example.component.html',
    styleUrls: ['./list-data-example.component.scss'],
    standalone: true,
    imports: [
        ToolbarComponent,
        ToolbarLabelDirective,
        ToolbarSpacerDirective,
        InputGroupModule,
        FormsModule,
        ButtonModule,
        ListModule,
        NgFor,
        NgClass,
        ListSecondaryDirective,
        NgIf,
        SortByPipe
    ]
})
export class ListDataExampleComponent implements OnInit {
    items = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Strawberry'];

    ascendingSort = true;

    displayedItems: string[] = [];

    searchTerm = '';

    constructor(private liveAnnouncer: LiveAnnouncer) {}

    ngOnInit(): void {
        this.handleSearchTermChange('');
    }

    removeItem(index: number): void {
        const allValuesIndex = this.items.indexOf(this.displayedItems[index]);
        this.items.splice(allValuesIndex, 1);
        this.displayedItems.splice(index, 1);
    }

    handleSearchTermChange(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.displayedItems = this.items.filter((item) =>
            item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    }

    changeSort(ascending: boolean): void {
        this.ascendingSort = ascending;
        this.liveAnnouncer.clear();
        this.liveAnnouncer.announce(ascending ? 'ascending' : 'descending', 'assertive');
    }
}
