import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TabsModule } from '../tabs.module';
import { TabItemDirective } from './tab-item.directive';

@Component({
    selector: 'fd-test-tabs',
    template: `
        <div fd-tab-item #tabItem>
            <a fd-tab-link>link1</a>
            <ng-template fd-tab-content>
                Content Link1
            </ng-template>
        </div>
    `
})
class TestWrapperComponent {
    @ViewChild('tabItem')
    ref: ElementRef;
}

describe('TabItemComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Assign Class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-tabs__item');
    });
});
