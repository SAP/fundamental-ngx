import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionBarModule } from './action-bar.module';

@Component({
    template: ` <div #componentElement fd-action-bar>Action Bar Parent Test Text</div> `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;
}

describe('Action Bar Parent Component', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
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
