import { Component, OnInit } from '@angular/core';
import { ResizableCardLayoutConfig, ResizedEvent } from '@fundamental-ngx/core/resizable-card-layout';

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
            case 'card1':
                this._handleCard1Data(event);
                break;

            case 'card2':
                this._handleCard2Data(event);
                break;

            case 'card3':
                this._handleCard3Data(event);
                break;

            case 'card4':
                this._handleCard4Data(event);
                break;

            case 'card5':
                this._handleCard5Data(event);
                break;

            case 'card6':
                this._handleCard6Data(event);
                break;

            case 'card7':
                this._handleCard7Data(event);
                break;
        }
    }

    private _handleCard1Data(event: ResizedEvent): void {
        const config = this.layoutConfig[0];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card1Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card1Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card1Data = this._getListData(index);
        }
    }

    private _handleCard2Data(event: ResizedEvent): void {
        const config = this.layoutConfig[1];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card2Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card2Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card2Data = this._getListData(index);
        }
    }

    private _handleCard3Data(event: ResizedEvent): void {
        const config = this.layoutConfig[2];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card3Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card3Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card3Data = this._getListData(index);
        }
    }

    private _handleCard4Data(event: ResizedEvent): void {
        const config = this.layoutConfig[3];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card4Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card4Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card4Data = this._getListData(index);
        }
    }

    private _handleCard5Data(event: ResizedEvent): void {
        const config = this.layoutConfig[4];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card5Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card5Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card5Data = this._getListData(index);
        }
    }

    private _handleCard6Data(event: ResizedEvent): void {
        const config = this.layoutConfig[5];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card6Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card6Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card6Data = this._getListData(index);
        }
    }

    private _handleCard7Data(event: ResizedEvent): void {
        const config = this.layoutConfig[6];

        if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan) {
            this.card7Data = [];
        } else if (event.newCardHeightRowSpan === config.cardMiniHeaderRowSpan + config.cardMiniContentRowSpan) {
            this.card7Data = this._getListData(1);
        } else {
            const index = (event.newCardHeightRowSpan - config.cardMiniHeaderRowSpan) / 3;
            this.card7Data = this._getListData(index);
        }
    }

    private _getListData(index: number): Array<number> {
        return this.listData.slice(0, index);
    }
}
