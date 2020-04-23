import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardListItemComponent } from './standard-list-item.component';
import { PlatformListModule } from '../list.module';
import { By } from '@angular/platform-browser';

describe('StandardListItemComponent', () => {
    let component: StandardListItemComponent;
    let fixture: ComponentFixture<StandardListItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PlatformListModule],
            declarations: [StandardListItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StandardListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render a standard list item', () => {
        const listElement = fixture.debugElement.query(By.css('li'));
        expect(listElement.nativeElement.classList).toContain('fd-list__item');
    });

    it('should contain navigation indication class', () => {
        component.showNavigationArrow = true;
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('a');
        expect(listElement.classList).toContain('fd-list__link--navigation-indicator');
    });

    it('list item should navigate', () => {
        component.hasNavigation = true;
        fixture.detectChanges();
        const listElement = fixture.debugElement.nativeElement.querySelector('a');
        expect(listElement.classList).toContain('fd-list__link');
    });


});
