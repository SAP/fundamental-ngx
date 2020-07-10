import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from '../list.component';
import { StandardListItemComponent } from './standard-list-item.component';
import { PlatformListModule } from '../list.module';
import { StandardListItemModule } from './standard-list-item.module';
import { By } from '@angular/platform-browser';
import { ElementRef, ViewChild, Component } from '@angular/core';



@Component({
    template: `
        <fdp-standard-list-item #componentElement
         [title]="title">List Title Test Text</fdp-standard-list-item>
    `
})
class TestComponent {
    @ViewChild('componentElement', { read: ElementRef, static: false })
    ref: ElementRef;
    title: String;
}


describe('StandardListItemComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, StandardListItemComponent, ListComponent],
            imports: [StandardListItemModule, PlatformListModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a list item', () => {
        const listElement = fixture.debugElement.query(By.css('li'));
        expect(listElement.nativeElement.classList).toContain('fd-list__item');
    });

    it('should contain fd-list__secondary class', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('span'));
        expect(listElement.nativeElement.classList).toContain('fd-list__secondary');
    });

    it('list item should have title', () => {
        component.title = 'title 1';
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('span'));
        expect(listElement.nativeElement.getAttribute('title')).toEqual('title 1');
    });

    it('list item should have tabindex', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('li'));
        expect(listElement.nativeElement.getAttribute('tabindex')).toEqual('-1');
    });

    it('list item should have id', () => {
        fixture.detectChanges();
        const listElement = fixture.debugElement.query(By.css('li'));
        expect(listElement.nativeElement.getAttribute('id')).toContain('fdp-list-item-');
    });

});
