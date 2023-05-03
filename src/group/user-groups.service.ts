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
import { UserGroups } from "group/entities/user-groups.model";
import { User } from "users/users.model";

@Injectable()
export class UserGroupService {


  constructor(@InjectModel(UserGroups) private userGroupRepository: typeof UserGroups,
              private userService: UsersService) {}

  // async create(dto: CreateGroupDto) {
  //   try{
  //     const group = await this.groupRepository.create(dto);
  //     return group;
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  // }
  //
  // async getByValue(name: string) {
  //   const group = await this.groupRepository.findOne({where: {name}})
  //   return group;
  // }
  //
  // async addUserToGroup(dto: UserGroupDto) {
  //   const group = await this.groupRepository.findByPk(dto.groupId);
  //   const user = await this.userService.getUserById(dto.userId);
  //
  //   if (group && user) {
  //     await group.$add('user', user.id);
  //     return dto;
  //   }
  //   throw new HttpException('Пользователь или группа не найдены', HttpStatus.NOT_FOUND);
  // }
  //
  //
  async findAllByGroupId(groupId: number) {
    try{
      const group = await this.userGroupRepository.findAll({
        attributes: ['userId'],
        where: { groupId }
      });
      if(group){
        return group;
      }
    }catch (e){
      throw new HttpException('В этой группе нет пользователей', HttpStatus.NOT_FOUND);
    }




  }

  async findAllByUserId(userId: number) {
    const groups = await this.userGroupRepository.findAll({
      attributes: ['groupId'],
      where: { userId }
    });

    if(groups){
      return groups;
    }

    throw new HttpException('Пользователь не принадлежит ни одной группе', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    return await this.userGroupRepository.findAll({include: {all: true}});
  }
  //
  // async findOne(id: number) {
  //   return `This action returns a #${id} group`;
  // }
  //
  // async update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }
  //
  // async remove(id: number) {
  //   return `This action removes a #${id} group`;
  // }
}
