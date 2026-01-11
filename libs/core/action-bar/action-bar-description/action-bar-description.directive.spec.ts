import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionBarDescriptionDirective } from './action-bar-description.directive';

@Component({
    template: `
        <div #directiveElement fd-action-bar-description [withBackBtn]="withBackBtn">Action Bar Description Text</div>
    `,
    imports: [ActionBarDescriptionDirective]
})
class TestComponent {
    readonly ref = viewChild.required('directiveElement', { read: ElementRef });
    withBackBtn = false;
}

describe('ActionBarDescription', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref().nativeElement.className).toBe('fd-action-bar__description');
    });

    it('should apply back button class when withBackBtn is true', () => {
        component.withBackBtn = true;
        fixture.detectChanges();

        expect(component.ref().nativeElement.classList.contains('fd-action-bar__description--back')).toBe(true);
    });
});
