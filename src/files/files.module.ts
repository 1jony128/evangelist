import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { StaticController } from "./files.controller";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  // controllers: [StaticController]
})
export class FilesModule {}
