export interface MenuSimple{
    id:number
    title:string
    image:string
    imageType:string
}

export interface MenuInfo{
    id:number
    deleteID:number
    title:string
    image:string
    imageType:string
    servings:number
    readyInMinutes:number
    healthScore:number
    pricePerServing:number
    vegan:boolean
    summary:string
}

export interface DayMenu{
    id: number,
    date?:string
    slot: 1,
    position: number,
    type: string,
    value: MenuInfo
}

export interface MealPlan{
    date:number
    day:string
    nutritionSummary:any
    nutritionSummaryBreakfast:any
    nutritionSummaryLunch:any
    nutritionSummaryDinner:any
    items:DayMenu[]
}