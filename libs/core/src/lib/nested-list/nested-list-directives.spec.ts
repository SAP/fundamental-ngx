import { Component, ViewChild } from '@angular/core';
import { NestedListExpandIconComponent, NestedListTitleDirective, NestedListIconDirective } from './nested-list-directives';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedItemService } from './nested-item/nested-item.service';

@Component({
    template: `
        <div fd-nested-list-title>Title</div>
        <button fd-nested-list-expand-icon></button>
        <span fd-nested-list-icon></span>
    `
})
class TestNestedContainerComponent {
    @ViewChild(NestedListTitleDirective)
    titleElement: NestedListTitleDirective;

    @ViewChild(NestedListExpandIconComponent)
    expandIconElement: NestedListExpandIconComponent;

    @ViewChild(NestedListIconDirective)
    iconElement: NestedListIconDirective;
}

describe('NestedListDirectives', () => {
    let component: TestNestedContainerComponent;
    let expandIconElement: NestedListExpandIconComponent;
    let iconElement: NestedListIconDirective;
    let titleElement: NestedListTitleDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                NestedListExpandIconComponent,
                NestedListIconDirective,
                NestedListTitleDirective,
                TestNestedContainerComponent
            ],
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
        const classList = (iconElement as any)._elementRef.nativeElement.classList;
        expect(classList).toContain('sap-icon--' + 'custom-icon');
    });
});
