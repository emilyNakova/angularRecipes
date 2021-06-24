import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { Observable } from 'rxjs/Observable';
// import { Http, Headers} from '@angular/http'
// import 'rxjs/Rx';

@Injectable()

export class RecipeService {

    SERVER_URL: string = "http://localhost:4200/api/";
    constructor(private httpClient: HttpClient) { }

    public getRecipes() {
        return this.httpClient.get(`${this.SERVER_URL + 'recipes'}`);
    }

    public getRecipe(recipeId) {
        return this.httpClient.get(`${this.SERVER_URL + 'recipes'}/${recipeId}`);
    }
    public createRecipe(recipe: { name: string, source: string, preparationTime: any, preparationInstruction: any }) {
        return this.httpClient.post(`${this.SERVER_URL + 'recipes'}`, recipe)
    }

    public deleteRecipe(recipeId) {
        return this.httpClient.delete(`${this.SERVER_URL + 'recipes'}/${recipeId}`)
    }
    public updatePolicy(policy: { id: number, amount: number, clientId: number, userId: number, description: string }) {
        return this.httpClient.put(`${this.SERVER_URL + 'policies'}/${policy.id}`, policy)
    }

    public getIngridients() {
        return this.httpClient.get(`${this.SERVER_URL + 'ingridients'}`);
    }
    public createRecipeIngridients(recipeIngridients: { nameOfIngridient: string, quantity: number, Fk_Recipe: number }) {
        return this.httpClient.post(`${this.SERVER_URL + 'recipeIngridients'}`, recipeIngridients)
    }
    public getRecipeIngridients() {
        return this.httpClient.get(`${this.SERVER_URL + 'recipeIngridients'}`);
    }
}