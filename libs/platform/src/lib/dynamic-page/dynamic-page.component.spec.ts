import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageComponent } from './dynamic-page.component';
import { DynamicPageService } from './dynamic-page.service';
import { PlatformDynamicPageModule } from './dynamic-page.module';
import { CLASS_NAME } from './constants';

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <fdp-dynamic-page-title>
                <fdp-dynamic-page-global-actions>
                    <fd-toolbar fdType="transparent" [clearBorder]="true">
                        <button
                            fd-toolbar-item
                            fd-button
                            [compact]="true"
                            fdType="positive"
                            (click)="$event.stopPropagation()"
                        >
                            Accept
                        </button>
                    </fd-toolbar>
                </fdp-dynamic-page-global-actions>
                <fdp-dynamic-page-layout-actions>
                    <!-- layout actions -->
                    <fd-toolbar fdType="transparent" [clearBorder]="true">
                        <button fd-button fdType="transparent" aria-label="Resize">
                            <i class="sap-icon--resize"></i>
                        </button>
                    </fd-toolbar>
                </fdp-dynamic-page-layout-actions>
            </fdp-dynamic-page-title>
            <fdp-dynamic-page-header></fdp-dynamic-page-header>
            <fdp-dynamic-page-content>DynamicPage Content Text</fdp-dynamic-page-content>
        </fdp-dynamic-page>
    `
})
class TestComponent {
    size = 'medium';
    background = '';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
    @ViewChild(DynamicPageTitleComponent) dynamicPageTitleComponent: DynamicPageTitleComponent;
    @ViewChild(DynamicPageHeaderComponent) dynamicPageHeaderComponent: DynamicPageHeaderComponent;
    @ViewChild(DynamicPageContentComponent) dynamicPageContentComponent: DynamicPageContentComponent;
}
describe('DynamicPageComponent default values', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let dynamicPageComponent: DynamicPageComponent;
    let dynamicPageServiceSpy: jasmine.SpyObj<DynamicPageService>;

    beforeEach(
        waitForAsync(() => {
            dynamicPageServiceSpy = jasmine.createSpyObj('DynamicPageService', ['expandHeader', 'collapseHeader']);

            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, ToolbarModule, ButtonModule],
                declarations: [TestComponent],
                providers: [{ provide: DynamicPageService, useValue: dynamicPageServiceSpy }]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to host', async () => {
        fixture.detectChanges();
        const headerElement = fixture.debugElement.query(By.css('.' + CLASS_NAME.dynamicPage));
        expect(headerElement).toBeTruthy();
    });

    describe('children options inheritance', () => {
        it('should inherit size', async () => {
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.size).toBe('medium');
            component.dynamicPage.size = 'large';
            component.dynamicPage.ngAfterContentInit();
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.size).toBe('large');
            component.dynamicPage.size = 'small';
            component.dynamicPage.ngAfterContentInit();
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.size).toBe('small');
        });

        it('should inherit background styles', async () => {
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.background).toBe('');
            component.dynamicPage.background = 'solid';
            component.dynamicPage.ngAfterContentInit();
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.background).toBe('solid');
            component.dynamicPage.background = 'transparent';
            component.dynamicPage.ngAfterContentInit();
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.background).toBe('transparent');
            component.dynamicPage.background = 'list';
            component.dynamicPage.ngAfterContentInit();
            fixture.detectChanges();
            expect(component.dynamicPageTitleComponent.background).toBe('list');
        });
    });

    // TODO: Unskip after fix
    xit('should render content in view', () => {
        fixture.detectChanges();

        expect(component.dynamicPageContentComponent.getElementRef().nativeElement.innerText).toBe(
            'DynamicPage Content Text'
        );
    });

    it('should collapse header on click of title', async () => {
        dynamicPageComponent.toggleCollapse();
        component.dynamicPage.ngAfterViewInit();
        fixture.detectChanges();
        const contentEl: HTMLElement = fixture.debugElement.query(
            By.css('.fd-dynamic-page__collapsible-header')
        ).nativeElement;
        expect(contentEl.getAttribute('aria-hidden')).toBeTruthy();
    });

    it('should collapse header on scroll', fakeAsync(() => {
        component.dynamicPage.ngAfterViewInit();
        const throttleTime = 100;
        const contentEl = fixture.debugElement.query(By.css('fdp-dynamic-page-content-host'));

        spyOn(component.dynamicPageHeaderComponent.collapseChange, 'emit');

        contentEl.nativeElement.dispatchEvent(new Event('scroll'));

        fixture.detectChanges();
        tick(throttleTime);

        fixture.whenStable().then(() => {
            expect(component.dynamicPageHeaderComponent.collapseChange.emit).toHaveBeenCalled();
        });
    }));
});

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <fdp-dynamic-page-title></fdp-dynamic-page-title>
            <fdp-dynamic-page-header></fdp-dynamic-page-header>
            <fdp-dynamic-page-content id="tab1" [tabLabel]="tabLabel1"
                >DynamicPage Content Tabbed 1 Text</fdp-dynamic-page-content
            >
            <fdp-dynamic-page-content id="tab2" [tabLabel]="tabLabel2"
                >DynamicPage Content Tabbed 2 Text</fdp-dynamic-page-content
            >
        </fdp-dynamic-page>
    `
})
class TestTabbedComponent {
    size = 'medium';
    background = '';
    tabLabel1 = 'Tab 1';
    tabLabel2 = 'Tab 2';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent tabbed values', () => {
    let component: TestTabbedComponent;
    let fixture: ComponentFixture<TestTabbedComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, TabsModule],
                declarations: [TestTabbedComponent],
                providers: [{ provide: DynamicPageService }]
            }).compileComponents();
        })
    );
    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabbedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should add correct classes to tab content', async () => {
        fixture.detectChanges();
        const tabsContainer = fixture.debugElement.query(By.css('.fd-tabs'));
        expect(tabsContainer).toBeTruthy();
        expect(tabsContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageTabs)).toBeTruthy();
        expect(tabsContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageTabsAddShadow)).toBeTruthy();
    });

    it('should set default tab size', async () => {
        const tabsContainer = fixture.debugElement.query(By.css('.fd-tabs'));
        expect(tabsContainer.nativeElement.classList.contains(CLASS_NAME.dynamicPageTabsMedium)).toBeTruthy();
    });

    it('should switch tabs', async () => {
        dynamicPageComponent.setSelectedTab('tab2');
        fixture.detectChanges();
        const tab2: HTMLElement = fixture.debugElement.query(By.css('#tab2')).nativeElement;
        expect(tab2.getAttribute('aria-expanded')).toBe('true');
    });
});

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <fdp-dynamic-page-title></fdp-dynamic-page-title>
            <fdp-dynamic-page-header [collapsible]="false" [pinnable]="false"></fdp-dynamic-page-header>
            <fdp-dynamic-page-content>DynamicPage Content</fdp-dynamic-page-content>
        </fdp-dynamic-page>
    `
})
class TestNonCollapsibleComponent {
    size = 'medium';
    background = '';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent with collapsible set to false', () => {
    let component: TestNonCollapsibleComponent;
    let fixture: ComponentFixture<TestNonCollapsibleComponent>;
    let dynamicPage: DynamicPageComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, TabsModule],
                declarations: [TestNonCollapsibleComponent],
                providers: [{ provide: DynamicPageService }]
            }).compileComponents();
        })
    );
    beforeEach(() => {
        fixture = TestBed.createComponent(TestNonCollapsibleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPage = component.dynamicPage;
    });

    it('should not show the collapse button', () => {
        const collapseButton = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__collapse-button'));
        expect(collapseButton.length).toBe(0);
    });

    it('should not show the pin button', () => {
        const collapseButton = fixture.debugElement.queryAll(By.css('.fd-dynamic-page__pin-button'));
        expect(collapseButton.length).toBe(0);
    });

    it('should not collapse the header on click of title area', () => {
        const dynamicPageTitle = fixture.debugElement.query(By.css('.fd-dynamic-page__title-container'));
        dynamicPageTitle.nativeElement.click();
        fixture.detectChanges();

        const contentEl: HTMLElement = fixture.debugElement.query(
            By.css('.fd-dynamic-page__collapsible-header')
        ).nativeElement;
        expect(contentEl.getAttribute('aria-hidden')).not.toBe('true');
    });
});

@Component({
    template: `
        <fdp-dynamic-page [size]="size" [background]="background">
            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-title>
                    <fdp-dynamic-page-global-actions>
                        <fd-toolbar fdType="transparent" [clearBorder]="true">
                            <button
                                fd-toolbar-item
                                fd-button
                                [compact]="true"
                                fdType="positive"
                                (click)="$event.stopPropagation()"
                                id="global-action-button"
                            >
                                Accept
                            </button>
                        </fd-toolbar>
                    </fdp-dynamic-page-global-actions>
                    <fdp-dynamic-page-layout-actions>
                        <!-- layout actions -->
                        <fd-toolbar fdType="transparent" [clearBorder]="true">
                            <button fd-button fdType="transparent" aria-label="Resize" id="layout-action-button">
                                <i class="sap-icon--resize"></i>
                            </button>
                        </fd-toolbar>
                    </fdp-dynamic-page-layout-actions>
                </fdp-dynamic-page-title>
            </ng-container>
            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-header>
                    <div id="test-header">Header</div>
                </fdp-dynamic-page-header>
            </ng-container>
            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-content>
                    <div id="test-content">DynamicPage Content Text</div>
                </fdp-dynamic-page-content>
            </ng-container>

            <!-- Wrapper -->
            <ng-container>
                <fdp-dynamic-page-footer>
                    <div id="test-footer">DynamicPage Footer</div>
                </fdp-dynamic-page-footer>
            </ng-container>
        </fdp-dynamic-page>
    `
})
class HostTestComponent {
    size = 'medium';
    background = 'solid';
    @ViewChild(DynamicPageComponent) dynamicPage: DynamicPageComponent;
}
describe('DynamicPageComponent Content Projection', () => {
    let component: HostTestComponent;
    let fixture: ComponentFixture<HostTestComponent>;
    let dynamicPageComponent: DynamicPageComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformDynamicPageModule, ToolbarModule, ButtonModule],
                declarations: [HostTestComponent],
                providers: [DynamicPageService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(HostTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dynamicPageComponent = component.dynamicPage;
    });

    it('should create', () => {
        expect(fixture).toBeTruthy();
    });

    it('should project title with toolbars content', () => {
        expect(fixture.debugElement.query(By.css('#global-action-button'))).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#layout-action-button'))).toBeTruthy();
    });

    it('should project header content', () => {
        expect(fixture.debugElement.query(By.css('#test-header'))).toBeTruthy();
    });

    it('should project main content', () => {
        expect(fixture.debugElement.query(By.css('#test-content'))).toBeTruthy();
    });

    it('should project footer content', () => {
        expect(fixture.debugElement.query(By.css('#test-footer'))).toBeTruthy();
    });
});
