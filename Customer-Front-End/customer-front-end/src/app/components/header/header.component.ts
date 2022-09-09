import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartModalComponent } from '../modals/cart-modal/cart-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }

    openCart() {
        this.modalService.open(CartModalComponent);
    }

}
