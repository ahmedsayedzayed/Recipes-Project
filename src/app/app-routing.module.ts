import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";



    
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {path:'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RercipesModule)  },
    {path:'shopping-list', loadChildren: () => import('./shoping-list/shoppling-list.module').then(m => m.ShopingListModule)  },
    {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)  }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingMoudule { }