import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionBarTitleComponent } from './action-bar-title.component';

@Component({
    template: `<div #componentElement fd-action-bar-title>Action Bar Title Test Text</div> `,
    imports: [ActionBarTitleComponent]
})
class TestComponent {
    readonly ref = viewChild.required('componentElement', { read: ElementRef });
}

describe('ActionBarTitleComponent', () => {
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
        expect(component.ref().nativeElement.className).toBe('fd-action-bar__title');
    });
});
