import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutGridComponent } from './layout-grid.component';

@Component({
    template: `
        <fd-layout-grid [noGap]="true">
            <div fdLayoutGridRow>
                <div fdLayoutGridCol="12" fdLayoutGridColMd="6" fdLayoutGridColLg="4" fdLayoutGridColXl="3">
                    <example-layout-grid-block>Size: 3</example-layout-grid-block>
                </div>
            </div>
        </fd-layout-grid>
    `
})
class TestNestedContainerComponent {
    @ViewChild('componentElement', { static: true, read: LayoutGridComponent })
    componentElement: LayoutGridComponent;
}

describe('LayoutGridComponent', () => {
    let component: TestNestedContainerComponent;
    let componentElement: LayoutGridComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedContainerComponent, LayoutGridComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        componentElement = component.componentElement;
        fixture.detectChanges();
    });

    xit('Should have good classes', () => {
        fixture.detectChanges();

        expect(
            (componentElement as any)._elementRef.nativeElement.classList.contains('fd-container--no-gap')
        ).toBeTruthy();
        expect((componentElement as any)._elementRef.nativeElement.classList.contains('fd-container')).toBeTruthy();
    });
});
