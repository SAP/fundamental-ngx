import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BarModule } from '../bar.module';

@Component({
    template: ` <fd-bar-element #directiveElement [fullWidth]="fullWidth"> Bar Element Test </fd-bar-element> `,
    standalone: true,
    imports: [BarModule]
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
    fullWidth = false;
}

describe('BarElementDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
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
        expect(component.ref.nativeElement.className).toContain('fd-bar__element');
    });

    it('should take into account the fullWidth input property', () => {
        expect(component.ref.nativeElement.className).not.toContain('fd-bar__element--full-width');
        component.fullWidth = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-bar__element--full-width');
    });
});
