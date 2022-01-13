import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from 'src/app/models/dish';
import { Observer } from 'src/app/models/observer';
import { Rate } from 'src/app/models/rate';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent implements OnInit {

  @Input() dish!: Dish;
  rateForm: FormGroup
  

  constructor(private formBuilder: FormBuilder, private rateService: RateService) { 
    this.rateForm = this.formBuilder.group({
      nick: ['', [
        Validators.required
      ]],
      name: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500)
      ]],
      date: '',
    })
    
  }
  ngOnInit(): void {
  }

  onSubmit(rate: Rate){
    this.rateService.addRate(this.dish, rate);
    this.rateForm.reset();
  }
  get nick(){
    return this.rateForm.get('nick');
  }
  get name(){
    return this.rateForm.get('name');
  }
  get description(){
    return this.rateForm.get('description');
  }
  get date(){
    return this.rateForm.get('date');
  }
}
