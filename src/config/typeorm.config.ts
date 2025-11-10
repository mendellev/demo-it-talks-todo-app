import { DataSourceOptions } from 'typeorm';
import { Todo } from '../todos/entities/todo.entity';

export const typeormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: '../db/todo.db',
  entities: [Todo],
  migrations: ['../migrations/*.ts'],
  synchronize: false,
  logging: true,
};
