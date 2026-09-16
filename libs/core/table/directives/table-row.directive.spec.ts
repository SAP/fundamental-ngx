import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableService } from '../table.service';
import { TableCellDirective } from './table-cell.directive';
import { TableRowDirective } from './table-row.directive';

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
});
