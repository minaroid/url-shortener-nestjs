import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  @IsNotEmpty()
  long: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateUrlDto;
