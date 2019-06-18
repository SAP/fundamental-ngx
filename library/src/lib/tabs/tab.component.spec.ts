import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TabComponent } from './tab.component';
import { TabsModule } from './tabs.module';

@Component({
    selector: 'fd-test-tabs',
    template: `
        <fd-tab [(selectedIndex)]="index">
            <nav fd-tab-list>
                <div fd-tab-item id="tab1">
                    <a fd-tab-link>link1</a>
                    <ng-template fd-tab-content>
                        Content Link1
                    </ng-template>
                </div>
                <div fd-tab-item [active]="true" id="tab2">
                    <a fd-tab-link>link2</a>
                    <ng-template fd-tab-content>
                        Content Link2
                    </ng-template>
                </div>
                <div fd-tab-item [disabled]="true" id="tab3">
                    <a fd-tab-link>Disabled</a>
                    <ng-template fd-tab-content>
                        Disabled
                    </ng-template>
                </div>
            </nav>
        </fd-tab>
    `
})
class TestWrapperComponent {
    index = 0;
}

describe('TabListComponent', () => {
    let component: TabComponent;
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
});
