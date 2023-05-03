import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserGroupDto } from "group/dto/user-to-group.dto";
import { RolesGuard } from "auth/roles.guard";

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

  @UseGuards(RolesGuard)
  @Get(':id/get-users')
  getGroupUsers(@Param() params): string  {
    // @ts-ignore
    return this.groupService.getGroupUsers(+params.id);
  }

  @Get(':id/get-groups')
  getUserGroups(@Param() params): string {
    // @ts-ignore
    return this.groupService.getUserGroups(params.id);
  }


  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  getOne(@Param() params): string {
    // @ts-ignore
    return this.groupService.findOne(+params.id);
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
