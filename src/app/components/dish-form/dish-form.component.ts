import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/dish';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  showForm:boolean = false;
  dishForm: FormGroup;

  @Output() dishEvent = new EventEmitter<Dish>();

  constructor(private formBuilder: FormBuilder, private menuService: MenuService) { 
    this.dishForm = this.formBuilder.group({
      name: ['',[
        Validators.required,
      ]],
      type: ['',[
        Validators.required,
      ]],
      category: ['',[
        Validators.required,
      ]],
      ingredients: ['',[
        Validators.required,
        Validators.pattern('^[a-z]+(,[a-z]+)*$')
      ]],
      maxPositions: ['',[
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(0),
        Validators.max(50),
      ]],
      price: ['',[
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)')
      ]],
      description: ['',[
        Validators.required,
      ]],
      images: ['',[
        Validators.required,
        // Validators.pattern('(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]')
        // mozna wprowadzic kilka linkow po przecinku
        Validators.pattern('^(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+(,(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]+)*$')
      ]],
    });
  }

  ngOnInit(): void {
  }
  onSubmit(form: FormGroup){
    let dish = {
      "name" : form.value.name,
      "type" : form.value.type,
      "category" : form.value.category,
      "ingredients" : form.value.ingredients.split(','),
      "maxPositions" : form.value.maxPositions,
      "price" : form.value.price,
      "description" : form.value.description,
      "images" : form.value.images.split(','),
      "basketQuantity" : 0,
      "rates" : [],
    }
    this.menuService.addDish(dish);
    this.dishForm.reset();
  }
  getFormValidationErrors() {
    Object.keys(this.dishForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.dishForm.get(key)!.errors!;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  get name(){return this.dishForm.get('name')}
  get type(){return this.dishForm.get('type')}
  get category(){return this.dishForm.get('category')}
  get ingredients(){return this.dishForm.get('ingredients')}
  get maxPositions(){return this.dishForm.get('maxPositions')}
  get price(){return this.dishForm.get('price')}
  get description(){return this.dishForm.get('description')}
  get images(){return this.dishForm.get('images')}

}
