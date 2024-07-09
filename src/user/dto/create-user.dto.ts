import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Không được để trống' })
  name: string;
  
  @IsNotEmpty({ message: 'Không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Không được để trống' })
  password: string;

  @IsNotEmpty({ message: 'Không được để trống' })
  @IsInt({ message: 'Vui lòng ghi số tuổi' })
  age: number;

  info: string;
}
