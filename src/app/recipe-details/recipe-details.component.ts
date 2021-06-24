import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe-service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationDialog } from '../recipe-list/confirmation-dialog';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  providers: [RecipeService]
})
export class RecipeDetailsComponent implements OnInit {
  dialogRef: MatDialogRef<ConfirmationDialog>;
  recipe: any;
  ingridientsArray: any[] = [];

  @Output() sendRecipeDataEvent = new EventEmitter<any>();
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    var recipe = this.route.params.subscribe(params => {
      var recipeId = params['id'];
      this.getRecipeDetailsById(recipeId);
      this.getIngridients();
    });
  }

  getRecipeDetailsById(recipeId) {
    this.recipeService.getRecipe(recipeId).subscribe((ret) => {
      this.recipe = ret;
      console.log("Recipe loaded: ", ret);
    });
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

          this.goToRecipeList();

        });
      }
      this.dialogRef = null;
    });
  }

  goToRecipeList() {
    this.router.navigate(['recipe-list/']);
  }

  getIngridients() {
    this.recipeService.getRecipeIngridients().subscribe((data: any[]) => {
      this.ingridientsArray = data;
    });
  }

  getIngridientsNames(recipeId) {
    var itemsArray = [];
    this.ingridientsArray.forEach(ingridient => {
      if (ingridient.Fk_Recipe == recipeId) {
        let ingridientItem = ingridient.nameOfIngridient + ' ' + ingridient.quantity;
        itemsArray.push(ingridientItem);
      }
    });

    return itemsArray;
  }
}
