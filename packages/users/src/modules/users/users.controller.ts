import { Controller, Inject, forwardRef } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ICreateUserDTO,
  IGetFileResponse,
  IGetUserByIdDTO,
  ILoginDTO,
  ILoginResponse,
  IRefreshDTO,
  IRefreshResponse,
  IUserResponse,
} from 'common';
import { IGetFileDTO, IUpdateAvatarDTO } from 'common/types/dtos/users';

import { AuthService } from '@modules/auth/auth.service';
import { TokenService } from '@modules/auth/token.service';
import { FilesService } from '@modules/files/files.service';

import { userEntityToDto } from './toDTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly fileService: FilesService,
  ) {}

  @GrpcMethod('UsersService')
  async createUser(data: ICreateUserDTO): Promise<ILoginResponse> {
    const user = await this.usersService.createUser(data);
    const tokenPair = await this.tokenService.generateTokenPair(user);

    return { user: userEntityToDto(user), tokenPair };
  }

  @GrpcMethod('UsersService')
  async loginWithUsernameAndPassword(data: ILoginDTO): Promise<ILoginResponse> {
    const user = await this.authService.checkUsernameAndPassword(data);
    const tokenPair = await this.tokenService.generateTokenPair(user);

    return { user: userEntityToDto(user), tokenPair };
  }

  @GrpcMethod('UsersService')
  async refreshAccessToken(data: IRefreshDTO): Promise<IRefreshResponse> {
    const { user, tokens } = await this.tokenService.refreshAccessToken(
      data.refresh,
    );
    return { user: userEntityToDto(user), tokens };
  }

  @GrpcMethod('UsersService')
  async getUserById(data: IGetUserByIdDTO): Promise<IUserResponse> {
    const user = await this.usersService.getUserById(data);
    return userEntityToDto(user);
  }

  @GrpcMethod('UsersService')
  async updateAvatar(data: IUpdateAvatarDTO): Promise<IUserResponse> {
    const { fileUrl } = await this.fileService.uploadFile({
      filename: data.filename,
      buffer: data.buffer,
    });

    const updatedUser = await this.usersService.updateAvatar({
      avatarUrl: fileUrl,
      userId: data.userId,
    });

    return userEntityToDto(updatedUser);
  }

  @GrpcMethod('UsersService')
  async getFile({
    fileName,
    bucketName,
  }: IGetFileDTO): Promise<IGetFileResponse> {
    const file = await this.fileService.getFile({ bucketName, fileName });
    return { fileData: file.buffer, fileType: file.mimetype };
  }
}
