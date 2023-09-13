import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { SelectModule } from '@fundamental-ngx/core/select';

interface Casts {
    name?: string;
    nationality?: string;
    age?: number;
}

@Component({
    selector: 'fd-card-list-example',
    templateUrl: 'card-list-example.component.html',
    standalone: true,
    imports: [
        CardModule,
        ListModule,
        NgClass,
        ListSecondaryDirective,
        ObjectStatusComponent,
        SelectModule,
        ContentDensityDirective,
        NgFor,
        AvatarModule
    ]
})
export class CardListExampleComponent implements OnInit {
    selectedMovie = 'Movie 1';
    movies: string[] = ['Movie 1', 'Movie 2', 'Movie 3'];
    casts: Casts[] = [];

    movie1Casts: Casts[] = [
        { name: 'Actor 1', nationality: 'Indian', age: 40 },
        { name: 'Actor 2', nationality: 'American', age: 30 },
        { name: 'Actor 3', nationality: 'British', age: 40 },
        { name: 'Actor 4', nationality: 'German', age: 45 }
    ];

    movie2Casts: Casts[] = [
        { name: 'Actor 5', nationality: 'Italian', age: 41 },
        { name: 'Actor 6', nationality: 'American', age: 39 },
        { name: 'Actor 7', nationality: 'Canadian', age: 42 },
        { name: 'Actor 8', nationality: 'American', age: 59 }
    ];

    movie3Casts: Casts[] = [
        { name: 'Actor 5', nationality: 'American', age: 41 },
        { name: 'Actor 6', nationality: 'German', age: 39 },
        { name: 'Actor 7', nationality: 'Italian', age: 42 },
        { name: 'Actor 8', nationality: 'Spanish', age: 59 }
    ];

    ngOnInit(): void {
        this.casts = this.movie1Casts;
    }

    onValueChange(): void {
        switch (this.selectedMovie) {
            case this.movies[0]:
                this.casts = this.movie1Casts;
                break;
            case this.movies[1]:
                this.casts = this.movie2Casts;
                break;
            case this.movies[2]:
                this.casts = this.movie3Casts;
                break;
            default:
                this.casts = this.movie1Casts;
        }
    }
}
