import { NestedListContentDirective } from './nested-list-content.directive';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CxNestedListModule } from '../nested-list.module';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListExpandIconComponent } from '../nested-list-directives';
import { NestedItemService } from '../nested-item/nested-item.service';

@Component({
    template: `
        <div fdx-nested-list-content>
            <a fdx-nested-list-link>
                <span fdx-nested-list-icon [glyph]="'settings'"></span>
                <span fdx-nested-list-title>Link 1</span>
            </a>
            <a fdx-nested-list-expand-icon></a>
        </div>
    `
})
class TestNestedContainerComponent {
    @ViewChild(NestedListContentDirective)
    directiveElement: NestedListContentDirective;

    @ViewChild(NestedListExpandIconComponent)
    iconElement: NestedListExpandIconComponent;
}

describe('NestedContentDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: NestedListContentDirective;
    let iconElement: NestedListExpandIconComponent;
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
        iconElement = component.iconElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        const classList = (directiveElement as any)._elementRef.nativeElement.classList;
        expect(classList.contains('has-child')).toBeFalsy();
        expect(classList.contains('is-selected')).toBeFalsy();

        directiveElement.selected = true;

        fixture.detectChanges();

        expect(classList.contains('is-selected')).toBeTruthy();
    });

    it('Should propagate expanded state to icon', () => {
        expect(iconElement.expanded).toBeFalsy();
        iconElement.changeExpandedState(true);
        fixture.detectChanges();
        expect(iconElement.expanded).toBeTruthy();
    });
});
