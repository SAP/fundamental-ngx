import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NestedItemService } from './nested-item/nested-item.service';
import {
    NestedListIconComponent,
    NestedListTitleDirective,
    NestedListExpandIconComponent
} from './nested-list-directives';
import { CxNestedListModule } from './nested-list.module';

@Component({
    template: `
        <div fdx-nested-list-title>Title</div>
        <button fdx-nested-list-expand-icon></button>
        <span fdx-nested-list-icon></span>
    `
})
class TestNestedContainerComponent {
    @ViewChild(NestedListTitleDirective)
    titleElement: NestedListTitleDirective;

    @ViewChild(NestedListExpandIconComponent)
    expandIconElement: NestedListExpandIconComponent;

    @ViewChild(NestedListIconComponent)
    iconElement: NestedListIconComponent;
}

describe('NestedListDirectives', () => {
    let component: TestNestedContainerComponent;
    let expandIconElement: NestedListExpandIconComponent;
    let iconElement: NestedListIconComponent;
    let titleElement: NestedListTitleDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CxNestedListModule],
            declarations: [TestNestedContainerComponent],
            providers: [NestedItemService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expandIconElement = component.expandIconElement;
        iconElement = component.iconElement;
        titleElement = component.titleElement;
        fixture.detectChanges();
    });

    it('Expand Icon Element should have good classes and react on click', () => {
        expect(expandIconElement.expanded).toBeFalsy();

        spyOn((<any>expandIconElement)._itemService.toggle, 'next');

        expandIconElement.onClick(new MouseEvent('click'));

        fixture.detectChanges();

        expect((<any>expandIconElement)._itemService.toggle.next).toHaveBeenCalled();
        expect(expandIconElement.expanded).toBeTruthy();
    });

    it('Title should give valid title string', () => {
        expect(titleElement.getInnerText()).toBe('Title');
    });

    it('Icon should have valid class', () => {
        iconElement.glyph = 'custom-icon';
        iconElement.buildComponentCssClass();
        fixture.detectChanges();
        const classList = (iconElement as any).elementRef.nativeElement.classList;
        expect(classList).toContain('sap-icon--' + 'custom-icon');
    });
});
