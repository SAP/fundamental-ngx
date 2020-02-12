import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverModule } from '../../popover.module';

@Component({
    template: `
        <div #directiveElement fd-popover-body-header [compact]="true" [hasSubheader]="true">Popover Header Test</div>
    `
})
class TestComponent {
    @ViewChild('directiveElement', { static: false })
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
        expect(component.ref.nativeElement.className).toContain('fd-popover__body-header');
    });

    it('should take into account the compact input property', () => {
        expect(component.ref.nativeElement.className).toContain('fd-popover__body-header--compact');
    });

    it('should take into account the with-subheader input property', () => {
        expect(component.ref.nativeElement.className).toContain('fd-popover__body-header--with-subheader');
    });
});
