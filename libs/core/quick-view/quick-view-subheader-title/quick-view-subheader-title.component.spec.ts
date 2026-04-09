import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewSubheaderTitleComponent } from './quick-view-subheader-title.component';

@Component({
    template: `<fd-quick-view-subheader-title> Subheader Title </fd-quick-view-subheader-title>`,
    standalone: true,
    imports: [QuickViewSubheaderTitleComponent]
})
class TestComponent {}

describe('QuickViewSubheaderTitleComponent', () => {
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

    it('should assign classes to span with fd-title', () => {
        const titleElement = fixture.debugElement.query(By.css('span[fd-title][role="heading"]'));

        expect(titleElement).toBeTruthy();
        expect(titleElement.nativeElement.classList).toContain('fd-title');
        expect(titleElement.nativeElement.classList).toContain('fd-title--h5');
        expect(titleElement.nativeElement.getAttribute('aria-level')).toBe('5');
    });
});
