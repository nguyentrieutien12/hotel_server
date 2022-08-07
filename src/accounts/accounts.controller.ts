import { storage } from './../config/multer.config';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AuthService } from './../auth/auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Inject,
  forwardRef,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UploadedFiles,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  @Post()
  // @UseInterceptors(FilesInterceptor('files', 300, { storage }))
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createAccountDto: CreateAccountDto,
    // @UploadedFiles() files,
  ) {
    console.log(createAccountDto);
    return await this.accountsService.create(createAccountDto);
  }
  @Get()
  async findAll() {
    return await this.accountsService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    console.log('123');

    return await this.accountsService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return {
      ...result,
      statusCode: HttpStatus.ACCEPTED,
      message: 'Login Successfully!!',
    };
  }

  //   @Post('/profile/:id')
  //   @Roles(Role.ADMIN)
  //   getProfile(@Request() req) {
  //     console.log('hehe');
  //   }
}
