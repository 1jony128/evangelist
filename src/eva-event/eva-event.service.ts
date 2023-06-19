import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { EvaEvent } from "./eva_event.model";
import { CreateEvaEventDto } from "eva-event/dto/create-eva-event.dto";
import { FindByIdEvaEventDto } from "eva-event/dto/find-by-id-eva-event.dto";
import { FindByGroupIdEvaEventDto } from "eva-event/dto/find-group-id-eva-event.dto";
import { UpdateGroupDto } from "group/dto/update-group.dto";
import { UpdateEvaEventDto } from "eva-event/dto/update-eva-event.dto";

@Injectable()
export class EvaEventService {
  constructor(
    @InjectModel(EvaEvent) private evaEventRepository: typeof EvaEvent
  ) {}

  async create(dto: CreateEvaEventDto) {
    const alreadyEvaEvent = await this.evaEventRepository.findAll({
      where: { geo_lon: dto.geo_lon, geo_lat: dto.geo_lat },
      include: { all: true },
    });
    console.log(alreadyEvaEvent);
    if (alreadyEvaEvent.length) {
      throw new HttpException("Адрес уже был заполнен", HttpStatus.NOT_FOUND);
    }
    const evaEvent = await this.evaEventRepository.create({ ...dto });
    return evaEvent;
  }

  async getAllEvaEvent() {
    const evaEvent = await this.evaEventRepository.findAll({
      include: { all: true },
    });
    return evaEvent;
  }

  async getByUserId(userId: FindByIdEvaEventDto) {
    const evaEvent = await this.evaEventRepository.findAll({
      where: { ...userId },
      include: { all: true },
    });
    return evaEvent;
  }

  async getByGroupId(groupId: FindByGroupIdEvaEventDto) {
    //  const evaEvent = await this.evaEventRepository.findAll({where: {...groupId}, include: {all: true}});
    //  return evaEvent;
  }

  async update(id: number, updateEvaEventDto: UpdateEvaEventDto) {
    console.log("ssss");
    const evaEvent = await this.evaEventRepository.findByPk(id);
    if (!evaEvent) {
      throw new NotFoundException(`Данные не найдены`);
    }
    await evaEvent.update(updateEvaEventDto);
    return evaEvent;
  }
}
