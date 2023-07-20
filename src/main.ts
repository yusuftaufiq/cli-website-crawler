#!/usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { MainModule } from './main.module';

const bootstrap = async () => {
  await CommandFactory.run(MainModule, ['error']);
};
bootstrap();
