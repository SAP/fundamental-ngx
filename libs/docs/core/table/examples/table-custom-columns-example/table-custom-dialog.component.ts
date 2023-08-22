import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { DisplayedColumn } from './table-custom-columns-example.component';
import { DialogRef } from '@fundamental-ngx/core/dialog';
import { FilterPipe } from '../../../../shared/src/lib/core-helpers/pipes/filter.pipe';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ListModule } from '@fundamental-ngx/core/list';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { NgIf, NgFor } from '@angular/common';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { BarModule } from '@fundamental-ngx/core/bar';
import { TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';

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
                <fd-message-strip *ngIf="showError" type="error" [dismissible]="false">
                    At least 1 column has to be selected
                </fd-message-strip>

                <ul fd-list [selection]="true" cdkDropList (cdkDropListDropped)="dropHandle($event)">
                    <li fd-list-item [selected]="allSelected">
                        <fd-checkbox name="All Keys" [ngModel]="allSelected" (ngModelChange)="handleAllChange($event)">
                        </fd-checkbox>
                        <span fd-list-title>All Keys</span>
                    </li>

                    <li
                        *ngFor="let column of columns | filter : filterPhrase : 'key'"
                        cdkDrag
                        fd-list-item
                        [selected]="column.checked"
                    >
                        <fd-checkbox
                            [name]="column.key"
                            [(ngModel)]="column.checked"
                            (ngModelChange)="handleChange(column, $event)"
                        >
                        </fd-checkbox>
                        <span fd-list-title>{{ column.key }}</span>
                    </li>
                </ul>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-button-bar fdType="emphasized" label="Save" (click)="save()"> </fd-button-bar>
                <fd-button-bar fd-initial-focus label="Cancel" (click)="dismiss()"> </fd-button-bar>
            </fd-dialog-footer>
        </fd-dialog>
    `,
    standalone: true,
    imports: [
        DialogModule,
        TitleComponent,
        TemplateDirective,
        BarModule,
        ContentDensityDirective,
        ButtonModule,
        InputGroupModule,
        FormsModule,
        CdkScrollable,
        ScrollbarDirective,
        NgIf,
        MessageStripComponent,
        ListModule,
        CdkDropList,
        CheckboxComponent,
        NgFor,
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
