import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private catRepo: Repository<Category>,
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    const cat = this.catRepo.create(createCategoryInput);
    return await this.catRepo.save(cat);
  }

  async findAll() {
    const catigories = await this.catRepo.find();
    return catigories;
  }

  async findOne(id: number) {
    const cat = await this.catRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('No catigories found!');

    return cat;
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    const cat = await this.catRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('No catigories found!');

    Object.assign(cat, updateCategoryInput);
    return await this.catRepo.save(cat);
  }

  async remove(id: number) {
    const cat = await this.catRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('No catigories found!');
    return await this.catRepo.delete(id);
  }
}
