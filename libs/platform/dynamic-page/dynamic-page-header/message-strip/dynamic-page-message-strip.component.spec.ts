import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DynamicPageMessageStripComponent } from './dynamic-page-message-strip.component';

@Component({
    template: `
        <fdp-dynamic-page-message-strip>
            <div class="test-content">Message strip content</div>
        </fdp-dynamic-page-message-strip>
    `,
    imports: [DynamicPageMessageStripComponent]
})
class TestHostComponent {}

describe('DynamicPageMessageStripComponent', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();
    });

    it('should create', () => {
        const component = fixture.debugElement.query(By.directive(DynamicPageMessageStripComponent));
        expect(component).toBeTruthy();
    });

    it('should expose contentTemplateRef', () => {
        const instance = fixture.debugElement.query(By.directive(DynamicPageMessageStripComponent)).componentInstance;
        expect(instance.contentTemplateRef()).toBeTruthy();
    });

    it('should not render content directly (wrapped in ng-template)', () => {
        const content = fixture.nativeElement.querySelector('.test-content');
        expect(content).toBeFalsy();
    });
});
