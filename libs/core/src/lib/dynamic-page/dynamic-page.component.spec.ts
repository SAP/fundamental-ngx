import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TabsModule } from '../tabs/tabs.module';
import {DynamicPageModule} from './dynamic-page.module';
import { DynamicPageComponent } from './dynamic-page.component';


@Component({
    template: `
        <fd-dynamic-page >
            <fd-dynamic-page-header>Test Test</fd-dynamic-page-header>
            <fd-dynamic-page-subheader></fd-dynamic-page-subheader>
            <fd-tab-list *ngIf="tabs" [stackContent]="true" maxContentHeight="auto">
                <fd-tab *ngFor="let tab of ['Tab 1', 'Tab 2', 'Tab 3']" [title]="tab">
                    <fd-dynamic-page-content>
                        <div style="height: 150vh"></div>
                    </fd-dynamic-page-content>
                </fd-tab>
            </fd-tab-list>
            <fd-dynamic-page-content *ngIf="!tabs">
                <div style="height: 150vh"></div>
            </fd-dynamic-page-content>
        </fd-dynamic-page>`
})
class TestComponent {

    tabs = false;

    @ViewChild(DynamicPageComponent)
    dynamicPage: DynamicPageComponent;
}
xdescribe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DynamicPageModule, TabsModule],
            declarations: [TestComponent]
        }).overrideComponent(DynamicPageComponent, {
            set: {changeDetection: ChangeDetectionStrategy.Default}
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        fixture.detectChanges()
        expect(fixture).toBeTruthy();
    });

    it('should collapse on scroll content', fakeAsync (() => {
        fixture.detectChanges()
        const element = dynamicPageComponent._contentComponent.elementRef.nativeElement;
        element.scrollTop = 1000;
        fixture.detectChanges()
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed.value).toBeTrue();
    }));

    it('should not collapse on scroll content, when pinned', fakeAsync (() => {
        fixture.detectChanges();
        (<any>dynamicPageComponent)._dynamicPageService.pinned.next(true);
        const element = dynamicPageComponent._contentComponent.elementRef.nativeElement;
        element.scrollTop = 1000;
        fixture.detectChanges()
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed.value).toBeFalse();
    }));

    it('should handle collapse', () => {
        const spy = spyOn(<any>dynamicPageComponent, '_setContainerPositions');

        (<any>dynamicPageComponent)._dynamicPageService.subheaderVisibilityChange.next();

        expect(spy).toHaveBeenCalled();
    })

    it('should propagate sizes', () => {
        const propagateSizeSpy = spyOn(<any>dynamicPageComponent, '_propagateSizeToChildren');
        dynamicPageComponent.size = 'small';
        expect(propagateSizeSpy).toHaveBeenCalled();
    });

    it('should apply valid height on content', () => {
        const size = '150px';
        fixture.detectChanges();
        (<any>dynamicPageComponent)._getCalculatedFullHeight = (_element: HTMLElement): string => size;
        (<any>dynamicPageComponent)._setContainerPositions();
        fixture.detectChanges();

        const element = dynamicPageComponent._contentComponent.elementRef.nativeElement;
        const styles = window.getComputedStyle(element);
        expect(styles.height).toBe(size);
    });

    it('should apply valid height on tabs', () => {
        component.tabs = true;
        fixture.detectChanges();
        const size = '150px';
        (<any>dynamicPageComponent)._getCalculatedFullHeight = (_element: HTMLElement): string => size;
        (<any>dynamicPageComponent)._setTabsPosition();
        fixture.detectChanges();

        const element = dynamicPageComponent._tabComponent.contentContainer.nativeElement
        const styles = window.getComputedStyle(element);
        expect(styles.height).toBe(size);
    });

});
