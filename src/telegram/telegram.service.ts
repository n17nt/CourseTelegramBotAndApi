import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot, Context } from 'grammy';
import {
  conversations,
  createConversation,
  Conversation,
  ConversationFlavor,
} from '@grammyjs/conversations';

interface MyContext extends Context, ConversationFlavor<Context> {}

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Bot<MyContext>;

  onModuleInit() {
    this.bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN);

    this.bot.use(conversations());
    this.bot.use(createConversation(this.apply));

    // Bu yerda conversation ni bot.use orqali nom bilan ro'yxatga olish kerak
    // this.bot.use(createConversation(this.applyConversation));
    // this.bot.conversations = new Map([['apply', this.applyConversation]]);

    this.bot.command('start', async (ctx) => {
      await ctx.reply(
        '🤖 Botga xush kelibsiz! Ariza uchun /apply buyrug‘ini yuboring.',
      );
    });

    this.bot.command('apply', async (ctx) => {
      await ctx.conversation.enter('apply');
    });

    this.bot.start();
  }
  private async apply(conversation: Conversation<MyContext>, ctx: MyContext) {
    await ctx.reply('Ismingizni kiriting:');
    const name = await conversation.waitFor('message:text');

    await ctx.reply('Telefon raqamingizni yuboring:');
    const phone = await conversation.waitFor('message:text');

    await ctx.reply('Qaysi kursga yozilmoqchisiz?');
    const course = await conversation.waitFor('message:text');

    await ctx.reply(
      `✅ Arizangiz qabul qilindi:\n👤 Ism: ${name.message.text}\n📞 Telefon: ${phone.message.text}\n📘 Kurs: ${course.message.text}`,
      {
        reply_markup: {
          inline_keyboard: [[{ text: 'someom', callback_data: 'hehe' }]],
        },
      },
    );
  }
}
