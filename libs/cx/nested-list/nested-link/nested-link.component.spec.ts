import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedItemService } from '../nested-item/nested-item.service';
import { NestedListStateService } from '../nested-list-state.service';
import { CxNestedListModule } from '../nested-list.module';
import { NestedLinkComponent } from './nested-link.component';

@Component({
    template: `
        <a fdx-nested-list-link #directiveElement>
            <span fdx-nested-list-icon [glyph]="'settings'"></span>
            <span fdx-nested-list-title>Link 1</span>
        </a>
    `
})
class TestNestedContainerComponent {
    @ViewChild('directiveElement', { static: true, read: NestedLinkComponent })
    directiveElement: NestedLinkComponent;
}

describe('NestedLinkDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: NestedLinkComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CxNestedListModule],
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
