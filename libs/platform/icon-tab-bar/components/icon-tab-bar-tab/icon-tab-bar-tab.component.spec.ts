import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconTabBarTabComponent } from './icon-tab-bar-tab.component';

describe('IconTabBarTabComponent', () => {
    let component: IconTabBarTabComponent;
    let fixture: ComponentFixture<IconTabBarTabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconTabBarTabComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(IconTabBarTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
