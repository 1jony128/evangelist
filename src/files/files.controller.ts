import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('static')
export class StaticController {
  @Get(':fileName')
  async serveFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = path.resolve(__dirname, '..', 'static', fileName);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  }
}
