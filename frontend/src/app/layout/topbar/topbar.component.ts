import { Component, inject } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@app/core/auth/auth.service';
import { Router } from '@angular/router';
import { UserMenuComponent } from "@app/layout/user-menu/user-menu.component";

@Component({
  selector: 'app-topbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, UserMenuComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
