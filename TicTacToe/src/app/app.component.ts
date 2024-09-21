import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TTTHeaderComponent } from './tttheader/tttheader.component';
import { TTTFooterComponent } from './tttfooter/tttfooter.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TTTHeaderComponent, TTTFooterComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {}
