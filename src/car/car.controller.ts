import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CarDto } from './car.dto';
import {CarService} from './car.service'
@Controller('car')
export class CarController {
    constructor (private carService:CarService){}
    @Get()
    async getCars(){
         return this.carService.getCars();
    }
    @Post()
    async postCar(@Body() car:CarDto) {
         return this.carService.postCar(car);
        //return "success";
    }
    @Get(':id')
    async getCarById(@Param('id') id:number ){
        return this.carService.getCarById(id);
    }
    @Put(':id')
    async putCarById(@Param('id') id:number,@Query() query){
        const propertyName=query.propertyName;
        const propertyValue=query.propertyValue;
        return this.carService.putCarById(id,propertyName,propertyValue)
    }
    @Delete(':id')
    async deleteCarById(@Param('id') id:number ){
          return this.carService.deleteCarById(id);
    }
}
