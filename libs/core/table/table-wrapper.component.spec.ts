import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableWrapperComponent } from './table-wrapper.component';

@Component({
    template: `
        <fd-table-wrapper>
            <table>
                <thead>
                    <tr>
                        <th>Header</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cell</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Footer</td>
                    </tr>
                </tfoot>
            </table>
        </fd-table-wrapper>
    `,
    imports: [TableWrapperComponent]
})
class TestComponent {}

describe('TableWrapperComponent', () => {
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

    it('should add fd-table class to child table element', () => {
        const table = fixture.nativeElement.querySelector('table');
        expect(table.classList.contains('fd-table')).toBe(true);
    });

    it('should add fd-table__header class to thead element', () => {
        const thead = fixture.nativeElement.querySelector('thead');
        expect(thead.classList.contains('fd-table__header')).toBe(true);
    });

    it('should add fd-table__body class to tbody element', () => {
        const tbody = fixture.nativeElement.querySelector('tbody');
        expect(tbody.classList.contains('fd-table__body')).toBe(true);
    });

    it('should add fd-table__footer class to tfoot element', () => {
        const tfoot = fixture.nativeElement.querySelector('tfoot');
        expect(tfoot.classList.contains('fd-table__footer')).toBe(true);
    });
});
