import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewGroupItemContentComponent } from '../quick-view-group-item-content/quick-view-group-item-content.component';
import { QuickViewGroupItemLabelComponent } from '../quick-view-group-item-label/quick-view-group-item-label.component';
import { QuickViewGroupItemComponent } from './quick-view-group-item.component';

@Component({
    template: `
        <fd-quick-view-group-item>
            <fd-quick-view-group-item-label> Group Item Label </fd-quick-view-group-item-label>
            <fd-quick-view-group-item-content> Group Item Content </fd-quick-view-group-item-content>
        </fd-quick-view-group-item>
    `,
    standalone: true,
    imports: [QuickViewGroupItemComponent, QuickViewGroupItemLabelComponent, QuickViewGroupItemContentComponent]
})
class TestComponent {}

describe('QuickViewGroupItemComponent', () => {
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

    it('should assign fd-form-item class', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('div[fd-form-item]'));

        expect(quickViewContainer.nativeElement.classList).toContain('fd-form-item');
    });
});
