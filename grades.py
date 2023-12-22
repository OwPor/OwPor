import os
import json
import requests
from bs4 import BeautifulSoup
import discord
from discord.ext import commands

intents = discord.Intents.all()
bot = commands.Bot(command_prefix='.', intents=intents, case_insensitive=True)

currentSession = None
waiting = []
users = {}

async def handle_response(user_message, ctx):
  message = str(user_message.lower()).split()
  p_message = message[0]

  if p_message == '.start':
    try:
      await ctx.send(f'Thank you, {ctx.author.mention}! Your credentials have been received. Please wait for a moment.')

      with requests.Session() as s:
        headers = {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://wmsu.edu.ph',
            'Referer': 'http://wmsu.edu.ph/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
            'X-Requested-With': 'XMLHttpRequest',
        }

        try:
          r = s.post('http://wmsu.edu.ph/mywmsu/config_connect.php', headers=headers, data=users[ctx.author.id], verify=False, timeout=10)
        except requests.exceptions.Timeout:
          await ctx.send('The site might be down. Please try again later.')
          return

        data = json.loads(r.content)

        if (data["token"] is not None):
          print('Login successful')
          sessionId = r.cookies.get("PHPSESSID")
          users[ctx.author.id] = {'cookie': sessionId}

          await ctx.send('Login success! Please wait...')

        else:
          print('Login failed')
          await ctx.send("Invalid Credentials")

      with requests.Session() as req:
        cookies = {}

        cookies[ctx.author.id] = {
          'PHPSESSID': users[ctx.author.id]['cookie']
        }

        print('Login successful')
        try:
          r2 = req.get("http://wmsu.edu.ph/mywmsu/grade/grades.php", cookies=cookies[ctx.author.id], headers=headers, verify=False, timeout=10)
        except requests.exceptions.Timeout:
          await ctx.send('The site might be down. Please try again later.')
          return

        soup = BeautifulSoup(r2.content, 'html.parser')
        text = soup.get_text()
        txt = text
        global all
        all = ''

        id_start = txt.find("STUDENT ID: ") + len("STUDENT ID: ")
        id_end = txt.find("STUDENT NAME: ")
        id = txt[id_start:id_end].strip()

        name_start = id_end + len("STUDENT NAME: ")
        name_end = txt.find("If you")
        name = txt[name_start:name_end].strip()

        all += "STUDENT ID: " + id
        all += "\nSTUDENT NAME: " + name + "\n\n"

        # Get the longest description for the spacing
        longest_desc = 0
        for section in soup.find_all('section'):
          for row in section.find_all('tr')[1:]:
            desc_len = len(row.find_all('td')[1].text)
            if desc_len > longest_desc:
              longest_desc = desc_len

        # Add a little space
        longest_desc += 3

        for section in soup.find_all('section'):

          await p(ctx, all)
          all += "\n" + section.find('b').text
          for row in section.find_all('tr')[1:]:
            cols = row.find_all('td')
            all += "\n" + '{:<15}{:<{desc_len}}{:<10}'.format(
                cols[0].text, cols[1].text, cols[2].text, desc_len=longest_desc)

        await p(ctx, all)
        print("Done")
    
    except Exception as e:
      print(e)
      
    del users[ctx.author.id]
      
  elif p_message == '.how':
    await ctx.send('Send ```.start yourusername yourpassword``` to get your code by logging in, and to get your grades. Send ```.info``` to know more about us.')
  elif p_message == '.info':
    await ctx.send('This bot was made by Vince, with the help of Jethro. We are from CS2B (2023-2024).')


async def p(ctx, txt):
  await ctx.send(f'```{txt}```')
  global all
  all = ''


@bot.command()
async def start(ctx, un: str, pw: str):
  users[ctx.author.id] = { 
      'username_id': un, 
      'password': pw,
  }

  username = str(ctx.message.author)
  user_message = str(ctx.message.content)
  channel = str(ctx.message.channel)

  print(f"{username} said: '{user_message}' ({channel})")

  await handle_response(ctx.message.content, ctx)

@bot.command()
async def how(ctx):
  username = str(ctx.message.author)
  user_message = str(ctx.message.content)
  channel = str(ctx.message.channel)

  print(f"{username} said: '{user_message}' ({channel})")

  await handle_response(ctx.message.content, ctx)

@bot.command()
async def info(ctx):
  username = str(ctx.message.author)
  user_message = str(ctx.message.content)
  channel = str(ctx.message.channel)

  print(f"{username} said: '{user_message}' ({channel})")

  await handle_response(ctx.message.content, ctx)

@bot.event
async def on_message(message):
  if message.author.bot:
    return
  if message.author.id in waiting:
    return

  temp = message.content.split()
  msg = temp[0].lower()

  if msg == '.start':
    if len(temp) != 3:
      await message.channel.send('Please use the format: ```.start yourusername yourpassword```')
      return

  if not msg.startswith(('.start', '.how', '.info')):
    await message.channel.send('Type ```.how``` if you need help. Thank you.')
    return

  await bot.process_commands(message)

bot.run(os.getenv('TOKEN'))
