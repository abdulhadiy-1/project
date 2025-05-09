import { Start, Update } from "nestjs-telegraf";
import { Context } from "telegraf";

@Update()
export class TgUpdate{
    @Start()
    async onStart(ctx: Context){
        ctx.reply('salom')
    }
}