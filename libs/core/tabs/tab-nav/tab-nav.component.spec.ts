import { Component, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { TabLinkDirective } from '../tab-link/tab-link.directive';
import { TabsModule } from '../tabs.module';
import { TabNavComponent } from './tab-nav.component';

@Component({
    selector: 'fd-test-tabs',
    template: `
        <nav fd-tab-nav [fdCompact]="compact()">
            <div fd-tab-item>
                <a fd-tab-link [active]="true"> Link </a>
            </div>
            <div fd-tab-item>
                <a fd-tab-link #fdTabLink [active]="false"> Link </a>
            </div>
            <a fd-tab-link [active]="false"> Link </a>
            @if (showLastTab()) {
                <a fd-tab-link [active]="false"> Link </a>
            }
        </nav>
    `,
    standalone: true,
    imports: [TabsModule, ContentDensityModule]
})
class TestNavWrapperComponent {
    @ViewChild(TabNavComponent)
    tabNavDirective: TabNavComponent;

    @ViewChild('fdTabLink', { read: TabLinkDirective })
    tabLink: TabLinkDirective;

    readonly compact = input(false);
    readonly showLastTab = input(true);
}

describe('TabNavDirective', () => {
    let component: TabNavComponent;
    let fixture: ComponentFixture<TestNavWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestNavWrapperComponent],
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
        fixture.componentRef.setInput('compact', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-tabs.is-compact')).toBeTruthy();
        fixture.componentRef.setInput('compact', false);
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

        fixture.componentRef.setInput('showLastTab', false);

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
