import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { SpeciesService } from "./species.service";
import { CreateSpeciesDTO, SpeciesQueryDTO, UpdateSpeciesDTO } from "./dto/species.dto";

@Controller('species')
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

    @Get()
    findAll(@Query() {q, sortField, sortOrder}: SpeciesQueryDTO) {
        return this.speciesService.findAll(q, sortField, sortOrder);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.speciesService.findOne(id);
    }

    @Get(':id/monkeys')
    findMonkeysBySpecies(@Param('id', ParseIntPipe) id: number) {
        return this.speciesService.findMonkeysBySpecies(id);
    }

    @Post()
    create(@Body() dto: CreateSpeciesDTO) {
        return this.speciesService.create(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.speciesService.remove(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateSpeciesDTO) {
        return this.speciesService.update(id, body);
    }
}
