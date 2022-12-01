import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarDto } from './car.dto';
import { CarService } from './car.service';
import { CARS } from './cars.mock';


describe('CarController', () => {
  let controller: CarController;
  const cars=CARS;
  const mockCarService={
    postCar:jest.fn(dto=>{
      return dto;
    }),
    getCarById:jest.fn(id=>{
      const car=cars.find((car)=>car.id===id)
            if(car){
               return "successful";
            }
            else{
              return "fail";
            }
    })
    

  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarController],
      providers:[CarService]
    })
    .overrideProvider(CarService)
    .useValue(mockCarService)
    .compile();

    controller = module.get<CarController>(CarController);
  });

  
  it('should be defined', async() => {
    const dto={"id":101,"brand":"audi","color":"green","model":"x"};
    expect(await controller.postCar(dto)).toEqual(dto);
     expect( mockCarService.postCar).toHaveBeenCalledWith(dto);
     expect( mockCarService.postCar).toHaveBeenCalledTimes(1);
    
  });
  it('getById ',async()=>{
     expect(await controller.getCarById(100)).toEqual("successful") 
  })
});
