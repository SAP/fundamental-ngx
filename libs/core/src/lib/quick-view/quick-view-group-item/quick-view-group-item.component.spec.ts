import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewModule } from '../quick-view.module';
import { QuickViewGroupItemComponent } from './quick-view-group-item.component';

@Component({
    template: `        
        <fd-quick-view-group-item>
            <fd-quick-view-group-item-label> Group Item Label </fd-quick-view-group-item-label>
            <fd-quick-view-group-item-content> Group Item Content </fd-quick-view-group-item-content>
        </fd-quick-view-group-item>
    `
})
class TestComponent {}

describe('QuickViewGroupItemComponent', () => {
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

    it('should assign fd-form-item class', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('div[fd-form-item]'));

        expect(quickViewContainer.nativeElement.classList).toContain('fd-form-item');
    });
});
