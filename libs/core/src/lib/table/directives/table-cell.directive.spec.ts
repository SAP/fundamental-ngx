import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TableModule } from '../table.module';
import { TableCellDirective } from './table-cell.directive';

@Component({
    template: `
            <td fd-table-cell>
                <fd-checkbox></fd-checkbox>
            </td>
            <td fd-table-cell [key]="key">{{key}}</td>
    `
})
class TestComponent {

    key = 'key1';

    @ViewChild(TableCellDirective)
    cell: TableCellDirective;
}

describe('TableCellDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TableModule]
        }).compileComponents();
    }));

    beforeEach(async() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign classes', () => {

        expect(component.cell.elementRef.nativeElement.classList.length).toBe(1);

        component.cell.activable = true;
        component.cell.hoverable = true;
        component.cell.fitContent = true;
        component.cell.noPadding = true;
        component.cell.noBorderX = true;
        component.cell.noBorderY = true;

        fixture.detectChanges();

        expect(component.cell.elementRef.nativeElement.classList.length).toBe(7);
    });
});
