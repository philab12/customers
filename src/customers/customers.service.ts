import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  
  constructor(@InjectRepository(Customer) private readonly custRepo:Repository<Customer>){}


  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
   // Check If Customer Already Exist
    const cust_exist = await this.custRepo.findOne({where:{name: createCustomerDto.name, industry:createCustomerDto.industry}});
    if(cust_exist) throw new HttpException("Customer Already Exist", HttpStatus.CONTINUE);
    //If Not Then Insert Into DB
    const newCustomer = this.custRepo.create(createCustomerDto);
    return this.custRepo.save(newCustomer);
  }

  async findAll(): Promise<Customer[]> {
    return this.custRepo.find();
  }


  async findOne(id: number): Promise<Customer> {
    const cust = this.custRepo.findOne({where:{id}});
    if(!cust) throw new HttpException("Customer Not Found", HttpStatus.NOT_FOUND);
    return cust;
  }

  async update(id: number, createCustomerDto: CreateCustomerDto): Promise<Customer> {
    //Checks if customer exist using the findOne method
     await this.findOne(id);
    await this.custRepo.update(id, createCustomerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const delCust = this.custRepo.delete(id);
    if(delCust) return "Delete Successfully";
    throw new HttpException("Something Went Wrong",HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
