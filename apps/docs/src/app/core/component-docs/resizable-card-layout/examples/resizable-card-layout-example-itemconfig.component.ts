import { Component, OnInit } from '@angular/core';
import {
    ResizableCardLayoutConfig,
    ResizedEvent,
    ResizableCardItemConfig
} from '@fundamental-ngx/core/resizable-card-layout';

@Component({
    selector: 'fd-resizable-card-layout-example-itemconfig',
    templateUrl: './resizable-card-layout-example-itemconfig.component.html',
    styleUrls: ['./resizable-card-layout-example.component.scss']
})
export class ResizableCardLayoutExampleItemConfigComponent implements OnInit {
    layoutConfig: ResizableCardLayoutConfig;
    visible = false;
    pageTitle = 'Balenciaga Tripple S Trainers';

    initialRows = 3;

    listData: number[];

    card1Data: number[];
    card2Data: number[];
    card3Data: number[];
    card4Data: number[];
    card5Data: number[];
    card6Data: number[];
    card7Data: number[];

    ngOnInit(): void {
        this.layoutConfig = [
            {
                title: 'card1',
                rank: 1,
                cardWidthColSpan: 2,
                cardHeightRowSpan: 20,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            },
            {
                title: 'card2',
                rank: 2,
                cardWidthColSpan: 2,
                cardHeightRowSpan: 18,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            },
            {
                title: 'card3',
                rank: 3,
                cardWidthColSpan: 1,
                cardHeightRowSpan: 20,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            },
            {
                title: 'card4',
                rank: 4,
                cardWidthColSpan: 1,
                cardHeightRowSpan: 12,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            },
            {
                title: 'card5',
                rank: 5,
                cardWidthColSpan: 2,
                cardHeightRowSpan: 12,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            },
            {
                title: 'card6',
                rank: 6,
                cardWidthColSpan: 2,
                cardHeightRowSpan: 12,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            },
            {
                title: 'card7',
                rank: 7,
                cardWidthColSpan: 3,
                cardHeightRowSpan: 12,
                cardMiniHeaderRowSpan: 4,
                cardMiniContentRowSpan: 4,
                resizable: true
            }
        ];
    }

    openPage(): void {
        this.visible = true;
        this._initialData();
    }

    closePage(): void {
        this.visible = false;
    }

    onStepChange(event: ResizedEvent): void {
        this._showData(event);
    }

    private _initialData(): void {
        this.listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17];

        this.card1Data = this.listData.slice(0, this.initialRows + 2);
        this.card2Data = this.listData.slice(0, this.initialRows + 2);
        this.card3Data = this.listData.slice(0, this.initialRows + 2);
        this.card4Data = this.listData.slice(0, this.initialRows);
        this.card5Data = this.listData.slice(0, this.initialRows);
        this.card6Data = this.listData.slice(0, this.initialRows);
        this.card7Data = this.listData.slice(0, this.initialRows);
    }

    /** Decides how much data is shown on card */
    private _showData(event: ResizedEvent): void {
        switch (event.card.title) {
            case 'card1': {
                const config = this.layoutConfig[0];
                this.card1Data = this._getCardData(event, config, 4);
                break;
            }
            case 'card2': {
                const config = this.layoutConfig[1];
                this.card2Data = this._getCardData(event, config, 3);
                break;
            }
            case 'card3': {
                const config = this.layoutConfig[2];
                this.card3Data = this._getCardData(event, config, 3);
                break;
            }
            case 'card4': {
                const config = this.layoutConfig[3];
                this.card4Data = this._getCardData(event, config, 3);
                break;
            }
            case 'card5': {
                const config = this.layoutConfig[4];
                this.card5Data = this._getCardData(event, config, 3);
                break;
            }
            case 'card6': {
                const config = this.layoutConfig[5];
                this.card6Data = this._getCardData(event, config, 3);
                break;
            }
            case 'card7': {
                const config = this.layoutConfig[6];
                this.card7Data = this._getCardData(event, config, 3);
                break;
            }
        }
    }

    private _getCardData(event: ResizedEvent, config: ResizableCardItemConfig, listDataAmount: number): number[] {
        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            return [];
        } else if (
            event.newCardHeightRowSpan ===
            (config.cardMiniHeaderRowSpan ?? 0) + (config.cardMiniContentRowSpan ?? 0)
        ) {
            return this.listData.slice(0, listDataAmount);
        } else {
            const index = (event.newCardHeightRowSpan - (config.cardMiniHeaderRowSpan ?? 0)) / 3;
            return this.listData.slice(0, index);
        }
    }
}
