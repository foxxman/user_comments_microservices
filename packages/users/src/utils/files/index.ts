import * as path from 'path';
import { MEDIA_URL } from 'common';
import { randomUUID } from 'crypto';

export const getFileNameForStorage = (filename: string): string => {
  const extension = getFileExtension(filename);
  return `${Date.now()}-${randomUUID()}.${extension}`;
};

export const getFileExtension = (filename: string): string =>
  path.extname(filename).replace('.', '');

export const generateFileLink = ({
  baseUrl,
  fileName,
  bucketName,
}: {
  baseUrl: string;
  fileName: string;
  bucketName: string;
}): string => {
  const url = new URL(MEDIA_URL, baseUrl);
  url.pathname += `/${bucketName}/${fileName}`;
  return url.href;
};
