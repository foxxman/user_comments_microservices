import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { IGetFileDTO, UsersExceptions } from 'common';
import { Client } from 'minio';
import { Readable } from 'stream';

import { AuthService } from '@modules/auth/auth.service';

import {
  generateFileLink,
  getFileExtension,
  getFileNameForStorage,
} from '@utils/files';

@Injectable()
export class FilesService {
  private readonly minioClient: Client;
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: configService.get<string>('minio.endpoint'),
      port: configService.get<number>('minio.port') || 9000,
      useSSL: false,
      accessKey: configService.get<string>('minio.accessKey') || 'minioadmin',
      secretKey: configService.get<string>('minio.secretKey') || 'minioadmin',
    });
  }

  async uploadFile({
    filename,
    buffer,
  }: {
    filename: string;
    buffer: Buffer;
  }): Promise<{ fileUrl: string }> {
    this.logger.log({
      context: 'uploadFile',
      filename,
    });

    const bucketName = 'avatars';
    await this.createBucketIfNotExists({ bucketName });
    const storageFileName = getFileNameForStorage(filename);

    this.logger.log({
      context: 'uploadFile',
      storageFileName,
    });

    await this.minioClient.putObject(bucketName, storageFileName, buffer);
    const baseUrl = this.configService.get<string>('apiUrl');

    const fileUrl = generateFileLink({
      baseUrl,
      fileName: storageFileName,
      bucketName,
    });

    this.logger.log({
      context: 'uploadFile',
      baseUrl,
      fileUrl,
    });

    return { fileUrl };
  }

  async getFile({
    bucketName,
    fileName,
  }: IGetFileDTO): Promise<{ buffer: Buffer; mimetype: string }> {
    try {
      const stream = await this.minioClient.getObject(bucketName, fileName);

      const fileExtension = getFileExtension(fileName);

      const buffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
      });
      return {
        mimetype: `image/${fileExtension}`,
        buffer,
      };
    } catch (error) {
      throw new RpcException(UsersExceptions.AvatarNotFound);
    }
  }

  private async createBucketIfNotExists({
    bucketName,
  }: {
    bucketName: string;
  }): Promise<void> {
    const bucketExists = await this.minioClient.bucketExists(bucketName);

    this.logger.log({
      message: 'Bucket exists',
      bucketName,
      bucketExists,
    });

    if (!bucketExists) {
      await this.minioClient.makeBucket(bucketName, 'us-east-1');
    }
  }
}
