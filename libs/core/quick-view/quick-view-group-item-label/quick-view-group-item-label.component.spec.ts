import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewGroupItemLabelComponent } from './quick-view-group-item-label.component';

@Component({
    template: `<fd-quick-view-group-item-label> Group Item Label </fd-quick-view-group-item-label>`,
    standalone: true,
    imports: [QuickViewGroupItemLabelComponent]
})
class TestComponent {}

describe('QuickViewGroupItemLabelComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign classes to fd-form-label', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('label[fd-form-label]'));

        expect(quickViewContainer.nativeElement.classList).toContain('fd-form-label__wrapper');
    });
});
