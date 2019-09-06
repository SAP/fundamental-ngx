import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component } from '@angular/core';

import { TabListComponent } from './tab-list.component';
import { TabsModule } from './tabs.module';

@Component({
    selector: 'fd-test-tabs',
    template: `<fd-tab-list>
    <fd-tab [title]="'Link'" id="tab1">
      Content Link
    </fd-tab>
    <fd-tab [title]="'Selected'" [disabled]="false" id="tab2">
      Content Selected
    </fd-tab>
    <fd-tab [title]="'Link'" [disabled]="false" id="tab3">
      Content Link Two
    </fd-tab>
    <fd-tab [title]="'Disabled'" [disabled]="true" id="tab4">
      Disabled
    </fd-tab>
  </fd-tab-list>`
})
class TestWrapperComponent {}

describe('TabListComponent', () => {
    let component: TabListComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle ngAfterContentInit', () => {
        component.ngAfterContentInit();
        expect(component.selectedIndex).toBe(0);
        expect(component.tabLinks.length).toBe(4);
    });

    it('should handle tab select', () => {
        component.ngAfterContentInit();
        component.selectedIndexChange.subscribe(id => expect(id).toBe(1));
        component.selectTab(1);
    });

    it('should not select disabled tabs', () => {
        component.ngAfterContentInit();
        component.selectedIndexChange.subscribe(id => expect(id).toBe(0));
        component.selectTab(3);
    });
});
