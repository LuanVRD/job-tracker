import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProfileService } from '@app/features/profile/services/profile.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  profileService = inject(ProfileService);

  currentUser = toSignal(this.profileService.getBasicData(), { initialValue: null })

  get userInitials(): string {
    const name = this.currentUser()?.name;
    if (!name) return 'U';

    const nameParts = name.trim().split(' ');
    if (nameParts?.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return (nameParts[0][0]).toUpperCase();
  }
}
