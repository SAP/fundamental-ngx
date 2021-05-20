import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { QuickViewModule } from '../quick-view.module';
import { QuickViewTitleComponent } from './quick-view-title.component';

@Component({
    template: `<fd-quick-view-title #titleRef>{{ title }}</fd-quick-view-title>`
})
class TestComponent {
    title = 'Details';
}

describe('QuickViewTitleComponent', () => {
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

    it('should assign classes to bar container', () => {
        const bar = fixture.debugElement.query(By.css('[fd-bar]'));

        expect(bar.nativeElement.classList).toContain('fd-bar');
        expect(bar.nativeElement.classList).toContain('fd-bar--header');
    });

    it('should assign classes to bar section', () => {
        const section = fixture.debugElement.query(By.css('[fd-bar-middle]'));

        expect(section.nativeElement.classList).toContain('fd-bar__middle');
    });

    it('should assign classes to bar element', () => {
        const element = fixture.debugElement.query(By.css('fd-bar-element'));

        expect(element.nativeElement.classList).toContain('fd-bar__element');
    });

    it('should display title in the bar element', () => {
        const element = fixture.debugElement.query(By.css('fd-bar-element'));

        expect(element.nativeElement.innerHTML).toContain(component.title);
    });
});
