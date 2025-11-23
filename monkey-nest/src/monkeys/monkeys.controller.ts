import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { MonkeysService } from "./monkeys.service";
import { CreateMonkeyDTO, MonkeyQueryDTO, UpdateMonkeyDTO } from "./dto/monkey.dto";

@Controller('monkeys')
export class MonkeysController {

    constructor(private readonly monkeysService: MonkeysService) {

    }

    @Get()
    findAll(@Query() {q, sortField, sortOrder}: MonkeyQueryDTO) {
        return this.monkeysService.findAll(q, sortField, sortOrder);
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
