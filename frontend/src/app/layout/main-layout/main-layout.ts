import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopbarComponent } from "../topbar/topbar";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [MatSidenavModule, TopbarComponent, RouterOutlet, SidebarComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent { }
