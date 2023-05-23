import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  showDropdown(element: String) {
    let el = document.querySelector(element.toLowerCase());
    document.querySelectorAll(".dropdown-content").forEach(current => {
      if (current.classList.contains('show')) {
        current.classList.toggle('show');
      } else if (current === el) {
        el.classList.toggle('show');
      }
    });
  }
}
