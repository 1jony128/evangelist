import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus, Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateEvaEventDto } from "eva-event/dto/create-eva-event.dto";
import { EvaEventService } from "eva-event/eva-event.service";
import { FindByIdEvaEventDto } from "eva-event/dto/find-by-id-eva-event.dto";
import { FindByGroupIdEvaEventDto } from "eva-event/dto/find-group-id-eva-event.dto";
import { UpdateGroupDto } from "group/dto/update-group.dto";
import { UpdateEvaEventDto } from "eva-event/dto/update-eva-event.dto";

@Controller('eva-event')
export class EvaEventController {
  constructor(private evaEventService: EvaEventService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createEvaEvent(@Body() dto: CreateEvaEventDto) {
    return this.evaEventService.create(dto)
  }

  @Get()
  getAllEvaEvent() {
    return this.evaEventService.getAllEvaEvent()
  }

  @Post('/get-by-id')
  @HttpCode(HttpStatus.OK)
  getEvaEventByUserId(@Body() dto: FindByIdEvaEventDto) {
    return this.evaEventService.getByUserId(dto)
  }

  @Post('/get-group-by-id')
  @HttpCode(HttpStatus.OK)
  getEvaEventByGroupId(@Body() dto: FindByGroupIdEvaEventDto) {
    return this.evaEventService.getByGroupId(dto)
  }

  @Patch(':id')
  update(@Param() params, @Body() updateEvaEventDto: UpdateEvaEventDto) {
    return this.evaEventService.update(params.id, updateEvaEventDto);
  }

}


