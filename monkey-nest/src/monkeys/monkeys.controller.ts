import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { MonkeysService } from "./monkeys.service";
import { CreateMonkeyDTO, UpdateMonkeyDTO } from "./dto/monkey.dto";

@Controller('monkeys')
export class MonkeysController {

    constructor(private readonly monkeysService: MonkeysService) {

    }

    @Get()
    findAll() {
        return this.monkeysService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.monkeysService.findOne(id);
    }
    
    @Post()
    create(@Body() createMonkeyDto: CreateMonkeyDTO) {
        return this.monkeysService.create(createMonkeyDto);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMonkeyDTO) {
        return this.monkeysService.update(id, body);
    }



}
