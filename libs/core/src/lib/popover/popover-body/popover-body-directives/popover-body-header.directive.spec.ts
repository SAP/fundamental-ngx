import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverModule } from '../../popover.module';

@Component({
    template: `
        <div #directiveElement fd-popover-body-header>Popover Header Test</div>
    `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}
describe('PopoverBodyHeaderDirective', () => {

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [PopoverModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-popover__body-header');
    });
});
