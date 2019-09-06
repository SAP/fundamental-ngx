import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionBarTitleDirective } from './action-bar-title.directive';
import { ActionBarModule } from '../action-bar.module';

@Component({
    template: `
        <h1 #directiveElement fd-action-bar-title>Action Bar Title Test Text</h1>
    `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('ActionBarTitleDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [ActionBarModule]
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
        expect(component.ref.nativeElement.className).toBe('fd-action-bar__title');
    });
});
