import { Injectable } from '@nestjs/common';
import { DynamoDBManagerService } from 'src/aws/dynamodb/dynamodb-manager.service';
import { Tables } from 'src/common/constants/dynamodb.constant';

@Injectable()
export class AuthService {
  // constructor() {}
  // async findMany() {
  //   await this.dynamo.updateOneById(
  //     Tables.URLS,
  //     'bd3af709-24d0-4827-a0e1-oooddodd',
  //     { long: 'koko', short: 'dddddd' },
  //     true,
  //   );
  //   return this.dynamo.findMany(Tables.URLS);
  // }
}

