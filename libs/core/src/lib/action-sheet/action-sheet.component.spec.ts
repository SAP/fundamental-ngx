import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActionSheetComponent } from './action-sheet.component';

@Component({
    template: ` <fd-action-sheet #componentElement>Action Sheet Parent Test Text</fd-action-sheet> `,
    standalone: true,
    imports: [ActionSheetComponent]
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef })
    ref: ElementRef;
}

describe('Action Sheet Parent Component', () => {
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
});
