import { Component, Input, OnInit } from '@angular/core';
import { faDollarSign, faHeart, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { MenuInfo } from 'src/app/models/FoodModels';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent implements OnInit {
  priceIcon = faDollarSign
  veganIcon = faLeaf
  hearticon = faHeart

  @Input() data:MenuInfo = <MenuInfo>{}
  

  constructor() { }

  ngOnInit(): void {
  }

}
