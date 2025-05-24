import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { AuthRole } from './enum/auth-role.enum';

@Table({ tableName: 'users' })
export class AuthModel extends Model<AuthModel> {
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.ENUM(...Object.values(AuthRole)), defaultValue: AuthRole.ADMIN })
  role: AuthRole;
}
