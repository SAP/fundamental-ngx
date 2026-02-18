import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ToolbarComponent, ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
import { DynamicPageService } from '../../dynamic-page.service';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-global-actions.component';

@Component({
    template: `
        <fd-dynamic-page-global-actions>
            <fd-toolbar>
                <button>Action 1</button>
                <button>Action 2</button>
            </fd-toolbar>
        </fd-dynamic-page-global-actions>
    `,
    imports: [DynamicPageGlobalActionsComponent, ToolbarModule],
    providers: [DynamicPageService]
})
class TestHostComponent {
    @ViewChild(DynamicPageGlobalActionsComponent)
    globalActions: DynamicPageGlobalActionsComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

@Component({
    template: `
        <fd-dynamic-page-global-actions>
            <div class="custom-content">No toolbar here</div>
        </fd-dynamic-page-global-actions>
    `,
    imports: [DynamicPageGlobalActionsComponent],
    providers: [DynamicPageService]
})
class TestHostWithoutToolbarComponent {
    @ViewChild(DynamicPageGlobalActionsComponent)
    globalActions: DynamicPageGlobalActionsComponent;

    constructor(public dynamicPageService: DynamicPageService) {}
}

describe('DynamicPageGlobalActionsComponent', () => {
    describe('with toolbar', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let component: TestHostComponent;
        let globalActions: DynamicPageGlobalActionsComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            globalActions = component.globalActions;
        });

        it('should create', () => {
            expect(globalActions).toBeTruthy();
        });

        it('should have role="toolbar" on host element', () => {
            const hostElement = fixture.nativeElement.querySelector('fd-dynamic-page-global-actions');
            expect(hostElement.getAttribute('role')).toBe('toolbar');
        });

        it('should have toolbar component signal reference', () => {
            const toolbar = (globalActions as any)._toolbarComponent();
            expect(toolbar).toBeTruthy();
            expect(toolbar instanceof ToolbarComponent).toBe(true);
        });

        it('should add dynamic page toolbar class after render', fakeAsync(() => {
            // Wait for afterNextRender to execute
            tick();
            fixture.detectChanges();

            const toolbarEl = fixture.nativeElement.querySelector('.fd-toolbar');
            expect(toolbarEl.classList.contains(DYNAMIC_PAGE_CLASS_NAME.dynamicPageToolbar)).toBe(true);
        }));

        describe('shouldOverflow signal', () => {
            it('should return true when responsive size is small', () => {
                // Set pixel width to trigger 'small' size (<=599px)
                component.dynamicPageService.pixelsSizeChanged.set(500);
                fixture.detectChanges();

                expect((globalActions as any).shouldOverflow()).toBe(true);
            });

            it('should return false when responsive size is medium', () => {
                // Set pixel width to trigger 'medium' size (600-1023px)
                component.dynamicPageService.pixelsSizeChanged.set(800);
                fixture.detectChanges();

                expect((globalActions as any).shouldOverflow()).toBe(false);
            });

            it('should return false when responsive size is large', () => {
                // Set pixel width to trigger 'large' size (1024-1439px)
                component.dynamicPageService.pixelsSizeChanged.set(1200);
                fixture.detectChanges();

                expect((globalActions as any).shouldOverflow()).toBe(false);
            });

            it('should return false when responsive size is extra-large', () => {
                // Set pixel width to trigger 'extra-large' size (>=1440px)
                component.dynamicPageService.pixelsSizeChanged.set(1600);
                fixture.detectChanges();

                expect((globalActions as any).shouldOverflow()).toBe(false);
            });
        });
    });

    describe('without toolbar', () => {
        let fixture: ComponentFixture<TestHostWithoutToolbarComponent>;
        let component: TestHostWithoutToolbarComponent;
        let globalActions: DynamicPageGlobalActionsComponent;

        beforeEach(async () => {
            await TestBed.configureTestingModule({
                imports: [TestHostWithoutToolbarComponent]
            }).compileComponents();

            fixture = TestBed.createComponent(TestHostWithoutToolbarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            globalActions = component.globalActions;
        });

        it('should create without toolbar', () => {
            expect(globalActions).toBeTruthy();
        });

        it('should not have toolbar component reference', () => {
            expect((globalActions as any)._toolbarComponent()).toBeFalsy();
        });

        it('should not throw when size changes without toolbar', () => {
            expect(() => {
                component.dynamicPageService.pixelsSizeChanged.set(500);
                fixture.detectChanges();
            }).not.toThrow();
        });
    });
});
