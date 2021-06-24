import { ThrowStmt } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddRecipeModel, IngridientsModel } from '../shared/recipes/add.recipe.model';
import { RecipeService } from '../services/recipe-service';


@Component({
  selector: 'add-recipe-dialog',
  templateUrl: './add-recipe-dialog.html',
  providers: [RecipeService]
})

export class AddRecipeDialog {
  ingridients: any[] = [];
  tempIngridients: any[] = [];
  public recipeModel = new AddRecipeModel();
  public ingridientsModel = new IngridientsModel();
  constructor(
    public dialogRef: MatDialogRef<AddRecipeDialog>,
    private recipeService: RecipeService
  ) {
    this.recipeModel = new AddRecipeModel();
    this.ingridientsModel = new IngridientsModel();
  }

  public confirmMessage: string;

  ngOnInit() {
    this.getAllIngridients();
  }

  getAllIngridients() {
    this.recipeService.getIngridients().subscribe((data: any[]) => {
      this.ingridients = data;
    })
  }

  addIngridient(model: IngridientsModel) {
    debugger;
    var ingridient = { Name: model.Name, Quantity: model.Quantity }
    this.tempIngridients.push(ingridient);
  }

  removeIngridient(name: string) {
    // tempIngridients
    for (var i = 0; i < this.tempIngridients.length; i++) {

      if (this.tempIngridients[i].Name === name) {

        this.tempIngridients.splice(i, 1);
      }
    }
  }

  createNewRecipe(model: AddRecipeModel) {
    if (model) {
      debugger;
      var recipe = { name: model.Name, source: model.Source, preparationTime: model.PreparationHours + ":" + model.PreparationMinutes, preparationInstruction: model.PreparationInstructions }
      // create new recipe
      this.recipeService.createRecipe(recipe).subscribe((item) => {
        console.log("Recipe created: ", item);

        //create ingridients
        this.createRecipeIngridients(model, item);
              
      });
    }
  }

  createRecipeIngridients(model: AddRecipeModel, recipe: any){
    this.tempIngridients.forEach(item => {
      var ingridients = { nameOfIngridient: item.Name, quantity: item.Quantity, Fk_Recipe: recipe.id };
      this.recipeService.createRecipeIngridients(ingridients).subscribe((ingridient) => {
        console.log("RecipeIngridient created: ", ingridient);
      });
    });
    this.dialogRef.close(true);
  }
}
