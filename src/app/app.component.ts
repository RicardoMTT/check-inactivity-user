import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userInactive: Subject<any> = new Subject();
  timeoutId: any;

  constructor() {
    this.checkTimeOut();
    this.userInactive.subscribe((message) => {
      alert(message);
    });
  }
  //Cada vez que se mueva el mouse o se de click en alguna parte este evento limpiara el setTimeout y no se podra aun enviar el next() al observable para el alert
  @HostListener('window:keydown')
  @HostListener('window:mousedown')
  @HostListener('window:mousemove')
  checkUserActivity() {
    clearTimeout(this.timeoutId); //resetea el setTimeout y vuelve a contar, requiere el id devuelto por el setTimeout
    this.checkTimeOut();
  }

  checkTimeOut() {
    this.timeoutId = setTimeout(() => {
      this.userInactive.next('User has been inactive for 5 seconds');
    }, 30000);
  }
}
