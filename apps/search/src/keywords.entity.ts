import { repositories } from '@lib';
import { Entity, Column, PrimaryGeneratedColumn, DataSource } from 'typeorm';

@Entity()
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  terms: string[];
}

export const keywordEntityProvider: any = [
  {
    provide: repositories.KEYWORD_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(KeywordEntity),
    inject: ['DATA_SOURCE'],
  },
];
