import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableService } from '../table.service';
import { TableCellDirective } from './table-cell.directive';
import { HIDDEN_CLASS_NAME, TableRowDirective } from './table-row.directive';

@Component({
    template: `
        <table>
            <tbody>
                <tr fd-table-row>
                    <td fd-table-cell>Cell</td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableRowDirective, TableCellDirective],
    providers: [TableService]
})
class TestComponent {}

@Component({
    template: `
        <table>
            <tbody>
                <tr #rowDirective fd-table-row id="test-row">
                    @for (key of keys; track key) {
                        <td fd-table-cell [key]="key">{{ key }}</td>
                    }
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableRowDirective, TableCellDirective],
    providers: [TableService]
})
class CellManagementTestComponent {
    @ViewChild('rowDirective', { read: TableRowDirective })
    tableRow!: TableRowDirective;

    keys: string[] = ['key1', 'key2', 'key3', 'key4'];

    getElements(): HTMLCollection {
        return (document.getElementById('test-row') as HTMLElement).children;
    }
}

@Component({
    template: `
        <table>
            <tbody>
                <tr
                    fd-table-row
                    [activable]="activable"
                    [hoverable]="hoverable"
                    [main]="main"
                    [secondary]="secondary"
                    [active]="active"
                >
                    <td fd-table-cell>Cell</td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableRowDirective, TableCellDirective],
    providers: [TableService]
})
class ModifierTestComponent {
    activable = false;
    hoverable = false;
    main = false;
    secondary = false;
    active = false;
}

describe('TableRowDirective', () => {
    describe('basic functionality', () => {
        let fixture: ComponentFixture<TestComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestComponent);
            fixture.detectChanges();
        });

        it('should create', () => {
            expect(fixture.componentInstance).toBeTruthy();
        });

        it('should apply base class', () => {
            const row = fixture.nativeElement.querySelector('[fd-table-row]');
            expect(row.classList.contains('fd-table__row')).toBe(true);
        });

        it('should set role="row"', () => {
            const row = fixture.nativeElement.querySelector('[fd-table-row]');
            expect(row.getAttribute('role')).toBe('row');
        });
    });

    describe('modifier classes', () => {
        let modifierFixture: ComponentFixture<ModifierTestComponent>;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [ModifierTestComponent]
            }).compileComponents();

            modifierFixture = TestBed.createComponent(ModifierTestComponent);
            modifierFixture.detectChanges();
        });

        it('should apply activable modifier class', () => {
            const row = modifierFixture.nativeElement.querySelector('tr');
            expect(row.classList.contains('fd-table__row--activable')).toBe(false);
            modifierFixture.componentInstance.activable = true;
            modifierFixture.detectChanges();
            expect(row.classList.contains('fd-table__row--activable')).toBe(true);
        });

        it('should apply hoverable modifier class', () => {
            const row = modifierFixture.nativeElement.querySelector('tr');
            expect(row.classList.contains('fd-table__row--hoverable')).toBe(false);
            modifierFixture.componentInstance.hoverable = true;
            modifierFixture.detectChanges();
            expect(row.classList.contains('fd-table__row--hoverable')).toBe(true);
        });

        it('should apply main modifier class', () => {
            const row = modifierFixture.nativeElement.querySelector('tr');
            expect(row.classList.contains('fd-table__row--main')).toBe(false);
            modifierFixture.componentInstance.main = true;
            modifierFixture.detectChanges();
            expect(row.classList.contains('fd-table__row--main')).toBe(true);
        });

        it('should apply secondary modifier class', () => {
            const row = modifierFixture.nativeElement.querySelector('tr');
            expect(row.classList.contains('fd-table__row--secondary')).toBe(false);
            modifierFixture.componentInstance.secondary = true;
            modifierFixture.detectChanges();
            expect(row.classList.contains('fd-table__row--secondary')).toBe(true);
        });

        it('should apply active state class', () => {
            const row = modifierFixture.nativeElement.querySelector('tr');
            expect(row.classList.contains('is-selected')).toBe(false);
            modifierFixture.componentInstance.active = true;
            modifierFixture.detectChanges();
            expect(row.classList.contains('is-selected')).toBe(true);
        });
    });

    describe('cell management', () => {
        let cellFixture: ComponentFixture<CellManagementTestComponent>;
        let cellComponent: CellManagementTestComponent;

        const getElements = (): Element[] => {
            const elements = cellComponent.getElements();
            return Array.from(elements);
        };

        const getInnerTextFromNodes = (): string[] => getElements().map((cell) => cell.innerHTML.trim());

        const getVisibleCells = (): string[] =>
            getElements()
                .filter((cell) => !cell.classList.contains(HIDDEN_CLASS_NAME))
                .map((cell) => cell.innerHTML.trim());

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [CellManagementTestComponent]
            }).compileComponents();

            cellFixture = TestBed.createComponent(CellManagementTestComponent);
            cellComponent = cellFixture.componentInstance;
            cellFixture.detectChanges();
            await cellFixture.whenStable();
        });

        it('should sort cells when _resetCells is called with reordered keys', async () => {
            let keys = cellComponent.keys;

            // Initial order should match keys array
            expect(getInnerTextFromNodes()).toEqual(keys);

            // Reverse the order
            keys = [...cellComponent.keys].reverse();
            (cellComponent.tableRow as any)._resetCells(keys);

            cellFixture.detectChanges();
            await cellFixture.whenStable();

            expect(getInnerTextFromNodes()).toEqual(keys);

            // Custom reorder: swap pairs
            keys = [cellComponent.keys[1], cellComponent.keys[0], cellComponent.keys[3], cellComponent.keys[2]];
            (cellComponent.tableRow as any)._resetCells(keys);

            cellFixture.detectChanges();

            expect(getInnerTextFromNodes()).toEqual(keys);
        });

        it('should hide cells when _resetCells is called with fewer keys', () => {
            let keys = cellComponent.keys;

            // All cells should be visible initially
            expect(getInnerTextFromNodes()).toEqual(keys);

            // Remove one key - that cell should be hidden
            cellComponent.keys.pop();
            keys = cellComponent.keys;
            (cellComponent.tableRow as any)._resetCells(keys);

            cellFixture.detectChanges();

            expect(getVisibleCells()).toEqual(keys);

            // Remove another key
            cellComponent.keys.pop();
            keys = cellComponent.keys;
            (cellComponent.tableRow as any)._resetCells(keys);

            cellFixture.detectChanges();

            expect(getVisibleCells()).toEqual(keys);
        });
    });
});
