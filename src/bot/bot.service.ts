import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BotService implements OnModuleInit {
  private bot: TelegramBot;

  onModuleInit() {
    this.initBot();
  }

  private initBot() {
    const token = process.env.BOT_TOKEN;

    if (!token) {
      throw new Error('BOT_TOKEN is missing');
    }

    this.bot = new TelegramBot(token, {
      polling: true,
    });

    console.log('Telegram bot started');

    this.bot.on('message', (msg) => {
      this.handleMessage(msg);
    });
  }

  private handleMessage(msg: TelegramBot.Message) {
    const text = msg.text?.toLowerCase();
    const chatId = msg.chat.id;

    if (!text) return;

    if (text.startsWith('hi')) {
      this.bot.sendMessage(
        chatId,
        `Hello ${msg.from?.first_name ?? 'there'}`
      );
    }

    if (text.includes('who')) {
      this.bot.sendMessage(
        chatId,
        'I am a NestJS Telegram bot.'
      );
    }

    if (text.includes('javascript')) {
      this.bot.sendMessage(
        chatId,
        'Yes, I love JavaScript.'
      );
    }
  }
}
