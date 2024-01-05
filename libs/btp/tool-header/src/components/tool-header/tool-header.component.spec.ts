import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolHeaderComponent } from './tool-header.component';
import { FdbToolHeaderState } from "../../tool-header-state.type";
import { Component } from "@angular/core";
import { SearchFieldComponent } from "@fundamental-ngx/btp/search-field";

@Component({
    template: ``,
    providers: [
        {
            provide: SearchFieldComponent,
            useExisting: MockSearchFieldComponent
        }
    ],
    standalone: true
})
class MockSearchFieldComponent {
    focus(): void {}
}

describe('ToolHeaderComponent', () => {
    let component: ToolHeaderComponent;
    let searchFieldComponent: MockSearchFieldComponent;
    let fixture: ComponentFixture<ToolHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ToolHeaderComponent, MockSearchFieldComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolHeaderComponent);
        component = fixture.componentInstance;
        searchFieldComponent = TestBed.createComponent(MockSearchFieldComponent).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set mode correctly', () => {
        fixture.componentRef.setInput('mode', 'phone');
        expect(component.mode$()).toEqual('phone');
        fixture.componentRef.setInput('mode', 'tablet');
        expect(component.mode$()).toEqual('tablet');
    });

    it('should set orientation correctly', () => {
        fixture.componentRef.setInput('orientation', 'landscape');
        expect(component.orientation$()).toEqual('landscape');
        fixture.componentRef.setInput('orientation', 'portrait');
        expect(component.orientation$()).toEqual('portrait');
    });

    it('should return correct state for phone mode with search field expanded', () => {
        fixture.componentRef.setInput('mode', 'phone');
        fixture.componentInstance.expandSearchField();
        const state = fdbToolHeaderState(component);
        expect(state.backButtonVisible).toBe(true);
        expect(state.menuButtonVisible).toBe(false);
        expect(state.logoVisible).toBe(false);
        expect(state.productNameVisible).toBe(false);
        expect(state.secondTitleVisible).toBe(false);
        expect(state.searchFieldVisible).toBe(true);
        expect(state.searchFieldToggleActionVisible).toBe(false);
        expect(state.providedActionsVisible).toBe(false);
        expect(state.userAvatarVisible).toBe(false);
        expect(state.productSwitchVisible).toBe(false);
        expect(state.voiceInputVisible).toBe(true);
        expect(state.separatorsBetweenActionsVisible).toBe(false);
    });

    it('should return correct state for phone mode with search field collapsed', () => {
        fixture.componentRef.setInput('mode', 'phone');
        document.dispatchEvent(new Event('click'));
        const state = fdbToolHeaderState(component);
        expect(state.backButtonVisible).toBe(false);
        expect(state.menuButtonVisible).toBe(true);
        expect(state.logoVisible).toBe(true);
        expect(state.productNameVisible).toBe(false);
        expect(state.secondTitleVisible).toBe(false);
        expect(state.searchFieldVisible).toBe(false);
        expect(state.searchFieldToggleActionVisible).toBe(false);
        expect(state.providedActionsVisible).toBe(true);
        expect(state.userAvatarVisible).toBe(true);
        expect(state.productSwitchVisible).toBe(true);
        expect(state.voiceInputVisible).toBe(false);
        expect(state.separatorsBetweenActionsVisible).toBe(false);
    });

    it('should return correct state for tablet mode in portrait orientation with search field expanded', () => {
        fixture.componentRef.setInput('mode', 'tablet');
        fixture.componentRef.setInput('orientation', 'portrait');
        fixture.componentInstance.expandSearchField();
        const state = fdbToolHeaderState(component);
        expect(state.backButtonVisible).toBe(false);
        expect(state.menuButtonVisible).toBe(true);
        expect(state.logoVisible).toBe(true);
        expect(state.productNameVisible).toBe(false);
        expect(state.secondTitleVisible).toBe(false);
        expect(state.searchFieldVisible).toBe(true);
        expect(state.searchFieldToggleActionVisible).toBe(false);
        expect(state.providedActionsVisible).toBe(true);
        expect(state.userAvatarVisible).toBe(true);
        expect(state.productSwitchVisible).toBe(true);
        expect(state.voiceInputVisible).toBe(false);
        expect(state.separatorsBetweenActionsVisible).toBe(false);
    });

    it('should return correct state for tablet mode in landscape orientation with search field collapsed', () => {
        fixture.componentRef.setInput('mode', 'tablet');
        fixture.componentRef.setInput('orientation', 'landscape');
        document.dispatchEvent(new Event('click'));
        const state = fdbToolHeaderState(component);
        expect(state.backButtonVisible).toBe(false);
        expect(state.menuButtonVisible).toBe(true);
        expect(state.logoVisible).toBe(true);
        expect(state.productNameVisible).toBe(true);
        expect(state.secondTitleVisible).toBe(false);
        expect(state.searchFieldVisible).toBe(true);
        expect(state.searchFieldToggleActionVisible).toBe(false);
        expect(state.providedActionsVisible).toBe(true);
        expect(state.userAvatarVisible).toBe(true);
        expect(state.productSwitchVisible).toBe(true);
        expect(state.voiceInputVisible).toBe(false);
        expect(state.separatorsBetweenActionsVisible).toBe(true);
    });

    it('should return default state for other modes', () => {
        fixture.componentRef.setInput('mode', '');
        const state = fdbToolHeaderState(component);
        expect(state.backButtonVisible).toBe(false);
        expect(state.menuButtonVisible).toBe(true);
        expect(state.logoVisible).toBe(true);
        expect(state.productNameVisible).toBe(true);
        expect(state.secondTitleVisible).toBe(true);
        expect(state.searchFieldVisible).toBe(true);
        expect(state.searchFieldToggleActionVisible).toBe(false);
        expect(state.providedActionsVisible).toBe(true);
        expect(state.userAvatarVisible).toBe(true);
        expect(state.productSwitchVisible).toBe(true);
        expect(state.voiceInputVisible).toBe(false);
        expect(state.separatorsBetweenActionsVisible).toBe(true);
    });

    it('should expand search field when Ctrl + K or Cmd + K is pressed', async () => {
        component._searchField = searchFieldComponent as any;
        fixture.componentRef.setInput('mode', 'tablet');
        fixture.componentRef.setInput('orientation', 'portrait');
        const searchFieldComponentFocusSpy = jest.spyOn(searchFieldComponent, 'focus');
        await fixture.whenRenderingDone();
        const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
        document.dispatchEvent(event);
        expect(fixture.componentInstance.searchFieldExpanded$()).toBe(true);
        expect(searchFieldComponentFocusSpy).toHaveBeenCalled();
    });

});

function fdbToolHeaderState(component: any): FdbToolHeaderState {
    return component.fdbToolHeaderState() as FdbToolHeaderState;
}
