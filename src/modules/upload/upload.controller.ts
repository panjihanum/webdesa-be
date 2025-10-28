import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ConfigService } from '@nestjs/config';
import type { Express } from 'express';
import { JwtStrategy } from '../auth/jwt.strategy';

@Controller('upload')
export class UploadController {
  constructor(private readonly config: ConfigService) {}

  @Post('image')
  @UseGuards(JwtStrategy)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/public',
        filename: (_, file, cb) => {
          const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, unique + extname(file.originalname));
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          cb(new BadRequestException('Only image files are allowed!'), false);
        } else cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    const baseUrl =
      this.config.get<string>('APP_URL') || 'http://localhost:3000';
    const uploadPath =
      this.config.get<string>('UPLOAD_PATH') || 'uploads/public';

    const url = `${baseUrl}/${uploadPath}/${file.filename}`;

    return {
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        url,
      },
    };
  }
}
