import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TabsModule } from '../tabs.module';
import { TabNavComponent } from './tab-nav.component';


@Component({
    selector: 'fd-test-tabs',
    template: `
        <nav fd-tab-nav>
            <div fd-tab-item>
                <a fd-tab-link
                   [active]="true">
                    Link
                </a>
            </div>
            <div fd-tab-item>
                <a fd-tab-link
                   [active]="false">
                    Link
                </a>
            </div>
            <a fd-tab-link
               [active]="false">
                Link
            </a>
        </nav>
    `
})
class TestNavWrapperComponent {
    @ViewChild(TabNavComponent, { static: false })
    tabNavDirective: TabNavComponent;
}

describe('TabNavDirective', () => {
    let component: TabNavComponent;
    let fixture: ComponentFixture<TestNavWrapperComponent>;

    beforeEach(async(() => {
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
        expect(fixture.componentInstance.tabNavDirective.tabLinks.length).toBe(3);
    });
});
