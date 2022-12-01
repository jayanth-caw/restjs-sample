import { Injectable,HttpException} from '@nestjs/common';
import { resolve } from 'path';
import { CARS } from './cars.mock';
@Injectable()
export class CarService {
    private cars=CARS;
    public async getCars(){
        return this.cars;
    }
    public async postCar(car) :Promise<any>{
         this.cars.push(car) ;
         return car;
    }
    public async getCarById(id:number):Promise<any>{
        const carId=Number(id);
        return new Promise((resolve)=>{
            const car=this.cars.find((car)=>car.id===carId)
            if(!car){
               throw new HttpException('not found',404);
            }
        
        
        return resolve(car);})
    }
    public async putCarById(id:number,propertyName:string,propertyValue:string):Promise<any>{
        const carId=Number(id);
        return new Promise((resolve)=>{
        const car=this.cars.findIndex((car)=>car.id===carId)
        if(car===-1){
           throw new HttpException('not found',404);
        }
        this.cars[car][propertyName]=propertyValue
        return resolve(this.cars[car]);})
    }
    public async deleteCarById(id:number):Promise<any>{
        const carId=Number(id);
        return new Promise((resolve)=>{
        const car=this.cars.findIndex((car)=>car.id===carId)
        if(car===-1){
           throw new HttpException('not found',404);
        }
        this.cars.splice(car,1)
        return resolve(this.cars);})
    }
    
}
