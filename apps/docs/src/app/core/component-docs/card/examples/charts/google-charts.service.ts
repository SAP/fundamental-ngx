/// <reference types="@types/google.visualization" />
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

export type Visualization = typeof google.visualization;
export type DataTable = google.visualization.DataTable;
export type Chart = google.visualization.ChartBase;

const CHARTS_SRC = 'https://www.gstatic.com/charts/loader.js';

@Injectable({ providedIn: 'root' })
export class GoogleChartService {
    private _loadPromise: Promise<Visualization>;

    getVisualization(): Observable<Visualization> {
        return from(this.load());
    }

    private load(): Promise<Visualization> {
        if (this._loadPromise) {
            return this._loadPromise;
        }
        this._loadPromise = new Promise((resolve, reject) => {
            const script = this.createGoogleChartsScript();

            script.onload = () => {
                // Load the Visualization API and the corechart package.
                google.charts.load('current', { packages: ['corechart'] });

                // Set a callback to run when the Google Visualization API is loaded.
                google.charts.setOnLoadCallback(() => {
                    resolve(google.visualization);
                });
            };

            script.onerror = (error) => {
                reject(error);
            };

            document.getElementsByTagName('head')[0].appendChild(script);
        });

        return this._loadPromise;
    }

    private createGoogleChartsScript(): HTMLScriptElement {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = CHARTS_SRC;
        script.async = true;
        return script;
    }
}
