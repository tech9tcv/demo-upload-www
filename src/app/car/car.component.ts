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
  modalHeading: string = 'Add Car';
  cars: Array<Car> = [];
  mode = 'create';

  constructor(protected carService: CarService) { 

  }

  ngOnInit() {
    this.listCars();
  }

  showAddModal() {
    this.modalHeading = 'add car';
    this.mode = 'create';
    this.car = new Car(undefined, '', '', undefined);
  }

  showUpdateModal(car: Car) {
    console.log(car);
    this.modalHeading = 'update car';
    this.mode = 'update';
    this.car = car;
  }

  showDeleteModal(car: Car) {
    this.modalHeading = 'delete car';
    this.mode = 'delete';
    this.car = car;
  }

  submit() {
    if (this.mode === 'create') {
      this.create();
    } else if (this.mode === 'update') {
      this.update();
    } else if (this.mode === 'delete') {
      this.delete();
    }
  }

  create() {
    this.carService.createCar(this.car).subscribe(
      data => {
        console.log(data);
        if(data.result === 'good') {
          this.car = new Car(undefined, '', '', undefined);
          this.listCars();
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  private listCars() {
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

  update() {
    this.carService.updateCar(this.car).subscribe(
      data => {
        console.log(data);
        if(data.result === 'good') {
          this.car = undefined;
          this.listCars();
        }
      },
      error => {
        console.error(error);
      }
    )
  }

  delete() {
    this.carService.delete(this.car.id).subscribe(
      data => {
        console.log(data);
        this.car = undefined;
        this.listCars();
      },
      error => {
        console.error(error);
      }
    )
  }

}
