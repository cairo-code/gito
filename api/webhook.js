// pages/api/webhook.js

import { Telegraf } from 'telegraf';
import bodyParser from 'body-parser';

const bot = new Telegraf('6998581042:AAGVG4apkuryS6Ege3CYn9I9vO0338jkAPQ');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { repository, pusher, commits } = req.body;

    let message = `Repository: ${repository.full_name}\nPusher: ${pusher.name}\n\n`;

    commits.forEach(commit => {
      message += `Commit Message: ${commit.message}\nChanged Files:\n`;
      message += commit.added.map(file => `Added: ${file}`).join('\n') + '\n';
      message += commit.removed.map(file => `Removed: ${file}`).join('\n') + '\n';
      message += commit.modified.map(file => `Modified: ${file}`).join('\n') + '\n';
      message += '\n';
    });

    await bot.telegram.sendMessage('5309273112');
    res.status(200).send('Webhook received');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

export default bodyParser.json()(handler);
