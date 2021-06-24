import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule  } from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { InMemRecipesService } from './services/data-service.service';
import { RecipeService } from './services/recipe-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationDialog } from './recipe-list/confirmation-dialog';
import { AddRecipeDialog } from './home/add-recipe-dialog';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const appRoutes: Routes = [
 
  { path: 'recipe-list', component: RecipeListComponent },
  { path: "app-home", component: HomeComponent },
  { path: '',   redirectTo: '/app-home', pathMatch: 'full' },
  { path: 'recipe-details/:id', component: RecipeDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RecipeListComponent,
    HomeComponent,
    ConfirmationDialog,
    AddRecipeDialog,
    RecipeDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemRecipesService),
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmationDialog, AddRecipeDialog]
})
export class AppModule { }
