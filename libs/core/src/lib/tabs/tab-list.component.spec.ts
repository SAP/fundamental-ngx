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
    <fd-tab [title]="'Selected'" id="tab2">
      Content Selected
    </fd-tab>
    <fd-tab [title]="'Link'" id="tab3">
      Content Link Two
    </fd-tab>
    <fd-tab [title]="'Disabled'" id="tab4" *ngIf="showDisabled">
      Disabled
    </fd-tab>
  </fd-tab-list>`
})
class TestWrapperComponent {
    showDisabled: boolean = true;
}

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
        component.ngAfterViewInit();
        expect(component.selectedIndex).toBe(0);
        expect(component.tabLinks.length).toBe(4);
    });

    it('should select tab', fakeAsync(() => {
        component.ngAfterViewInit();
        component.selectTab(3);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(3);
    }));

    it('should call reset tab', fakeAsync(() => {
        spyOn((component as any), '_resetTabHook').and.callThrough();
        component.ngAfterViewInit();
        component.selectTab(3);

        tick(10);
        fixture.detectChanges();

        fixture.componentInstance.showDisabled = false;
        fixture.detectChanges();
        tick(10);
        fixture.detectChanges();
        expect((component as any)._resetTabHook).toHaveBeenCalled();

    }));

    it('should not call reset tab', fakeAsync(() => {
        spyOn((component as any), '_resetTabHook').and.callThrough();
        component.ngAfterViewInit();
        component.selectTab(2);

        tick(10);
        fixture.detectChanges();

        fixture.componentInstance.showDisabled = false;
        fixture.detectChanges();
        tick(10);
        fixture.detectChanges();
        expect((component as any)._resetTabHook).not.toHaveBeenCalled();

    }));

    it('should not select out of range tab', fakeAsync(() => {
        component.ngAfterViewInit();
        component.selectTab(1);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(1);

        component.selectTab(7);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(1);
    }));

    it('should call select tab on service event', fakeAsync(() => {
        component.ngAfterViewInit();
        component.selectTab(1);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(1);

        spyOn((component as any), 'selectTab').and.callThrough();

        (component as any)._tabsService.tabSelected.next(2);

        tick(10);
        fixture.detectChanges();
        expect(component.selectTab).toHaveBeenCalledWith(2);
        expect(component.selectedIndex).toBe(2);
    }));
});
