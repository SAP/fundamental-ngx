import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionBarModule } from '../action-bar.module';

@Component({
    template: ` <div #directiveElement fd-action-bar-mobile>Action Bar Mobile Test Text</div> `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('ActionBarDescription', () => {
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
});
