export class AddRecipeModel{
    Id: number;
    Name: string;
    Source: string;
    //Ingridients: string[];
    PreparationHours: any;
    PreparationMinutes: any;
    PreparationInstructions: any;

}

export class IngridientsModel{
    Name: string;
    Quantity: number;
    Fk_Recipe: number;
}