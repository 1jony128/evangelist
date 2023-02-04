import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EvaEvent } from "./eva_event.model";
import { CreateEvaEventDto } from "src/eva-event/dto/create-eva-event.dto";
import { FindByIdEvaEventDto } from "src/eva-event/dto/find-by-id-eva-event.dto";

@Injectable()
export class EvaEventService {
  constructor(@InjectModel(EvaEvent) private evaEventRepository: typeof EvaEvent) {
  }

  async create(dto: CreateEvaEventDto) {

    const evaEvent = await this.evaEventRepository.create({ ...dto });
    return evaEvent;
  }

  async getAllEvaEvent() {

    const evaEvent = await this.evaEventRepository.findAll({include: {all: true}});
    return evaEvent;
  }

  async getByUserId(userId: FindByIdEvaEventDto) {
    const evaEvent = await this.evaEventRepository.findAll({where: {...userId}, include: {all: true}});
    return evaEvent;
  }
}
