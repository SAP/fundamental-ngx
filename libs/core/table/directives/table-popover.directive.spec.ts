import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablePopoverDirective } from './table-popover.directive';

@Component({
    template: `
        <table>
            <tbody>
                <tr>
                    <td>
                        <div fd-table-popover>Popover content</div>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TablePopoverDirective]
})
class TestComponent {}

describe('TablePopoverDirective', () => {
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

    it('should apply base classes', () => {
        const popover = fixture.nativeElement.querySelector('[fd-table-popover]');
        expect(popover.classList.contains('fd-table__popover')).toBe(true);
        expect(popover.classList.contains('fd-table__popover--custom')).toBe(true);
    });
});
