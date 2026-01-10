import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TabsModule } from '@fundamental-ngx/core/tabs';
import { DynamicPageComponent } from './dynamic-page.component';
import { DynamicPageModule } from './dynamic-page.module';

@Component({
    template: `<fd-dynamic-page>
        <fd-dynamic-page-header>Test Test</fd-dynamic-page-header>
        <fd-dynamic-page-subheader></fd-dynamic-page-subheader>
        @if (tabs) {
            <fd-tab-list [stackContent]="true" maxContentHeight="auto">
                @for (tab of ['Tab 1', 'Tab 2', 'Tab 3']; track tab) {
                    <fd-tab [title]="tab">
                        <fd-dynamic-page-content>
                            <div [style.height.vh]="150"></div>
                        </fd-dynamic-page-content>
                    </fd-tab>
                }
            </fd-tab-list>
        }
        @if (!tabs) {
            <fd-dynamic-page-content>
                <div [style.height.vh]="150"></div>
            </fd-dynamic-page-content>
        }
    </fd-dynamic-page>`,
    standalone: true,
    imports: [DynamicPageModule, TabsModule]
})
class TestComponent {
    @ViewChild(DynamicPageComponent)
    dynamicPage: DynamicPageComponent;

    tabs = false;
}
describe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        })
            .overrideComponent(DynamicPageComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(fixture).toBeTruthy();
    });

    it('should collapse on scroll content', fakeAsync(() => {
        fixture.detectChanges();
        const element = dynamicPageComponent._getScrollElement();
        if (!element) {
            return;
        }
        element.scrollTop = 1000;
        fixture.detectChanges();
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed()).toBe(true);
    }));

    it('should not collapse on scroll content, when pinned', fakeAsync(() => {
        fixture.detectChanges();
        (<any>dynamicPageComponent)._dynamicPageService.pinned.set(true);
        const element = dynamicPageComponent._contentComponent.first.elementRef.nativeElement;
        element.scrollTop = 1000;
        fixture.detectChanges();
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed()).toBe(false);
    }));

    it('should handle collapse', () => {
        const spy = jest.spyOn(<any>dynamicPageComponent, '_setContainerPositions');

        (<any>dynamicPageComponent)._dynamicPageService.subheaderVisibilityChange.next();

        expect(spy).toHaveBeenCalled();
    });

    it('should propagate sizes', () => {
        const propagateSizeSpy = jest.spyOn(<any>dynamicPageComponent, '_propagateSizeToChildren');
        dynamicPageComponent.size = 'small';
        expect(propagateSizeSpy).toHaveBeenCalled();
    });
});
