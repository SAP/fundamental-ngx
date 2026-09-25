import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableFooterDirective } from './table-footer.directive';

@Component({
    template: `
        <table>
            <tfoot fd-table-footer>
                <tr>
                    <td>Footer</td>
                </tr>
            </tfoot>
        </table>
    `,
    imports: [TableFooterDirective]
})
class TestComponent {}

describe('TableFooterDirective', () => {
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
        const footer = fixture.nativeElement.querySelector('[fd-table-footer]');
        expect(footer.classList.contains('fd-table__footer')).toBe(true);
    });
});
