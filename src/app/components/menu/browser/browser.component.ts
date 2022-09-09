import { Component, OnInit} from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormControl, Validators } from '@angular/forms';
import { FoodService } from 'src/app/services/food.service';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit {
  //Icons
  searchIcon = faMagnifyingGlass

  //Forms
  search = new FormControl('',[Validators.minLength(3)])
  sort = new FormControl('')
  diet = new FormControl('')

  totalResults:number = -1
  pages:any[] = []
  currentPage:number = 0

  results:any[] = []

  //DetailsModal
  showDetails:boolean = false
  detailsTarget:number = 0

  
  constructor(private foodService:FoodService) { }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(500),
    )
    .subscribe(()=>{
      console.log(this.search.invalid)
      this.onSearch(this.search.invalid,0)
    })
    this.sort.valueChanges.pipe(
      debounceTime(500),
    )
    .subscribe(()=>{
      this.onSearch(this.search.invalid,0)
    })
    this.diet.valueChanges.pipe(
      debounceTime(500),
    )
    .subscribe(()=>{
      this.onSearch(this.search.invalid,0)
    })
  }

  onSearch(invalid:boolean,page:number){
    if(!invalid && this.search.value !== ''){
      this.foodService.searchMenu(this.search.value,page,this.diet.value,this.sort.value).subscribe(
        {next:data=>{
          this.results = data.results
          this.totalResults = data.totalResults
          this.pages = Array(Math.trunc(this.totalResults/12)).fill(0).map((x,i)=>i);
          console.log(this.results, data,'pages',this.pages)
        },
        error:err=>{
          console.log(err)
        }
      }
      )
    }
   
  }

  changePage(page:number){
    this.onSearch(this.search.invalid,(page)*12)
    this.currentPage = page

  }

  closeDetailsModal(){
    this.showDetails = false
  }
  showDetailsModal(id:number):void{
    this.detailsTarget = id
    this.showDetails = true
  }
  

}

