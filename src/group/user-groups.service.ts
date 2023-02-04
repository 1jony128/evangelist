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
import { UserGroups } from "src/group/entities/user-groups.model";
import { User } from "src/users/users.model";

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
        where: { groupId }
      });
      if(group){
        return group;
      }
    }catch (e){
      console.log("nnnnnn")
      console.log(e)
      throw new HttpException('В этой группе нет пользователей', HttpStatus.NOT_FOUND);
    }




  }

  async findAllByUserId(userId: number) {
    const user = await this.userGroupRepository.findAll({
      where: { userId }
    });

    if(user){
      return user;
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
