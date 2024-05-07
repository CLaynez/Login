import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-something',
  template: `
    <div>
      {{ translatedMessage }}
    </div>
  `
})
export class SomethingComponent {
  translatedMessage: string;

  constructor(private translate: TranslateService) {
    // Configura el idioma por defecto (por ejemplo, 'en' para inglés)
    this.translate.setDefaultLang('en');
    // Carga las traducciones específicas de tu aplicación
    this.translate.use('en');

    // Obtén la traducción de forma síncrona utilizando this.translate.instant()
    this.translatedMessage = this.translate.instant('Thanks');
  }
}