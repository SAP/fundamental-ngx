import { Component, Inject } from '@angular/core';
import { DIALOG_REF, DialogRef } from '@fundamental-ngx/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DisplayedColumn } from './table-custom-columns-example.component';

@Component({
    template: `
        <fd-dialog>
            <fd-dialog-header>
                <h1 fd-dialog-title>Table Customization</h1>
                <div fd-bar-middle>
                    <fd-bar-element>
                        <button fd-button [compact]="true" (click)="sortAlphabetically(true)" fdType="transparent" [glyph]="'arrow-top'"></button>
                        <button fd-button [compact]="true" (click)="sortAlphabetically()" fdType="transparent" [glyph]="'arrow-bottom'"></button>
                    </fd-bar-element>
                    <fd-bar-element [fullWidth]="true">
                        <fd-input-group name="filter" [(ngModel)]="filterPhrase" [compact]="true" [glyph]="'search'"></fd-input-group>
                    </fd-bar-element>
                </div>
            </fd-dialog-header>

            <fd-dialog-body>
                <fd-message-strip [type]="'error'" [dismissible]="false" *ngIf="showError">
                    At least 1 column has to be selected
                </fd-message-strip>
                <ul cdkDropList (cdkDropListDropped)="dropHandle($event)" fd-list>

                    <li fd-list-item [selected]="allSelected">
                        <fd-checkbox
                                name="All Keys"
                                label="allKeys"
                                [ngModel]="allSelected"
                                (ngModelChange)="handleAllChange($event)"
                        >
                        </fd-checkbox>
                    </li>

                    <li *ngFor="let column of columns | tableFilter : filterPhrase : 'key'"
                        cdkDrag
                        fd-list-item
                        [selected]="column.checked">
                        <fd-checkbox
                                name="{{column.key}}"
                                label="{{column.key}}"
                                [(ngModel)]="column.checked"
                                (ngModelChange)="handleChange(column, $event)"
                        >
                        </fd-checkbox>
                    </li>
                </ul>
            </fd-dialog-body>

            <fd-dialog-footer>
                <fd-dialog-footer-button>
                    <button
                        fd-button
                        fd-dialog-decisive-button
                        fdType="emphasized"
                        [compact]="true"
                        (click)="save()"
                    >
                        Save and Close
                    </button>
                </fd-dialog-footer-button>
                <fd-dialog-footer-button>
                    <button
                        fd-button
                        fd-dialog-decisive-button
                        fdType="transparent"
                        [compact]="true"
                        (click)="dismiss()"
                    >
                        Close without Saving
                    </button>
                </fd-dialog-footer-button>
            </fd-dialog-footer>
        </fd-dialog>
    `
})
export class TableCustomDialogComponent {
    filterPhrase: string;
    columns: DisplayedColumn[] = [];
    allSelected: boolean = false;
    showError: boolean = false;

    constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {
        this.columns = this.dialogRef.data.columns;
        this.allSelected = this._areAllSelected();
    }

    handleChange(column: { key: string, checked: boolean }, checked?: boolean): void {
        column.checked = checked;

        this.allSelected = this._areAllSelected();

        if (checked) {
            this.showError = false;
        }
    }

    dropHandle(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
        this.columns = [...this.columns];
    }

    handleAllChange(selected?: boolean): void {
        this.allSelected = selected;
        if (selected) {
            this.columns.forEach(item => item.checked = true);
            this.showError = false;
        } else {
            this.columns.forEach(item => item.checked = false);
        }
    }

    sortAlphabetically(reverse?: boolean): void {
        this.columns = this.columns.sort((a, b) => {
            if (a.key > b.key) {
                return -1;
            } else {
                return 1
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
        return !this.columns.find(c => !c.checked);
    }

    private _isAnySelected(): boolean {
        return !!this.columns.find(c => c.checked);
    }
}
