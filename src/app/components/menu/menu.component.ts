import { Component, OnInit, ViewChild } from '@angular/core';
import { faClock, faDollarSign, faHeart } from '@fortawesome/free-solid-svg-icons';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DayMenu, MenuInfo, MenuSimple } from 'src/app/models/FoodModels';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild('swalError')
  public readonly swalError!: SwalComponent;
  //Icons
  timerIcon = faClock
  priceIcon = faDollarSign
  hearticon = faHeart
  
  //MenuList
  menuItems:MenuInfo[] = []
  isLoading = false

  //Details
  showDetailsWindow:boolean = false
  detailsTarget:number = 0
  targetDeleteID:number = 0

  //Auth
  isLogged = false

  constructor(private foodService:FoodService,private auth:AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged()
    this.getMenu()
  }

  getMenu(){
    this.isLoading = true
    this.foodService.getDayMenu().subscribe({
      next:data=>{
        let items:MenuInfo[] =[]
        data.items.forEach(
          menu=>{
            menu.value.deleteID = menu.id
            items.push(menu.value)
          }
        )
        this.menuItems = items
        this.isLoading = false
      },
      error:err=>{
        this.swalError.fire()
        if(err.error.message === 'No meals planned for that day'){
          this.swalError.text = 'Menu is empty'
        }
        else{
          this.swalError.text = 'Error Getting data' + err.error.message
        }
        this.isLoading = false
      }
    })
  }

  showMenuDetails(id:number,deleteID:number){
    this.detailsTarget = id
    this.targetDeleteID = deleteID
    this.showDetailsWindow = true
  }
  closeDetailsWindow(){
    this.detailsTarget = 0
    this.targetDeleteID = 0
    this.showDetailsWindow = false
  }

  removedFood(){
    this.getMenu()
    this.closeDetailsWindow()
  }

  getCumulativePrice():string{
    let sum = 0
    this.menuItems.forEach(
      menu=>{
        sum += (menu.pricePerServing)
      }
    )
    return (sum/100).toFixed(2)
  }
  getCumulativePrepTime():number{
    let sum = 0
    this.menuItems.forEach(
      menu=>{
        sum += (menu.readyInMinutes)
      }
    )
    return sum
  }
  getCumulativeHealthScore():number{
    let sum = 0
    this.menuItems.forEach(
      menu=>{
        sum += (menu.healthScore)
      }
    )
    return sum
  }

 

}
