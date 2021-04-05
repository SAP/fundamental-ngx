import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CSS_CLASS_NAME } from '../constants';
import { LayoutGridComponent } from '../layout-grid.component';
import { LayoutGridColDirective } from './layout-grid-col.directive';

const COL_SIZE = 12;
const MD_COL_SIZE = 6;
const LG_COL_SIZE = 4;
const XL_COL_SIZE = 3;

@Component({
    template: `
        <fd-layout-grid>
            <div [fdLayoutGridCol]="COL_SIZE" [colMd]="MD_COL_SIZE" [colLg]="LG_COL_SIZE" [colXl]="XL_COL_SIZE"></div>
        </fd-layout-grid>
    `
})
class TestNestedContainerComponent {
    @ViewChild(LayoutGridColDirective, {static: true})
    directiveElement: LayoutGridColDirective;

    COL_SIZE = COL_SIZE;
    MD_COL_SIZE = MD_COL_SIZE;
    LG_COL_SIZE = LG_COL_SIZE;
    XL_COL_SIZE = XL_COL_SIZE;
}

describe('LayoutGridColDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: LayoutGridColDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestNestedContainerComponent, LayoutGridColDirective, LayoutGridComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });

    it('Should proper css classes', () => {
        fixture.detectChanges();

        expect(directiveElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.col)).toBeTruthy();
        expect(directiveElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.colSizePrefix + COL_SIZE)).toBeTruthy();
        expect(directiveElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.mdColSizePrefix + MD_COL_SIZE)).toBeTruthy();
        expect(directiveElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.lgColSizePrefix + LG_COL_SIZE)).toBeTruthy();
        expect(directiveElement.elementRef().nativeElement.classList.contains(CSS_CLASS_NAME.xlColSizePrefix + XL_COL_SIZE)).toBeTruthy();
    });
});
