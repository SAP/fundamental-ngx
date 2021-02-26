import { Component, ViewChild } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThumbnailImageComponent } from './thumbnail-image.component';
import { PlatformThumbnailModule } from '../thumbnail.module';
import { Media } from '../thumbnail.component';

@Component({
    template: `<fdp-thumbnail-image [mediaList]="mediaList"></fdp-thumbnail-image>`
})
class DefaultThumbnailImageTestComponent {
    mediaList: Media[] = [{
        title: 'Nature Deetails',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature'
    }, {
        title: 'Nature Deetails',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature2'
    }];
    @ViewChild(ThumbnailImageComponent, { static: true })
    thumbnailImage: ThumbnailImageComponent;
}

describe('DefaultThumbnailImageComponent', () => {
    let component: DefaultThumbnailImageTestComponent;
    let fixture: ComponentFixture<DefaultThumbnailImageTestComponent>;
    let thumbNailImageComponent: ThumbnailImageComponent;
    beforeEach(waitForAsync(() => {
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

        spyOn(thumbNailImageComponent.thumbnailClicked, 'emit')
        thumbNailImageComponent.thumbnailClick(component.mediaList[0]);
        expect(thumbNailImageComponent.thumbnailClicked.emit).toHaveBeenCalled();
        expect(thumbNailImageComponent.thumbnailClicked.emit).toHaveBeenCalledWith(component.mediaList[0]);

    });

    it('should highlight the first thumbnail by default', () => {
        const thumbnails = fixture.debugElement.queryAll(By.css('.fdp-thumbnail-image'));
        expect(thumbnails[0].classes['fdp-thumbnail-image--selected']).toBeTruthy();
        expect(thumbnails[1].classes['fdp-thumbnail-image--selected']).toBeFalsy();
    });

});


@Component({
    template: `<fdp-thumbnail-image [mediaList]="mediaList" [isHorizontal]="isHorizontal" ></fdp-thumbnail-image>`
})
class HorizontalThumbnailImageTestComponent {
    mediaList: Media[] = [{
        title: 'Nature Details',
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

    beforeEach(waitForAsync(() => {
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

@Component({
    template: `<fdp-thumbnail-image [mediaList]="mediaList" [maxImages]="5" ></fdp-thumbnail-image>`
})
class MoreImagesThumbnailImageTestComponent {
    mediaList: Media[] = [{
        title: 'Nature Details',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'nature'
    },
    {
        title: 'Sports Details',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'sports'
    },
    {
        title: 'Culture Details',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'culature'
    },
    {
        title: 'Bank Details',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'bank'
    },
    {
        title: 'Garden Details',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'garden'
    },
    {
        title: 'Rose Details',
        thumbnailUrl: 'http://lorempixel.com/400/400/nature',
        mediaType: 'image',
        mediaUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
        alt: 'Failed to load http://lorempixel.com/400/400/nature',
        label: 'rose'
    }

    ];

}

describe('MoreImagesThumbnailImageTestComponent', () => {
    let component: MoreImagesThumbnailImageTestComponent;
    let fixture: ComponentFixture<MoreImagesThumbnailImageTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformThumbnailModule],
            declarations: [ThumbnailImageComponent, MoreImagesThumbnailImageTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MoreImagesThumbnailImageTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display overlay after list crosses the max limit', () => {
        const thumbnails = fixture.debugElement.queryAll(By.css('.fdp-thumbnail-image'));
        expect(thumbnails[4].classes['fdp-thumbnail-image--overlay']).toBeTruthy();
        expect(thumbnails[1].classes['fdp-thumbnail-image--overlay']).toBeFalsy();
    });
    it('should display overflow text after list crosses the max limit', () => {

        const overlay = fixture.debugElement.query(By.css('.fdp-thumbnail-overflow'));
        expect(overlay.nativeElement.innerHTML).toEqual('+1');

    });

});
