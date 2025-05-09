import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private client: PrismaService,
  ) {}

  async sendMessageByUsername( text: string, username: string |null) {
    const user = await this.findUserInDB(username);
    if (!user?.chatId) {
      throw new Error('Пользователь не найден или не взаимодействовал с ботом');
    }

    return this.bot.telegram.sendMessage(user.chatId, text);
  }

  private async findUserInDB(username: string | null) {
    let res = await this.client.restaurant.findFirst({
      where: { tgUserName: username },
    });
    return {
      username: res?.tgUserName,
      chatId: res?.tgChatId,
    };
  }
}
