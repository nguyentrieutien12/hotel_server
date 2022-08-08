import { storage } from './../config/multer.config';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Observable } from 'rxjs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files', 300, { storage }))
  async file(@UploadedFiles() files) {
    return files;
  }

  // @Get('/image/:id')
  // async handleGetImages(@Param('id') id, @Res() res) {
  //   return res.sendFile(join(process.cwd(), '/uploads/' + id));
  // }
}
