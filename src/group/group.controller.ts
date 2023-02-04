import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserGroupDto } from "src/group/dto/user-to-group.dto";

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Post('add-user')
  addUserToGroup(@Body() dto: UserGroupDto) {

    return this.groupService.addUserToGroup(dto);
  }

  @Get(':id/get-users')
  getUserGroups(@Param('id') id: string) {
    return this.groupService.getGroupUsers(+id);
  }

  // @Get(':id/get-groups')
  // getGroupUsers(@Param('id') id: string) {
  //
  //   return this.groupService.getUserGroups(id);
  // }



  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
