import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe-service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from './confirmation-dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})
export class RecipeListComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmationDialog>;
  recipes: any[] = [];
  ingridientsArray: any[] = [];
  elipsis = "...";

  constructor(private recipeService: RecipeService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((data: any[]) => {
      data.forEach(element => {
        if(element.preparationInstruction.length > 50) {
          element.preparationInstruction = element.preparationInstruction.substring(0, 50);
          var n = element.preparationInstruction.split(" ");
          var lastItemLength = n.pop().length;
          element.preparationInstruction = element.preparationInstruction.substring(0, element.preparationInstruction.length - lastItemLength) + "...";
        }
      });
      this.recipes = data;
      this.getIngridients();
    });
  }

  getIngridients(){
    this.recipeService.getRecipeIngridients().subscribe((data: any[]) => {
      this.ingridientsArray = data;     
  });
}

getIngridientsNumber(recipeId) {
    var items = [];
     this.ingridientsArray.forEach(ingridient => {
         if(ingridient.Fk_Recipe == recipeId) {
           items.push(ingridient);
         }
       });
       return items.length;
}

getIngridientsNames(recipeId) {
  var items = [];
   this.ingridientsArray.forEach(ingridient => {
       if(ingridient.Fk_Recipe == recipeId) {
         items.push(ingridient.nameOfIngridient);
      
       }
     });

     if(items.length > 3) {

       items = items.splice(0, 3);    
       items.push(this.elipsis);
     }

     return items;
}
  goToDetailRecipe(recipe) {
    this.router.navigate(['recipe-details/', recipe.id]);
  }

  deleteRecipe(id: any) {
    this.dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // do confirmation actions
        this.recipeService.deleteRecipe(id).subscribe((data) => {
          for (var i = 0; i < this.recipes.length; i++) {

            if (this.recipes[i].id === id) {

              this.recipes.splice(i, 1);
            }
          }
        });
      }
      this.dialogRef = null;
    });
  }
  displayCounter(count) {
    debugger;
    console.log(count);
}
}
