import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('RefreshToken')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  pairId: string;

  @Column()
  userId: string;

  @Column()
  token: string;
}
