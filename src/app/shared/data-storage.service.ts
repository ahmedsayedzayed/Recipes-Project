import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { recipeService } from "../recipes/recipe.service";

import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";
import { pipe } from "rxjs";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: recipeService,
        private authService: AuthService
    )  {}
    
    storRecipe() {
        const recipes = this.recipeService.getRecipes();
        this.http.put("https://recipe-project-19e9f-default-rtdb.firebaseio.com/recipes.json", recipes)
            .subscribe(
                (response) => {
                    console.log(response);
                }
            )
    }

    fetchData() {
      return this.http      
        .get<Recipe[]>(
            "https://recipe-project-19e9f-default-rtdb.firebaseio.com/recipes.json")
        .pipe(
            map(
                (recipes) => {
                    return recipes.map(
                        (recipe) => {
                            return {
                                ...recipe,
                                ingrediants: recipe.ingrediants ? recipe.ingrediants : []
                            };
                        });
                }),
            tap((recipes) => {
                    this.recipeService.setRecipes(recipes)
                 }
            )    
        )
   
     
   

    }
}