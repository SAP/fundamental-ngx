import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewModule } from '../quick-view.module';
import { QuickViewSubheaderComponent } from './quick-view-subheader.component';

@Component({
    template: `
        <fd-quick-view-subheader>
            <fd-avatar image="http://placeimg.com/500/500/people" size="s"></fd-avatar>
            <fd-quick-view-subheader-title> Subheader Title </fd-quick-view-subheader-title>
            <fd-quick-view-subheader-subtitle> Subheader Subtitle</fd-quick-view-subheader-subtitle>
        </fd-quick-view-subheader>

    `
})
class TestComponent {}

describe('QuickViewSubheaderComponent', () => {
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

    it('should assign classes to fd-bar', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('div[fd-bar]'));

        expect(quickViewContainer.nativeElement.classList).toContain('fd-bar');
        expect(quickViewContainer.nativeElement.classList).toContain('fd-bar--header-with-subheader');
    });

    it('should assign class to fd-bar-left', () => {
        const quickViewContainer = fixture.debugElement.query(By.css('div[fd-bar-left]'));

        expect(quickViewContainer.nativeElement.classList).toContain('fd-bar__left');
    });
});
