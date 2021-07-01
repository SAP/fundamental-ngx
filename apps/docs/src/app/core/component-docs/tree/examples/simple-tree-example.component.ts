import { Component } from '@angular/core';
import { TreeRowObject } from '@fundamental-ngx/core/tree';

@Component({
    selector: 'fd-simple-tree-example',
    template: `
        <fd-tree
            (editRowClicked)="editRowClicked($event)"
            (deleteRowClicked)="deleteRowClicked($event)"
            [displayTreeActions]="true"
            [headers]="headers"
            [treeData]="items"
        >
        </fd-tree>
    `
})
export class SimpleTreeExampleComponent {
    headers: string[] = ['Column Header 1', 'Column Header 2', 'Column Header 3', 'Column Header 4'];

    items: TreeRowObject[] = [
        {
            rowData: ['Data 1', 'Data 2', 'Data 3', 'Data 4'],
            children: [
                {
                    rowData: ['Child 1', 'Child 2', 'Child 3'],
                    children: [
                        {
                            rowData: ['Grandchild 1', 'Grandchild 2', 'Grandchild 3', 'Grandchild 4']
                        }
                    ]
                }
            ]
        },
        {
            rowData: ['Data 5', 'Data 6', 'Data 7', 'Data 8']
        },
        {
            rowData: ['Data 9'],
            children: [
                {
                    rowData: ['Child 5', 'Child 6', 'Child 7', 'Child 8']
                }
            ]
        }
    ];

    editRowClicked(row): void {
        alert('Edit row clicked');
        console.log(row);
    }

    deleteRowClicked(row): void {
        alert('Delete row clicked');
        console.log(row);
    }
}
