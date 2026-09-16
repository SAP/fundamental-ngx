import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellDirective } from './table-cell.directive';

@Component({
    template: `
        <table>
            <thead>
                <tr>
                    <th fd-table-cell>Header</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td fd-table-cell>Cell</td>
                    <th fd-table-cell>Row Header</th>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableCellDirective]
})
class TestComponent {}

@Component({
    template: `
        <table>
            <tbody>
                <tr>
                    <td
                        fd-table-cell
                        [noBorderX]="noBorderX"
                        [noBorderY]="noBorderY"
                        [activable]="activable"
                        [hoverable]="hoverable"
                        [fitContent]="fitContent"
                        [noPadding]="noPadding"
                        [noData]="noData"
                        [nonInteractive]="nonInteractive"
                    >
                        Cell
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableCellDirective]
})
class ModifierTestComponent {
    noBorderX = false;
    noBorderY = false;
    activable = false;
    hoverable = false;
    fitContent = false;
    noPadding = false;
    noData = false;
    nonInteractive = false;
}

describe('TableCellDirective', () => {
    describe('role attributes', () => {
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
            const cells = fixture.nativeElement.querySelectorAll('[fd-table-cell]');
            cells.forEach((cell: HTMLElement) => {
                expect(cell.classList.contains('fd-table__cell')).toBe(true);
            });
        });

        it('should set role="columnheader" for th in thead', () => {
            const theadCell = fixture.nativeElement.querySelector('thead th');
            expect(theadCell.getAttribute('role')).toBe('columnheader');
        });

        it('should set role="gridcell" for td in tbody', () => {
            const tbodyCell = fixture.nativeElement.querySelector('tbody td');
            expect(tbodyCell.getAttribute('role')).toBe('gridcell');
        });

        it('should set role="rowheader" and scope="row" for th in tbody', () => {
            const tbodyHeader = fixture.nativeElement.querySelector('tbody th');
            expect(tbodyHeader.getAttribute('role')).toBe('rowheader');
            expect(tbodyHeader.getAttribute('scope')).toBe('row');
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

        it('should apply noBorderX modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--no-horizontal-border')).toBe(false);
            modifierFixture.componentInstance.noBorderX = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--no-horizontal-border')).toBe(true);
        });

        it('should apply noBorderY modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--no-vertical-border')).toBe(false);
            modifierFixture.componentInstance.noBorderY = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--no-vertical-border')).toBe(true);
        });

        it('should apply activable modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--activable')).toBe(false);
            modifierFixture.componentInstance.activable = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--activable')).toBe(true);
        });

        it('should apply hoverable modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--hoverable')).toBe(false);
            modifierFixture.componentInstance.hoverable = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--hoverable')).toBe(true);
        });

        it('should apply fitContent modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--fit-content')).toBe(false);
            modifierFixture.componentInstance.fitContent = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--fit-content')).toBe(true);
        });

        it('should apply noPadding modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--no-padding')).toBe(false);
            modifierFixture.componentInstance.noPadding = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--no-padding')).toBe(true);
        });

        it('should apply noData modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--no-data')).toBe(false);
            modifierFixture.componentInstance.noData = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--no-data')).toBe(true);
        });

        it('should apply nonInteractive modifier class', () => {
            const cell = modifierFixture.nativeElement.querySelector('td');
            expect(cell.classList.contains('fd-table__cell--non-interactive')).toBe(false);
            modifierFixture.componentInstance.nonInteractive = true;
            modifierFixture.detectChanges();
            expect(cell.classList.contains('fd-table__cell--non-interactive')).toBe(true);
        });
    });
});
