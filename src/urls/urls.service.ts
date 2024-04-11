import { Injectable } from '@nestjs/common';
import { DynamoDBManagerService } from 'src/aws/dynamodb/dynamodb-manager.service';
import { Tables } from 'src/common/constants/dynamodb.constant';
import CreateUrlDto from './dto/create-url.dto';
import ShortUniqueId from 'short-unique-id';
import { v4 as uuidv4 } from 'uuid';
import UpdateUrlDto from './dto/update-url.dto';
import { S3ManagerService } from 'src/aws/s3/s3-manager.service';
import { VARIABLES } from 'src/config/env.variables';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRCode = require('qrcode');

@Injectable()
export class UrlsService {
  constructor(
    private readonly dynamo: DynamoDBManagerService,
    private readonly s3: S3ManagerService,
  ) {}

  async createOne(createUrlDto: CreateUrlDto) {
    const url = {
      id: uuidv4(),
      long: createUrlDto.long,
      name: createUrlDto.name,
      short: new ShortUniqueId({ length: 10 }).rnd(),
      qrcode: undefined,
    };
    url.short = new ShortUniqueId({ length: 10 }).rnd();

    const qrOptions = {
      width: 200,
      height: 200,
      type: 'png',
    };

    const qrImage = await QRCode.toBuffer(
      `${VARIABLES.BASE_URL}/${url.short}`,
      qrOptions,
    );
    const params = {
      Bucket: VARIABLES.S3_PUBLIC_BUCKET_NAME,
      Key: `${url.id}.png`,
      Body: qrImage,
      ContentType: 'image/png',
    };
    const uploadResponse = await this.s3.upload(params);
    url.qrcode = uploadResponse.Location;
    await this.dynamo.insertOne(Tables.URLS, url);
    return this.dynamo.findOneById(Tables.URLS, url.id);
  }

  async findOne(id: string) {
    return this.dynamo.findOneById(Tables.URLS, id);
  }

  async updateOne(id: string, updateUrlDto: UpdateUrlDto) {
    const url: any = await this.dynamo.findOneById(Tables.URLS, id);
    url.name = updateUrlDto.name ?? url.name;
    await this.dynamo.updateOneById(Tables.URLS, id, url);
    return this.dynamo.findOneById(Tables.URLS, id);
  }

  async findMany() {
    return this.dynamo.findMany(Tables.URLS);
  }
}
