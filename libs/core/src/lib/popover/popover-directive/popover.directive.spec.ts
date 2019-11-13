import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverDirective } from './popover.directive';
import { Component, NgModule, ViewChild } from '@angular/core';
import { PopoverModule } from '../popover.module';

@Component({
    template: `
        <button fd-button [fdPopover]="template" [(isOpen)]="isOpen"></button>
        <ng-template #template><div>Content Div</div></ng-template>
    `
})
class TestTemplateComponent {
    @ViewChild(PopoverDirective, { static: true })
    popoverDirective: PopoverDirective;

    isOpen = false;
}

@Component({
    template: `
        <button fd-button fdPopover="content" [(isOpen)]="isOpen"></button>
    `
})
class TestStringComponent {
    @ViewChild(PopoverDirective, { static: true })
    popoverDirective: PopoverDirective;

    isOpen = false;
}

@NgModule({
    declarations: [TestStringComponent, TestTemplateComponent],
    imports: [PopoverModule]
}) class TestModule {}

describe('PopoverDirective', () => {
    let fixtureTemplate: ComponentFixture<TestTemplateComponent>;
    let fixtureString: ComponentFixture<TestStringComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestModule]
        }).compileComponents();

        fixtureTemplate = TestBed.createComponent(TestTemplateComponent);
        fixtureString = TestBed.createComponent(TestStringComponent);
        fixtureTemplate.detectChanges();
        fixtureString.detectChanges();
    });

    it('should create', () => {
        expect(fixtureTemplate).toBeTruthy();
        expect(fixtureString).toBeTruthy();
    });

    it('should open', () => {
        fixtureTemplate.componentInstance.popoverDirective.open();
        expect(fixtureTemplate.componentInstance.popoverDirective.isOpen).toBe(true);
    });

    it('should close', () => {
        fixtureTemplate.componentInstance.isOpen = true;
        fixtureTemplate.componentInstance.popoverDirective.close();
        expect(fixtureTemplate.componentInstance.popoverDirective.isOpen).toBe(false);
    });

    it('should disable', () => {
        fixtureString.componentInstance.popoverDirective.disabled = true;
        fixtureString.componentInstance.popoverDirective.open();
        fixtureString.detectChanges();
        expect(fixtureString.componentInstance.isOpen).toBe(false);
        expect(fixtureString.componentInstance.popoverDirective.isOpen).toBe(false);
    });

    it('should set open on init', () => {
        spyOn(fixtureTemplate.componentInstance.popoverDirective, 'open');
        fixtureTemplate.componentInstance.popoverDirective.isOpen = true;
        fixtureTemplate.componentInstance.popoverDirective.ngOnInit();
        expect(fixtureTemplate.componentInstance.popoverDirective.open).toHaveBeenCalled();
    });

    it('should two-way bind isOpen', () => {
        fixtureTemplate.componentInstance.isOpen = true;
        fixtureTemplate.detectChanges();
        expect(fixtureTemplate.componentInstance.popoverDirective.isOpen).toBe(true);
        fixtureTemplate.componentInstance.popoverDirective.close();
        fixtureTemplate.detectChanges();
        expect(fixtureTemplate.componentInstance.isOpen).toBe(false)
    });

    it('should support multiple triggers', () => {
        fixtureTemplate.componentInstance.popoverDirective.triggers = ['click', 'hover'];
        fixtureTemplate.componentInstance.popoverDirective['eventRef'] = [];
        fixtureTemplate.componentInstance.popoverDirective.ngOnInit();
        fixtureTemplate.detectChanges();

        expect(fixtureTemplate.componentInstance.popoverDirective['eventRef'].length).toBe(2);
    });

    it('should support string content', () => {
        fixtureString.componentInstance.popoverDirective.open();
        expect(fixtureString.componentInstance.isOpen).toBe(true);
    });
});
