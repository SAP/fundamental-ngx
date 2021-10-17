import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActionBarHeaderDirective } from './action-bar-header.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionBarModule } from '../action-bar.module';

@Component({
    template: ` <div #directiveElement fd-action-bar-header>Action Bar Header Test Text</div> `
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('ActionBarHeaderDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent],
                imports: [ActionBarModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-action-bar__header');
    });
});
