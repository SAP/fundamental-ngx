import { Component, ViewChild } from '@angular/core';
import { NestedLinkDirective } from './nested-link.directive';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedListModule } from '../nested-list.module';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedItemService } from '../nested-item/nested-item.service';

@Component({
    template: `
        <a fd-nested-list-link #directiveElement>
            <span fd-nested-list-icon [glyph]="'settings'"></span>
            <span fd-nested-list-title>Link 1</span>
        </a>
    `
})
class TestNestedContainerComponent {
    @ViewChild('directiveElement', { static: true, read: NestedLinkDirective })
    directiveElement: NestedLinkDirective;
}

describe('NestedLinkDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: NestedLinkDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NestedListModule],
            declarations: [TestNestedContainerComponent],
            providers: [NestedListStateService, NestedItemService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });

    it('Should return good information', () => {
        expect(directiveElement.getTitle()).toBe('Link 1');
        expect(directiveElement.selected).toBeFalsy();
    });

    it('Should have good classes', () => {
        directiveElement.selected = true;
        fixture.detectChanges();

        const classList = (directiveElement as any)._elementRef.nativeElement.classList;

        expect(classList.contains('is-selected')).toBeTruthy();
    });
});
