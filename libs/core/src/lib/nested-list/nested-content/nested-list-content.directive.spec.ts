import { NestedListContentDirective } from './nested-list-content.directive';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedListModule } from '../nested-list.module';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListExpandIconDirective } from '../nested-list-directives';
import { NestedItemService } from '@fundamental-ngx/core';

@Component({
    template: `
        <div fd-nested-list-content #directiveElement>
            <a fd-nested-list-link>
                <span fd-nested-list-icon [glyph]="'settings'"></span>
                <span fd-nested-list-title>Link 1</span>
            </a>
            <a fd-nested-list-expand-icon #iconElement></a>
        </div>
    `
})
class TestNestedContainerComponent {
    @ViewChild('directiveElement', { static: true, read: NestedListContentDirective })
    directiveElement: NestedListContentDirective;

    @ViewChild('iconElement', { static: true, read: NestedListExpandIconDirective })
    iconElement: NestedListExpandIconDirective;
}

describe('NestedContentDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: NestedListContentDirective;
    let iconElement: NestedListExpandIconDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(async(() => {
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
        iconElement = component.iconElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        const classList = (directiveElement as any)._elementRef.nativeElement.classList;
        expect(classList.contains('has-child')).toBeFalsy();
        expect(classList.contains('is-selected')).toBeFalsy();

        fixture.detectChanges();

        directiveElement.selected = true;

        expect(classList.contains('is-selected')).toBeTruthy();
    });

    it('Should propagate expanded state to icon', () => {
        expect(iconElement.expanded).toBeFalsy();
        directiveElement.changeExpandedState(true);
        fixture.detectChanges();
        expect(iconElement.expanded).toBeTruthy();
    });
});
