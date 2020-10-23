import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutGridComponent } from './layout-grid.component';
import { CSS_CLASS_NAME } from './constants';

@Component({
    template: '<fd-layout-grid [noGap]="true"></fd-layout-grid>'
})
class TestNestedContainerComponent {
    @ViewChild(LayoutGridComponent, {static: true})
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

    it('Should proper css classes', () => {
        fixture.detectChanges();

        expect(componentElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.layoutGrid)).toBeTruthy();
        expect(componentElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.layoutGridNoGap)).toBeTruthy();
    });
});
