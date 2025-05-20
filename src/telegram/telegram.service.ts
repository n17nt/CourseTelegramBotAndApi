import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot, Context, InlineKeyboard, Keyboard } from 'grammy';
import {
  conversations,
  createConversation,
  Conversation,
  ConversationFlavor,
} from '@grammyjs/conversations';
import { ApplyService } from './apply.service';
import { log } from 'console';

interface MyContext extends Context, ConversationFlavor<Context> {}
const starttext = ['Kurslar', 'Kursga yozilish'];
const btn = starttext.map((btn) => [Keyboard.text(btn)]);
const start = Keyboard.from(btn).resized();

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Bot<MyContext>;

  constructor(private readonly applyService: ApplyService) {}

  onModuleInit() {
    this.bot = new Bot<MyContext>(
      '8058053635:AAHcl6PBAZZ-tS2xxHWTwUHY4RnTTeo89vo',
    );

    this.bot.use(conversations());
    this.bot.use(
      createConversation(
        (conversation: Conversation<MyContext>, ctx: MyContext) =>
          this.apply(conversation, ctx),
        'apply',
      ),
    );
    console.log(this.applyService.hello());

    // Bu yerda conversation ni bot.use orqali nom bilan ro'yxatga olish kerak
    // this.bot.use(createConversation(this.applyConversation));
    // this.bot.conversations = new Map([['apply', this.applyConversation]]);

    this.bot.command('start', async (ctx) => {
      await ctx.reply('🤖 Botga xush kelibsiz!. Ariza uchun tugmani bosing', {
        reply_markup: start,
      });
    });

    this.bot.callbackQuery('apply', async (ctx) => {
      await ctx.conversation.enter('apply');
    });

    this.bot.hears('Kursga yozilish', async (ctx) => {
      await ctx.conversation.enter('apply');
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

    log({
      name: name.message.text,
      phone: phone.message.text,
      course: course.message.text,
    });
    // this.applyService.saveApplication({
    //   name: name.message.text,
    //   phone: phone.message.text,
    //   course: course.message.text,
    // });
    //
    this.applyService.saveApplication({
      name: name.message.text,
      phone: phone.message.text,
      course: course.message.text,
    });
    await ctx.reply(
      `✅ Arizangiz qabul qilindi:\n👤 Ism: ${name.message.text}\n📞 Telefon: ${phone.message.text}\n📘 Kurs: ${course.message.text}`,
    );
  }
}
