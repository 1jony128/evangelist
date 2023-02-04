import { Body, Controller, Get, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateEvaEventDto } from "src/eva-event/dto/create-eva-event.dto";
import { EvaEventService } from "src/eva-event/eva-event.service";
import { FindByIdEvaEventDto } from "src/eva-event/dto/find-by-id-eva-event.dto";

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
}


