// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  foodApiURL:'https://api.spoonacular.com/',
  foodApiKey:'apiKey=bb89927b2b0c43aabd77936c1f786981',
  foodApiUser:{
    username:'mainmenu',
    spoonacularPassword:'tacoson33staranise',
    hash:'10c421cd523268ee489008e6bf1e66b40ebd5dd2',
    day:'2022-09-01',
    dayStamp:'16619947,20'
  },
  loginApiUrl:'http://challenge-react.alkemy.org'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 *  
 * "username": "mainmenu",
    "spoonacularPassword": "tacoson33staranise",
    "hash": "10c421cd523268ee489008e6bf1e66b40ebd5dd2"
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
//Day https://api.spoonacular.com/mealplanner/mainmenu/day/2022-09-01?apiKey=bb89927b2b0c43aabd77936c1f786981&hash=10c421cd523268ee489008e6bf1e66b40ebd5dd2