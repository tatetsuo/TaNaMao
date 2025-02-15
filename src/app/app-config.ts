import { provideAnimations } from '@angular/platform-browser/animations';

export class BerryConfig {
  providers = [
    provideAnimations()
  ];
  static isCollapse_menu = false;
  static font_family = 'poppins'; // Roboto, poppins, inter
}
