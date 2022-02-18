import { ApiProperty } from '@nestjs/swagger';

export class Weight {
  @ApiProperty({ type: 'integer', format: 'int64' })
  value: number;

  @ApiProperty({ type: 'string' })
  unit: string;
}
