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
    return this.custRepo.findOne({where:{id}});
  }

  async update(id: number, createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    if(!customer)  throw new HttpException("Customer Not Found", HttpStatus.BAD_REQUEST);
    await this.custRepo.update(id, createCustomerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<any> {
    const delCust = this.custRepo.delete(id);
    if(delCust) return "Delete Successfully";
    throw new HttpException("Something Went Wrong",HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
