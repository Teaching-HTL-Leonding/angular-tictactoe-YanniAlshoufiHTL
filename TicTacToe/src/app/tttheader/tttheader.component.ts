import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-tttheader',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './tttheader.component.html',
})
export class TTTHeaderComponent {}
