import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  info: string;

  @Column({ length: 64, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;
}
