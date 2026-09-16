import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableInnerDirective } from './table-inner.directive';

@Component({
    template: `
        <table>
            <tbody>
                <tr>
                    <td>
                        <div fd-table-inner>Inner content</div>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    imports: [TableInnerDirective]
})
class TestComponent {}

describe('TableInnerDirective', () => {
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
        const inner = fixture.nativeElement.querySelector('[fd-table-inner]');
        expect(inner.classList.contains('fd-table__inner')).toBe(true);
    });
});
