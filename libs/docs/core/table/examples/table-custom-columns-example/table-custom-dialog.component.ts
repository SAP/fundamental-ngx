import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkScrollable } from '@angular/cdk/overlay';

import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogModule, DialogRef } from '@fundamental-ngx/core/dialog';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DisplayedColumn } from './table-custom-columns-example.component';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterPipe implements PipeTransform {
    transform(values: any[] = [], searchTerm: string = '', key: string = ''): any[] {
        if (!searchTerm) {
            return values;
        }
        if (key) {
            values = values.filter((item) => item[key].toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        } else {
            values = values.filter((item) => item.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        }
        return values;
    }
}

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 fd-title>Table Customization</h1>
                <ng-template fdkTemplate="subheader">
                    <div fd-bar-middle fdCompact>
                        <fd-bar-element>
                            <button
                                fd-button
                                fdType="transparent"
                                glyph="arrow-top"
                                (click)="sortAlphabetically(true)"
                            ></button>
                            <button
                                fd-button
                                fdType="transparent"
                                glyph="arrow-bottom"
                                (click)="sortAlphabetically()"
                            ></button>
                        </fd-bar-element>
                        <fd-bar-element [fullWidth]="true">
                            <fd-input-group
                                glyph="search"
                                glyphAriaLabel="Submit"
                                name="filter"
                                [(ngModel)]="filterPhrase"
                            >
                            </fd-input-group>
                        </fd-bar-element>
                    </div>
                </ng-template>
            </fd-dialog-header>
            <fd-dialog-body>
                @if (showError) {
                    <fd-message-strip type="error" [dismissible]="false">
                        At least 1 column has to be selected
                    </fd-message-strip>
                }
                <ul fd-list [selection]="true" cdkDropList (cdkDropListDropped)="dropHandle($event)">
                    <li fd-list-item [selected]="allSelected">
                        <fd-checkbox name="All Keys" [ngModel]="allSelected" (ngModelChange)="handleAllChange($event)">
                        </fd-checkbox>
                        <span fd-list-title>All Keys</span>
                    </li>
                    @for (column of columns | filter: filterPhrase : 'key'; track column) {
                        <li cdkDrag fd-list-item [selected]="column.checked">
                            <fd-checkbox
                                [name]="column.key"
                                [(ngModel)]="column.checked"
                                (ngModelChange)="handleChange(column, $event)"
                            >
                            </fd-checkbox>
                            <span fd-list-title>{{ column.key }}</span>
                        </li>
                    }
                </ul>
            </fd-dialog-body>
            <fd-dialog-footer>
                <fd-button-bar fdType="emphasized" label="Save" (click)="save()"> </fd-button-bar>
                <fd-button-bar fd-initial-focus label="Cancel" (click)="dismiss()"> </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    imports: [
        DialogModule,
        TitleComponent,
        TemplateDirective,
        BarModule,
        ContentDensityDirective,
        ButtonComponent,
        InputGroupModule,
        FormsModule,
        CdkScrollable,
        ScrollbarDirective,
        MessageStripComponent,
        ListModule,
        CdkDropList,
        CheckboxComponent,
        CdkDrag,
        FilterPipe
    ]
})
export class TableCustomDialogComponent {
    columns: DisplayedColumn[] = [];
    filterPhrase: string;
    allSelected = false;
    showError = false;

    constructor(public dialogRef: DialogRef) {
        this.columns = this.dialogRef.data.columns;
        this.allSelected = this._areAllSelected();
    }

    handleChange(column: { key: string; checked: boolean }, checked?: boolean): void {
        column.checked = !!checked;

        this.allSelected = this._areAllSelected();

        if (checked) {
            this.showError = false;
        }
    }

    dropHandle(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
        this.columns = [...this.columns];
    }

    handleAllChange(selected?: boolean): void {
        this.allSelected = !!selected;
        if (selected) {
            this.columns.forEach((item) => (item.checked = true));
            this.showError = false;
        } else {
            this.columns.forEach((item) => (item.checked = false));
        }
    }

    sortAlphabetically(reverse?: boolean): void {
        this.columns = this.columns.sort((a, b) => {
            if (a.key > b.key) {
                return -1;
            } else {
                return 1;
            }
        });

        if (reverse) {
            this.columns = this.columns.reverse();
        }

        this.columns = [...this.columns];
    }

    save(): void {
        if (!this._isAnySelected()) {
            this.showError = true;
        } else {
            this.dialogRef.close(this.columns);
        }
    }

    dismiss(): void {
        this.dialogRef.dismiss();
    }

    private _areAllSelected(): boolean {
        return !this.columns.find((c) => !c.checked);
    }

    private _isAnySelected(): boolean {
        return this.columns.some((c) => c.checked);
    }
}
