import { IsOptional, IsString } from 'class-validator';

export class UpdateUrlDto {
  @IsString()
  @IsOptional()
  name: string;
}

export default UpdateUrlDto;
