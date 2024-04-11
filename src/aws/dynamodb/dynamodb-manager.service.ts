import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { DynamoDB } from 'aws-sdk';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

@Injectable()
export class DynamoDBManagerService {
  constructor(@InjectAwsService(DynamoDB) private readonly dynamo: DynamoDB) {}

  async findMany(tableName: string) {
    const response = await this.dynamo.scan({ TableName: tableName }).promise();
    if (response.Items) {
      return response.Items?.map((item: any) => unmarshall(item)) ?? [];
    }
    throw new NotFoundException('Fail to load items!');
  }

  async findOneById(tableName, id: string) {
    const key = { id: { S: id } };
    const response = await this.dynamo
      .getItem({ TableName: tableName, Key: key })
      .promise();
    if (response.Item) {
      return unmarshall((response as any).Item);
    }
    throw new NotFoundException('Item Not Found!');
  }

  async insertOne(tableName, itemObj: unknown) {
    const item = marshall(itemObj, { convertClassInstanceToMap: true });
    const response = await this.dynamo
      .putItem({ TableName: tableName, Item: item })
      .promise();
    return response;
  }

  async updateOneById(
    tableName,
    id: string,
    changes: any,
    createIfExist = false,
  ) {
    delete changes.id;
    const key = { id: { S: id } };
    const params: DynamoDB.Types.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      ...this.generateUpdateParams(changes),
    };
    params.ConditionExpression = !createIfExist
      ? 'attribute_exists(id)'
      : undefined;
    return await this.dynamo.updateItem(params).promise();
  }

  generateUpdateParams(changes: { [key: string]: any }) {
    let updateExpression = 'SET ';
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};

    Object.keys(changes).forEach((key, index) => {
      const attributeName = `#attr${index}`;
      updateExpression += `${
        index > 0 ? ', ' : ''
      }${attributeName} = :val${index}`;
      expressionAttributeValues[`:val${index}`] = {
        [typeof changes[key] === 'string' ? 'S' : 'N']: changes[key].toString(),
      };
      expressionAttributeNames[attributeName] = key;
    });

    return {
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
    };
  }
}
