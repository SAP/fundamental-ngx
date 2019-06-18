import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionBarModule } from './action-bar.module';

@Component({
    template: `
        <div #directiveElement fd-action-bar>Action Bar Parent Test Text</div>
    `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('Action Bar Parent Directive', () => {
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
        expect(component.ref.nativeElement.className).toBe('fd-action-bar');
    });
});
