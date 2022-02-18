import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  source: string;

  constructor(json: Map<string, any>) {
    this.source = json['src'];
  }
}
