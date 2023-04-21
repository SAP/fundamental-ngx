import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PopoverModule } from '../../popover.module';

@Component({
    template: ` <div #directiveElement fd-popover-body-footer>Popover Footer Test</div> `,
    standalone: true,
    imports: [PopoverModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('PopoverBodyFooterDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PopoverModule, TestComponent]
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

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-popover__body-footer');
    });
});
