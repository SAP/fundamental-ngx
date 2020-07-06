import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TableModule } from '../table.module';
import { TableCellDirective } from './table-cell.directive';

@Component({
    template: `
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [TableModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
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
        component.cell.checkbox = true;
        component.cell.noBorderX = true;
        component.cell.noBorderY = true;

        fixture.detectChanges();

        expect(component.cell.elementRef.nativeElement.classList.length).toBe(8);
    });
});
