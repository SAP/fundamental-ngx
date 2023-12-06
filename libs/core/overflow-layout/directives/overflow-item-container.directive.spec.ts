import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverflowItemContainerRefDirective } from './overflow-item-container-ref.directive';

@Component({
    template: `<div id="directive_element" *fdOverflowItemContainerRef></div>`,
    standalone: true,
    imports: [OverflowItemContainerRefDirective]
})
export class TestComponent {
    @ViewChild(OverflowItemContainerRefDirective, { read: OverflowItemContainerRefDirective })
    directive: OverflowItemContainerRefDirective;
}

describe('OverflowItemContainerDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: OverflowItemContainerRefDirective;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        directive = fixture.componentInstance.directive;
    });

    it('should show directive', async () => {
        directive.hidden = false;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelector('#directive_element')).toBeTruthy();
    });

    it('should hide directive', async () => {
        directive.hidden = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelector('#directive_element')).toBeNull();
    });
});
