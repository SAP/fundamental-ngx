import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-layout-actions.component';

@Component({
    template: `
        <fd-dynamic-page-layout-actions>
            <fd-toolbar>
                <button>Layout Action 1</button>
                <button>Layout Action 2</button>
            </fd-toolbar>
        </fd-dynamic-page-layout-actions>
    `,
    imports: [DynamicPageLayoutActionsComponent, ToolbarModule]
})
class TestHostComponent {
    @ViewChild(DynamicPageLayoutActionsComponent)
    layoutActions: DynamicPageLayoutActionsComponent;
}

@Component({
    template: `
        <fd-dynamic-page-layout-actions>
            <div class="custom-content">No toolbar here</div>
        </fd-dynamic-page-layout-actions>
    `,
    imports: [DynamicPageLayoutActionsComponent]
})
class TestHostWithoutToolbarComponent {
    @ViewChild(DynamicPageLayoutActionsComponent)
    layoutActions: DynamicPageLayoutActionsComponent;
}

describe('DynamicPageLayoutActionsComponent', () => {
    describe('with toolbar', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let component: TestHostComponent;
        let layoutActions: DynamicPageLayoutActionsComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            layoutActions = component.layoutActions;
        });

        it('should create', () => {
            expect(layoutActions).toBeTruthy();
        });

        it('should have role="toolbar" on host element', () => {
            const hostElement = fixture.nativeElement.querySelector('fd-dynamic-page-layout-actions');
            expect(hostElement.getAttribute('role')).toBe('toolbar');
        });

        it('should have margin-inline-start auto on host element', () => {
            const hostElement = fixture.nativeElement.querySelector('fd-dynamic-page-layout-actions');
            expect(hostElement.style.marginInlineStart).toBe('auto');
        });

        it('should add dynamic page toolbar classes after render', fakeAsync(() => {
            // Wait for afterNextRender to execute
            tick();
            fixture.detectChanges();

            const toolbarEl = fixture.nativeElement.querySelector('.fd-toolbar');
            expect(toolbarEl.classList.contains(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar)).toBe(true);
            expect(toolbarEl.classList.contains(DYNAMIC_PAGE_CLASS_NAME.dynamicPageLayoutActionsToolbar)).toBe(true);
        }));
    });

    describe('without toolbar', () => {
        let fixture: ComponentFixture<TestHostWithoutToolbarComponent>;
        let component: TestHostWithoutToolbarComponent;
        let layoutActions: DynamicPageLayoutActionsComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostWithoutToolbarComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostWithoutToolbarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            layoutActions = component.layoutActions;
        });

        it('should create without toolbar', () => {
            expect(layoutActions).toBeTruthy();
        });

        it('should still have host attributes without toolbar', () => {
            const hostElement = fixture.nativeElement.querySelector('fd-dynamic-page-layout-actions');
            expect(hostElement.getAttribute('role')).toBe('toolbar');
            expect(hostElement.style.marginInlineStart).toBe('auto');
        });
    });
});
