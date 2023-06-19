import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AccessKey } from "access-key/entities/access-key.model";
import { v4 as uuidv4 } from "uuid";
@Injectable()
export class AccessKeyService {
  constructor(
    @InjectModel(AccessKey) private evaEventRepository: typeof AccessKey
  ) {}
  async generateAccessKey(groupId: number): Promise<string> {
    // Генерация уникального ключа доступа
    const key = uuidv4();

    // Создание записи в базе данных
    await this.evaEventRepository.create({ key, groupId });

    return key;
  }

  async getAccessKey(groupId: number): Promise<{ key: string }> {
    // Создание записи в базе данных
    const accessKey = await this.evaEventRepository.findOne({
      where: { groupId },
    });

    return { key: accessKey.key };
  }

  async destroyAccessKey(accessKey: AccessKey): Promise<boolean> {
    try {
      await accessKey.destroy();
      return true;
    } catch (e) {
      return false;
    }
  }

  async getGroupByAccessKey(key: string): Promise<{ accessKey: AccessKey }> {
    // Найти ключ доступа в базе данных
    const accessKey = await this.evaEventRepository.findOne({
      where: { key },
    });

    if (!accessKey) {
      throw new HttpException("Не верный ключ доступа", HttpStatus.BAD_REQUEST);
    }

    return { accessKey };
  }
}
