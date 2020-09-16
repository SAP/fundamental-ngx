import { Component, ViewChild } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThumbnailImageComponent } from './thumbnail-image.component';
import { PlatformThumbnailModule } from '../thumbnail.module';
import { Media } from '../thumbnail.component';

@Component({
    template: `<fdp-thumbnail-image [mediaList]="mediaList"></fdp-thumbnail-image>`
})
class DefaultThumbnailImageTestComponent {
    mediaList: Media[] = [{
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature'
    }];
    @ViewChild(ThumbnailImageComponent, { static: true })
    thumbnailImage: ThumbnailImageComponent;
}

describe('DefaultThumbnailImageComponent', () => {
    let component: DefaultThumbnailImageTestComponent;
    let fixture: ComponentFixture<DefaultThumbnailImageTestComponent>;
    let thumbNailImageComponent: ThumbnailImageComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PlatformThumbnailModule],
            declarations: [ThumbnailImageComponent, DefaultThumbnailImageTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultThumbnailImageTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        thumbNailImageComponent = component.thumbnailImage;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check for thumbnail load', () => {
        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.classList.contains('fdp-thumbnail-image-container')).toBe(true);
    });
    it('should emit on thumbNailClicked', () => {

        spyOn(thumbNailImageComponent.thumbNailClicked, 'emit')
        thumbNailImageComponent.thumbNailClick(component.mediaList[0]);
        expect(thumbNailImageComponent.thumbNailClicked.emit).toHaveBeenCalled();
        expect(thumbNailImageComponent.thumbNailClicked.emit).toHaveBeenCalledWith(component.mediaList[0]);

    });

});


@Component({
    template: `<fdp-thumbnail-image [mediaList]="mediaList" [isHorizontal]="isHorizontal" ></fdp-thumbnail-image>`
})
class HorizontalThumbnailImageTestComponent {
    mediaList: Media[] = [{
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature'
    }];

    isHorizontal = true;
}

describe('HorizontalThumbnailImageComponent', () => {
    let component: HorizontalThumbnailImageTestComponent;
    let fixture: ComponentFixture<HorizontalThumbnailImageTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [PlatformThumbnailModule],
            declarations: [ThumbnailImageComponent, HorizontalThumbnailImageTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HorizontalThumbnailImageTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check for horizonntal orientation thumbnail load', () => {
        const divElement = fixture.debugElement.query(By.css('div'));
        expect(divElement.nativeElement.children[0].classList.contains('fdp-thumbnail-image--horizontal')).toBe(true);
    });

});
