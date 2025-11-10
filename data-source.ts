import { DataSource } from 'typeorm';
import { typeormConfig } from './src/config/typeorm.config';

export const AppDataSource = new DataSource(typeormConfig);
