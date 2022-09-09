import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { MenuItemModalComponent } from '../../modals/menu-item-modal/menu-item-modal.component';

@Component({
  selector: 'app-menu-item-card',
  templateUrl: './menu-item-card.component.html',
  styleUrls: ['./menu-item-card.component.css']
})
export class MenuItemCardComponent implements OnInit {

    @Input()
    itemData!: MenuItem;

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }

    openItemModal() {
        const modalRef = this.modalService.open(MenuItemModalComponent);
        modalRef.componentInstance.data = this.itemData;
    }

}
