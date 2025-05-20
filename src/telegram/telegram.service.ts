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
import { ApplicationService } from 'src/application/application.service';

interface MyContext extends Context, ConversationFlavor<Context> {}
const starttext = ['Kurslar', 'Kursga yozilish'];
const btn = starttext.map((btn) => [Keyboard.text(btn)]);
const start = Keyboard.from(btn).resized();

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Bot<MyContext>;

  constructor(private readonly applyService: ApplicationService) {}

  onModuleInit() {
    this.bot = new Bot<MyContext>(process.env.TELEGRAM_BOT_TOKEN);

    this.bot.use(conversations());
    this.bot.use(
      createConversation(
        (conversation: Conversation<MyContext>, ctx: MyContext) =>
          this.apply(conversation, ctx),
        'apply',
      ),
    );

    this.bot.command('start', async (ctx) => {
      await ctx.replyWithPhoto(
        'https://api.logobank.uz/media/logos_png/Najot_Talim-01.png',
        {
          caption: `🎓 Assalomu alaykum, ${ctx.from.first_name || 'do‘st'}!
Siz *Najot Ta'lim* o‘quv markazining rasmiy botiga xush kelibsiz! 🤖

📚 Bu yerda siz:
✅ Kurslar haqida to‘liq ma’lumot olasiz
✅ Ro‘yxatdan o‘tishingiz mumkin
✅ Ustozlarimiz bilan tanishasiz
✅ Dars jadvalini ko‘rasiz

🚀 Quyidagi tugmalardan birini tanlang:`,
          parse_mode: 'Markdown',
          reply_markup: new Keyboard()
            .text("📝 Ro'yxatdan o'tish")
            .text("📍 O'quv markazlari")
            .resized(),
        },
      );
    });

    this.bot.callbackQuery('apply', async (ctx) => {
      await ctx.conversation.enter('apply');
    });

    this.bot.hears('Kursga yozilish', async (ctx) => {
      await ctx.conversation.enter('apply');
    });

    this.bot.hears("📝 Ro'yxatdan o'tish", async (ctx) => {
      await ctx.conversation.enter('apply');
    });

    this.bot.hears("📍 O'quv markazlari", async (ctx) => {
      await ctx.reply("Qaysi filial haqida ma'lumot kerak?", {
        reply_markup: new Keyboard()
          .text('📍 Yunusobod')
          .text('📍 Chilonzor')
          .row()
          .text('📍 Mirobod')
          .text('📍 Sergeli')
          .row()
          .text('🔙 Ortga')
          .resized(),
      });
    });

    this.bot.hears('📍 Yunusobod', async (ctx) => {
      await ctx.reply(
        `📍 *Yunusobod filiali*\n\nManzil: Yunusobod 5-mavze, 12-uy\nMo‘ljal: “Yunusobod savdo markazi” yonida\n📞 Tel: +998 71 200 00 00`,
        { parse_mode: 'Markdown' },
      );
      await ctx.replyWithLocation(41.3375, 69.334);
    });

    this.bot.hears('📍 Chilonzor', async (ctx) => {
      await ctx.reply(
        `📍 *Chilonzor filiali*\n\nManzil: Chilonzor 18-kvartal, 25-uy\nMo‘ljal: “Chilonzor metro” yaqinida\n📞 Tel: +998 71 200 11 11`,
        { parse_mode: 'Markdown' },
      );
      await ctx.replyWithLocation(41.301, 69.2189);
    });

    this.bot.hears('📍 Mirobod', async (ctx) => {
      await ctx.reply(
        `📍 *Mirobod filiali*\n\nManzil: Mirobod ko‘chasi, 45-uy\nMo‘ljal: “Mirobod Bozori” qarshisida\n📞 Tel: +998 71 200 22 22`,
        { parse_mode: 'Markdown' },
      );
      await ctx.replyWithLocation(41.321, 69.282);
    });

    this.bot.hears('📍 Sergeli', async (ctx) => {
      await ctx.reply(
        `📍 *Sergeli filiali*\n\nManzil: Sergeli 7A, 10-uy\nMo‘ljal: “Makro Supermarket” yonida\n📞 Tel: +998 71 200 33 33`,
        { parse_mode: 'Markdown' },
      );
      await ctx.replyWithLocation(41.304, 69.254);
    });

    this.bot.hears('🔙 Ortga', async (ctx) => {
      await ctx.reply('Asosiy menyu', {
        reply_markup: new Keyboard()
          .text("📝 Ro'yxatdan o'tish")
          .text("📍 O'quv markazlari")
          .resized(),
      });
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
    this.applyService.create({
      name: name.message.text,
      phone: phone.message.text,
      address: course.message.text,
    });
    await ctx.reply(
      `✅ Arizangiz qabul qilindi:\n👤 Ism: ${name.message.text}\n📞 Telefon: ${phone.message.text}\n📘 Kurs: ${course.message.text}`,
    );
  }
}
