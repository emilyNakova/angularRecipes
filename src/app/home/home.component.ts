import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddRecipeDialog } from './add-recipe-dialog';
import { RecipeService } from '../services/recipe-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [RecipeService]
})
export class HomeComponent implements OnInit {
  title = 'Macedonian kitchen';
  dialogRef: MatDialogRef<AddRecipeDialog>;
  constructor(
    private recipeService: RecipeService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }
  // newRecipe() {
  //   this.router.navigate(['/', 'users']);
  // }

  newRecipe(id: any) {
    this.dialogRef = this.dialog.open(AddRecipeDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(model => {
      this.router.navigate(['recipe-list/']);
      this.dialogRef = null;
    });
  }

}
