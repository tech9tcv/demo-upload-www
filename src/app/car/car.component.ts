import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  car = new Car(undefined, '', '', undefined);
  cars: Array<Car> = [];

  constructor(protected carService: CarService) { 

  }

  ngOnInit() {
    this.getCars();
  }

  private getCars() {
    this.cars = [];
    this.carService.getCars().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          let car = new Car(data[i].id, data[i].make, data[i].model, data[i].year);
          this.cars.push(car);
        }
        console.log(this.cars);
      },
      error => {
        console.error(error);
      }
    )
  }

  submit() {
    console.log('submit');
    console.log(JSON.stringify(this.car));
    this.carService.createCar(this.car).subscribe(
      data => {
        console.log(data);
        if(data.result === 'good') {
          this.car = new Car(undefined, '', '', undefined);
          this.getCars();
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  delete(id: number) {
    console.log(id);
    this.carService.delete(id).subscribe(
      data => {
        console.log(data);
        this.getCars();
      },
      error => {
        console.error(error);
      }
    )
  }

  update(car: Car) {
    console.log(car);
  }

}
