import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "roles/roles.model";
import { CreateRoleDto } from "roles/dto/create-role.dto";
import { Group } from "group/entities/group.model";
import { UserGroupDto } from "group/dto/user-to-group.dto";
import { RolesService } from "roles/roles.service";
import { UsersService } from "users/users.service";
import { UserGroupService } from "group/user-groups.service";

@Injectable()
export class GroupService {


  constructor(@InjectModel(Group) private groupRepository: typeof Group,
              private userService: UsersService,
              private userGroupService: UserGroupService) {}

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

  async getByAccessKey(access_key: string) {
    const group = await this.groupRepository.findOne({where: {access_key}})
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

  async getGroupUsers(groupId: number) {
    try{
      const group = await this.groupRepository.findByPk(groupId);

      const usersIds = await this.userGroupService.findAllByGroupId(group.id)

      const users = await this.userService.getAllUsersById(usersIds.map(item => item.userId));
      console.log(users)
      if (users) {
        return users;
      }
      throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
    } catch (e){
      console.log(e)
      throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
    }
  }

  async getUserGroups(userId: string) {
    try{
      const user = await this.userService.getUserById(userId);

      const groupsIds = await this.userGroupService.findAllByUserId(user.id)

      const ids = groupsIds.map(item => item.groupId)

      const groups = await this.groupRepository.findAll({
        attributes: ['id', 'name'],
        where: { id: ids },
      });

      if (groups) {
        return groups;
      }
      throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
    } catch (e){
      console.log(e)
      throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    const group = await this.groupRepository.findAll({
      attributes: ['id', 'name'],
      include: {all: true}
    });

    return group;
  }

  async getAllGroupsById(ids: number[]) {
    const group = await this.groupRepository.findAll({
      attributes: ['id', 'name'],
      where: { id: ids },
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
