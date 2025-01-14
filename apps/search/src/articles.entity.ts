import { repositories } from '@lib';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { KeywordEntity } from './keywords.entity';

export enum ArticleType {
  AUDIO = 'audio',
  VIDEO = 'video',
  FILE = 'file',
  TEXT = 'text',
}

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ArticleType,
  })
  type: ArticleType;

  @Column({
    type: 'jsonb', // or 'json' if preferred
    nullable: true, // allow null if needed
  })
  content: any;

  @ManyToMany(() => KeywordEntity, (keyword) => keyword.articles, {
    cascade: true,
  })
  @JoinTable() // This decorator creates a join table on the owning side
  keywords: KeywordEntity[];
}

export const ArticleEntityProvider: any = [
  {
    provide: repositories.ARTICLE_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ArticleEntity),
    inject: ['DATA_SOURCE'],
  },
];
