import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faClock, faDollarSign, faHeart, faLeaf, faUser } from '@fortawesome/free-solid-svg-icons';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DayMenu, MenuInfo } from 'src/app/models/FoodModels';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-details-menu',
  templateUrl: './details-menu.component.html',
  styleUrls: ['./details-menu.component.scss']
})
export class DetailsMenuComponent implements OnInit {
  @ViewChild('swalError')
  public readonly swalError!: SwalComponent;
  @ViewChild('swalSuccess')
  public readonly swalSuccess!: SwalComponent;
  //icons
  servingsIcon = faUser
  timerIcon = faClock
  priceIcon = faDollarSign
  hearticon = faHeart
  veganIcon = faLeaf
  
  isLoading = true
  isLogged = false

  @Input() menuID:number = 0
  @Input() isAdding:boolean = false
  @Input() deleteID:number = 0
  @Output() close:EventEmitter<boolean> = new EventEmitter()
  @Output() add:EventEmitter<MenuInfo> = new EventEmitter<MenuInfo>()
  @Output() remove:EventEmitter<boolean> = new EventEmitter<boolean>()

  menuData:MenuInfo = <MenuInfo>{}

  constructor(private foodService:FoodService,private auth:AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.auth.isLogged()
   this.foodService.getDetails(this.menuID).subscribe({
      next:data=>{
        this.menuData = data
        this.isLoading = false
      },
      error:err=>{
        this.swalError.fire()
        this.swalError.text = 'Error getting data'+err.error.message
      }
    })
  }

  closeModal(){
   this.close.emit()
  }

  addToMenu(){
    this.isLoading = true
    this.foodService.getDayMenu().subscribe(
      {
        next:menu=>{
          if(menu.items.length > 3){
            this.isLoading = false
            this.swalError.fire()
            this.swalError.text = 'Menu is full'
            return
          }
          if(this.menuData.vegan){
            if(checkVegans(menu.items)){
              this.foodService.addToMenu(this.menuData).subscribe(
                data=>{
                  this.swalSuccess.fire()
                  this.isLoading = false
                  return
                }
              )
            }
            else{
              this.swalError.fire()
              this.swalError.text = 'Cant add more vegan plates'
              this.isLoading = false
              return
            }
          }
          else{
            if(checkNoVegans(menu.items)){
              this.foodService.addToMenu(this.menuData).subscribe(
                data=>{
                  this.swalSuccess.fire()
                  this.isLoading = false
                  return
                }
              )
            }
            else{
              this.swalError.fire()
              this.swalError.text = 'Cant add more no vegan plates'
              this.isLoading = false
              return
            }
          }
          
        },
        error:err=>{
          if(err.error.message === "No meals planned for that day"){
            this.foodService.addToMenu(this.menuData).subscribe(
              data=>{
                this.swalSuccess.fire()
                this.isLoading = false
                return
              }
            )
          }
          else{
            this.swalError.fire()
            this.swalError.text = err.error.message
            this.isLoading = false
          }
        }
      }
    )
    }
  
  deleteFromMenu(){
    this.isLoading = true
    this.foodService.deleteFood(this.deleteID).subscribe(
      {
        next:data=>{
          this.swalSuccess.fire()
          this.swalSuccess.text = 'Removed Succesfully'
          this.isLoading = false
          this.remove.emit()
        },
        error:err=>{
          this.swalError.fire()
          this.swalError.text = err.error.message
          this.isLoading = false
        }
      }
    )
  }

}
function checkVegans(items:DayMenu[]):boolean{
  return items.filter(item=> item.value.vegan === true).length < 2
}
function checkNoVegans(items:DayMenu[]):boolean{
  return items.filter(item=> item.value.vegan === false).length < 2
}

