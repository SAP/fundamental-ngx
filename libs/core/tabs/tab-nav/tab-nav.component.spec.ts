import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabsModule } from '../tabs.module';
import { TabNavComponent } from './tab-nav.component';

@Component({
    selector: 'fd-test-tabs',
    template: `
<nav fd-tab-nav [fdCompact]="compact">
  <div fd-tab-item>
    <a fd-tab-link [active]="true"> Link </a>
  </div>
  <div fd-tab-item>
    <a fd-tab-link #fdTabLink [active]="false"> Link </a>
  </div>
  <a fd-tab-link [active]="false"> Link </a>
  @if (showLastTab) {
    <a fd-tab-link [active]="false"> Link </a>
  }
</nav>
`
})
class TestNavWrapperComponent {
    @ViewChild(TabNavComponent)
    tabNavDirective: TabNavComponent;

    @ViewChild('fdTabLink', { read: TabLinkDirective })
    tabLink: TabLinkDirective;

    compact = false;
    showLastTab = true;
}

describe('TabNavDirective', () => {
    let component: TabNavComponent;
    let fixture: ComponentFixture<TestNavWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNavWrapperComponent],
            imports: [TabsModule, ContentDensityModule],
            providers: [RtlService]
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

    it('should consume content density', () => {
        fixture.componentInstance.compact = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-tabs.is-compact')).toBeTruthy();
        fixture.componentInstance.compact = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-tabs.is-compact')).toBeFalsy();
    });

    it('should handle ngAfterContentInit', () => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();
        expect(fixture.componentInstance.tabNavDirective.tabLinks.length).toBe(6);
    });

    it('should react on query list change', fakeAsync(() => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();

        jest.spyOn(component as any, '_refreshSubscription');

        fixture.componentInstance.showLastTab = false;

        tick(10);
        fixture.detectChanges();

        expect((component as any)._refreshSubscription).toHaveBeenCalled();
    }));

    it('should react on keydown', fakeAsync(() => {
        fixture.componentInstance.tabNavDirective.ngAfterContentInit();

        const link = component.links.get(2)!;

        const focusedSpy = jest.spyOn(link.focused, 'emit');

        component.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }));
        link.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));

        tick(10);
        fixture.detectChanges();

        expect(focusedSpy).toHaveBeenCalled();
    }));
});
