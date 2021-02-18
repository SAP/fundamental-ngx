import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TabsModule } from '../tabs/tabs.module';
import {DynamicPageModule} from './dynamic-page.module';
import { DynamicPageComponent } from './dynamic-page.component';


@Component({
    template: `
        <fd-dynamic-page>
            <fd-dynamic-page-header></fd-dynamic-page-header>
            <fd-dynamic-page-subheader></fd-dynamic-page-subheader>
            <fd-tab-list *ngIf="tabs">
                <fd-tab>
                    <fd-dynamic-page-content></fd-dynamic-page-content>
                </fd-tab>
            </fd-tab-list>
            <fd-dynamic-page-content *ngIf="!tabs"></fd-dynamic-page-content>
        </fd-dynamic-page>`
})
class TestComponent {

    tabs = false;

    @ViewChild(DynamicPageComponent)
    dynamicPage: DynamicPageComponent
}
describe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DynamicPageModule, TabsModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should collapse on scroll content', fakeAsync (() => {
        const element = dynamicPageComponent._contentComponent.elementRef.nativeElement;
        element.scrollTop = 1000;
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed.value).toBeTrue();
    }));

    it('should not collapse on scroll content, when pinned', fakeAsync (() => {
        (<any>dynamicPageComponent)._dynamicPageService.pinned.next(true);
        const element = dynamicPageComponent._contentComponent.elementRef.nativeElement;
        element.scrollTop = 1000;
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed.value).toBeFalse();
    }));

    it('should collapse on scroll tabs', fakeAsync (() => {
        component.tabs = true;
        const element = dynamicPageComponent._tabComponent.contentContainer.nativeElement;
        element.scrollTop = 1000;
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed.value).toBeTrue();
    }));

    it('should not collapse on scroll content, when pinned', fakeAsync (() => {
        component.tabs = true;
        (<any>dynamicPageComponent)._dynamicPageService.pinned.next(true);
        const element = dynamicPageComponent._tabComponent.contentContainer.nativeElement;
        element.scrollTop = 1000;
        element.dispatchEvent(new Event('scroll'));
        tick(15);
        expect((<any>dynamicPageComponent)._dynamicPageService.collapsed.value).toBeFalse();
    }));

});
