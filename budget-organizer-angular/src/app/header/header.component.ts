import { Component, enableProdMode, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  ngOnInit(): void {
  }

  menuDisplay() {
    let userMenu = (document.querySelector('.menu') as HTMLElement);
        userMenu.classList.toggle('fadeOutLeft');
        userMenu.classList.toggle('fadeInLeft');
        setTimeout(() => userMenu.style.display = 'block', 500);
  }

  menuClosed() {
    let userMenu = (document.querySelector('.menu') as HTMLElement);
        userMenu.classList.toggle('fadeInLeft');
        userMenu.classList.toggle('fadeOutLeft');
        setTimeout(() => userMenu.style.display = 'none', 500);
    }

}
