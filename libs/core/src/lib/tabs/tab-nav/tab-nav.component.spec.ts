import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TabsModule } from '../tabs.module';
import { TabNavComponent } from './tab-nav.component';
import { TabLinkDirective } from '../tab-link/tab-link.directive';

@Component({
    selector: 'fd-test-tabs',
    template: `
        <nav fd-tab-nav>
            <div fd-tab-item>
                <a fd-tab-link [active]="true">
                    Link
                </a>
            </div>
            <div fd-tab-item>
                <a fd-tab-link #fdTabLink [active]="false">
                    Link
                </a>
            </div>
            <a fd-tab-link [active]="false">
                Link
            </a>
            <a fd-tab-link *ngIf="showLastTab" [active]="false">
                Link
            </a>
        </nav>
    `
})
class TestNavWrapperComponent {
    @ViewChild(TabNavComponent)
    tabNavDirective: TabNavComponent;

    @ViewChild('fdTabLink', { read: TabLinkDirective })
    tabLink: TabLinkDirective;

    showLastTab = true;
}

describe('TabNavDirective', () => {
    let component: TabNavComponent;
    let fixture: ComponentFixture<TestNavWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNavWrapperComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNavWrapperComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle ngAfterContentInit', () => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();
        expect(fixture.componentInstance.tabNavDirective.tabLinks.length).toBe(4);
    });

    it('should react on query list change', fakeAsync(() => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();

        spyOn(component as any, '_refreshSubscription').and.callThrough();

        fixture.componentInstance.showLastTab = false;

        tick(10);
        fixture.detectChanges();

        expect((component as any)._refreshSubscription).toHaveBeenCalled();
    }));

    it('should react on keydown', fakeAsync(() => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();

        spyOn(component, 'selectTab').and.callThrough();

        fixture.componentInstance.tabLink.keyDown.emit(<any>{ key: 'ArrowRight', preventDefault: () => {} });
        fixture.componentInstance.tabLink.keyDown.emit(<any>{ key: 'Enter', preventDefault: () => {} });

        tick(10);
        fixture.detectChanges();

        expect(component.selectTab).toHaveBeenCalledWith(3);
    }));

    it('should handle disabled state', fakeAsync(() => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();

        spyOn(component, 'selectTab').and.callThrough();

        fixture.componentInstance.tabLink.keyDown.emit(<any>{ key: 'ArrowRight', preventDefault: () => {} });
        fixture.componentInstance.tabLink.keyDown.emit(<any>{ key: 'Enter', preventDefault: () => {} });

        tick(10);
        fixture.detectChanges();

        expect(component.selectTab).toHaveBeenCalledWith(3);
    }));

    it('should call select tab on service event', fakeAsync(() => {
        component.ngAfterContentInit();
        component.selectTab(1);

        tick(10);
        fixture.detectChanges();
        spyOn(component as any, 'selectTab').and.callThrough();

        (component as any)._tabsService.tabSelected.next(2);

        tick(10);
        fixture.detectChanges();
        expect(component.selectTab).toHaveBeenCalledWith(2);
    }));
});
