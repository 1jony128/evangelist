import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "src/roles/roles.model";
import { CreateRoleDto } from "src/roles/dto/create-role.dto";
import { Group } from "src/group/entities/group.model";
import { UserGroupDto } from "src/group/dto/user-to-group.dto";
import { RolesService } from "src/roles/roles.service";
import { UsersService } from "src/users/users.service";
import { UserGroupService } from "src/group/user-groups.service";

@Injectable()
export class GroupService {


  constructor(@InjectModel(Group) private groupRepository: typeof Group,
              private userService: UsersService, private userGroupService: UserGroupService) {}

  async create(dto: CreateGroupDto) {
    try{
      const group = await this.groupRepository.create(dto);
      return group;
    } catch (e) {
      console.log(e)
    }

  }

  async getByValue(name: string) {
    const group = await this.groupRepository.findOne({where: {name}})
    return group;
  }

  async addUserToGroup(dto: UserGroupDto) {
    const group = await this.groupRepository.findByPk(dto.groupId);
    const user = await this.userService.getUserById(dto.userId);

    const groups = await this.userGroupService.findAllByGroupId(group.id)

    if (group && user) {
      await group.$add('user', user.id);
      return groups;
    }
    throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
  }

  async getUserGroups(userId: string) {
    const user = await this.userService.getUserById(userId);

    const groups = await this.userGroupService.findAllByUserId(user.id)

    if (groups) {
      return groups;
    }
    throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
  }

  async getGroupUsers(groupId: number) {
    try{
      const group = await this.groupRepository.findByPk(groupId);

      const users = await this.userGroupService.findAllByGroupId(groupId)

      if (users) {
        return users;
      }
      throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
    } catch (e){
      console.log(e)
      throw new HttpException(e, HttpStatus.NOT_FOUND);
    }
  }



  async findAll() {
    const group = await this.groupRepository.findAll({
      attributes: ['id', 'name'],
      include: {all: true}
    });

    return group;
  }

  async findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  async remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
