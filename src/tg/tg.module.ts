import { Module } from '@nestjs/common';
import { TgUpdate } from './tg.update';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [TelegrafModule.forRoot({
    token: '7926953131:AAGPEqgw4cX4UWwLPMSGsMTPxsdrooQ826Q'
  })],
  providers: [TgUpdate]
})
export class TgModule {}
