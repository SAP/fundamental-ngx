import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewModule } from '../quick-view.module';
import { QuickViewGroupItemLabelComponent } from './quick-view-group-item-label.component';

@Component({
    template: `<fd-quick-view-group-item-label> Group Item Label </fd-quick-view-group-item-label>`
})
class TestComponent {}

describe('QuickViewGroupItemLabelComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent],
            imports: [QuickViewModule]
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
        expect(quickViewContainer.nativeElement.classList).toContain('fd-form-label__wrapper--inline-help');
        expect(quickViewContainer.nativeElement.classList).toContain('fd-form-label__wrapper--inline-help--after');
    });
});
