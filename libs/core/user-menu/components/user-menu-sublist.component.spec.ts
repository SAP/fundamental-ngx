import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMenuSublistComponent } from './user-menu-sublist.component';
import { KeyboardSupportService } from '@fundamental-ngx/cdk/utils';
import { UserMenuListItemComponent } from '@fundamental-ngx/core/user-menu';
import { QueryList } from '@angular/core';
import { Subject } from 'rxjs';

describe('UserMenuSublistComponent', () => {
    let component: UserMenuSublistComponent;
    let fixture: ComponentFixture<UserMenuSublistComponent>;
    let keyboardSupportService: KeyboardSupportService<UserMenuListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UserMenuSublistComponent],
            providers: [KeyboardSupportService]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMenuSublistComponent);
        component = fixture.componentInstance;
        keyboardSupportService = TestBed.inject(KeyboardSupportService);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize keyboard support service', () => {
        jest.spyOn(keyboardSupportService, 'setKeyboardService');
        component.ngAfterViewInit();
        expect(keyboardSupportService.setKeyboardService).toHaveBeenCalled();
    });

    it('should stop event propagation on click', () => {
        const event = new MouseEvent('click');
        jest.spyOn(event, 'stopPropagation');
        component.onClick(event);
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should handle keydown event', () => {
        const event = new KeyboardEvent('keydown');
        jest.spyOn(keyboardSupportService, 'onKeyDown');
        component.keyDownHandler(event);
        expect(keyboardSupportService.onKeyDown).toHaveBeenCalledWith(event);
    });

    it('should set up interaction listeners', () => {
        const mockItem = {
            focused: new Subject<any>(),
            _tabIndex$: { set: jest.fn() }
        } as unknown as UserMenuListItemComponent;
        
        component['_listItems'] = new QueryList<UserMenuListItemComponent>();
        component['_listItems'].reset([mockItem]);
        
        jest.spyOn(component['_refresh$'], 'next');
        component['ngAfterViewInit']();
        expect(component['_refresh$'].next).toHaveBeenCalled();
    });
});
