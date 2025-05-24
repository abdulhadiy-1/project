import { Global, Module } from '@nestjs/common';
import { TgUpdate } from './tg.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './tg.service';

@Global()
@Module({
  imports: [TelegrafModule.forRoot({
    token: '7926953131:AAGPEqgw4cX4UWwLPMSGsMTPxsdrooQ826Q'
  })],
  providers: [TgUpdate, TelegramService],
  exports: [TelegramService]
})
export class TgModule {}
