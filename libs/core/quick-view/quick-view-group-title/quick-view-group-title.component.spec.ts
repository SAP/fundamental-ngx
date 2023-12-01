import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewGroupTitleComponent } from './quick-view-group-title.component';

@Component({
    template: `
        <fd-quick-view-group-title [id]="id">
            {{ title }}
        </fd-quick-view-group-title>
    `,
    standalone: true,
    imports: [QuickViewGroupTitleComponent]
})
class TestComponent {
    id = 'contact-details-1';
    title = 'Contact Details';
}

describe('QuickViewGroupTitleComponent', () => {
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

    it('should assign id to header text', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('.fd-form-group__header-text'));

        expect(quickViewContainer.nativeElement.id).toEqual(component.id);
    });

    it('should assign aria-labelledby to header', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('.fd-form-group__header'));

        expect(quickViewContainer.nativeElement.getAttribute('aria-labelledby')).toEqual(component.id);
    });
});
