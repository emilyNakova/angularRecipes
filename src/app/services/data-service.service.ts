import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { debugPort } from 'process';

@Injectable()
export class InMemRecipesService implements InMemoryDbService{
    createDb() {
      let recipes = [
        { id: 1, name: 'Musaka', source: 'test sgsdf', preparationTime: '00:15', preparationInstruction:'Step 1. First take the meat and oil . ' },
        { id: 2, name: 'Tavce gravce',source: 'dsfdsf', preparationTime:'1:00', preparationInstruction:'' },
        { id: 3, name: 'Pindzur', source: 'sdfdsf', preparationTime:'00:30', preparationInstruction:'' },
        { id: 4, name: 'Pancakes', source: 'sfsdfdsfsdf', 
        preparationInstruction:'Step 1 In a large bowl, mix flour, sugar, baking powder and salt. Make a well in the center, and pour in milk, egg and oil. Mix until smooth.'
           +  " Step 2" +
        "Heat a lightly oiled griddle or frying pan over medium high heat. Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake. Brown on both sides and serve hot.", preparationTime:'00:15' },
        { id: 5, name: 'Piperki i jajca', source: 'dsfdsfdsf', preparationTime:'00:10', preparationInstruction:'' },
      ];
     // return {recipes};

      let ingridients = [
        { id: 1, nameOfIngridient: 'Flour', quantity: 5},
        { id: 2, nameOfIngridient: 'Milk',quantity: 10 },
        { id: 3, nameOfIngridient: 'Salt', quantity: 1},
        { id: 4, nameOfIngridient: 'Sugar', quantity: 2 },
        { id: 5, nameOfIngridient: 'Eggs', quantity: 5},
        { id: 5, nameOfIngridient: 'Tomatoes', quantity: 80},
        { id: 5, nameOfIngridient: 'Peppers', quantity: 15},
        { id: 5, nameOfIngridient: 'Cheese', quantity: 25},
        { id: 5, nameOfIngridient: 'Potatoes', quantity: 20},
        { id: 5, nameOfIngridient: 'Meat', quantity: 15},
      ];

      let recipeIngridients = [
        { id: 1, nameOfIngridient: 'Meat', quantity: 5, Fk_Recipe :1},
        { id: 2, nameOfIngridient: 'Oil', quantity: 10, Fk_Recipe:2 },
        { id: 3, nameOfIngridient:  'Flour', quantity: 1, Fk_Recipe:4},
        { id: 4, nameOfIngridient:  'Cheese', quantity: 1, Fk_Recipe:4},
        { id: 5, nameOfIngridient:  'Peppers', quantity: 1, Fk_Recipe:4},
        { id: 6, nameOfIngridient:  'Meat', quantity: 1, Fk_Recipe:4},
      ];

      const db = {recipes, ingridients, recipeIngridients};

      return db;
    }

    // genId<T extends "recipes">(myTable: T[]): number {
    //   return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
    // }
  }