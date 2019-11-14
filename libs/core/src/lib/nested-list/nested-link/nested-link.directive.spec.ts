import { Component, ViewChild } from '@angular/core';
import { NestedLinkDirective } from './nested-link.directive';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NestedListModule } from '../nested-list.module';
import { NestedListStateService } from '../nested-list-state.service';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NestedListModule],
            declarations: [TestNestedContainerComponent],
            providers: [ NestedListStateService ]
        })
            .compileComponents();
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
        expect(directiveElement.hasChildren).toBeFalsy()
    });

    it('Should have good classes', () => {
        directiveElement.selected = true;
        directiveElement.hasChildren = true;
        directiveElement.expanded = true;
        fixture.detectChanges();

        expect((directiveElement as any).elementRef.nativeElement.classList.contains('is-expanded')).toBeTruthy();
        expect((directiveElement as any).elementRef.nativeElement.classList.contains('is-selected')).toBeTruthy();
        expect((directiveElement as any).elementRef.nativeElement.classList.contains('has-child')).toBeTruthy();

    });

})
