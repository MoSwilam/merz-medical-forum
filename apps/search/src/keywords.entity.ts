import { repositories } from '@lib';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DataSource,
  ManyToMany,
} from 'typeorm';
import { ArticleEntity } from './articles.entity';

@Entity({ name: 'keywords' })
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  terms: string[];

  @ManyToMany(() => ArticleEntity, (article) => article.keywords)
  articles: ArticleEntity[];
}

export const keywordEntityProvider: any = [
  {
    provide: repositories.KEYWORD_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(KeywordEntity),
    inject: ['DATA_SOURCE'],
  },
];
