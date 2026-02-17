import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ToolbarComponent, ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DYNAMIC_PAGE_CLASS_NAME } from '../../constants';
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
    imports: [DynamicPageGlobalActionsComponent, ToolbarModule]
})
class TestHostComponent {
    @ViewChild(DynamicPageGlobalActionsComponent)
    globalActions: DynamicPageGlobalActionsComponent;
}

@Component({
    template: `
        <fd-dynamic-page-global-actions>
            <div class="custom-content">No toolbar here</div>
        </fd-dynamic-page-global-actions>
    `,
    imports: [DynamicPageGlobalActionsComponent]
})
class TestHostWithoutToolbarComponent {
    @ViewChild(DynamicPageGlobalActionsComponent)
    globalActions: DynamicPageGlobalActionsComponent;
}

describe('DynamicPageGlobalActionsComponent', () => {
    describe('with toolbar', () => {
        let fixture: ComponentFixture<TestHostComponent>;
        let component: TestHostComponent;
        let globalActions: DynamicPageGlobalActionsComponent;

        beforeEach(waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [TestHostComponent]
            }).compileComponents();
        }));

        beforeEach(() => {
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
            const toolbar = globalActions._toolbarComponent();
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

        describe('_setSize', () => {
            it('should set forceOverflow and shouldOverflow to true when size is small', fakeAsync(() => {
                const toolbar = globalActions._toolbarComponent()!;
                const detectChangesSpy = jest.spyOn(toolbar, 'detectChanges');

                globalActions._setSize('small');

                expect(toolbar.forceOverflow).toBe(true);
                expect(toolbar.shouldOverflow).toBe(true);
                expect(detectChangesSpy).toHaveBeenCalled();
            }));

            it('should set forceOverflow and shouldOverflow to false when size is medium', fakeAsync(() => {
                const toolbar = globalActions._toolbarComponent()!;
                const detectChangesSpy = jest.spyOn(toolbar, 'detectChanges');

                globalActions._setSize('medium');

                expect(toolbar.forceOverflow).toBe(false);
                expect(toolbar.shouldOverflow).toBe(false);
                expect(detectChangesSpy).toHaveBeenCalled();
            }));

            it('should set forceOverflow and shouldOverflow to false when size is large', () => {
                const toolbar = globalActions._toolbarComponent()!;

                globalActions._setSize('large');

                expect(toolbar.forceOverflow).toBe(false);
                expect(toolbar.shouldOverflow).toBe(false);
            });

            it('should set forceOverflow and shouldOverflow to false when size is extra-large', () => {
                const toolbar = globalActions._toolbarComponent()!;

                globalActions._setSize('extra-large');

                expect(toolbar.forceOverflow).toBe(false);
                expect(toolbar.shouldOverflow).toBe(false);
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
            expect(globalActions._toolbarComponent()).toBeFalsy();
        });

        it('should not throw when _setSize is called without toolbar', () => {
            expect(() => {
                globalActions._setSize('small');
            }).not.toThrow();
        });
    });
});
