import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Update()
@Injectable()
export class TgUpdate {
  constructor(private client: PrismaService) {}
  @Start()
  async onStart(ctx: Context) {
    const chatId = ctx.chat?.id.toString() || '1';
    const username = ctx.from?.username || undefined;

    let a = await this.client.restaurant.findFirst({
      where: { tgUserName: username },
    });
    if (!a) {
      await ctx.reply('you do not have a restaurant');
      return;
    }
    await this.client.restaurant.update({
      where: { tgUserName: username },
      data: { tgChatId: chatId },
    });
    console.log(`User @${username} has chatId: ${chatId}`);

    await ctx.reply(
      'Привет, ' + (username ? '@' + username : 'пользователь') + '!',
    );
  }
}
