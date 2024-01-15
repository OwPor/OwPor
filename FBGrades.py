import os
import requests
import json
from bs4 import BeautifulSoup
from fbchat import Client, log
from fbchat.models import *
from enum import Enum

currentSession = None
users = {}

class CustomMessageReaction(Enum):
  LOVE = "❤"
  SAD = "😥"

class FBBot(Client):
  def onMessage(self, author_id, message_object, thread_id, thread_type, **kwargs):
    self.markAsDelivered(thread_id, message_object.uid)
    self.markAsRead(thread_id)
    #log.info("{} from {} in {}".format(message_object, thread_id, thread_type.name))
    # If you're not the author
    if author_id != self.uid:
      try:
        self.reactToMessage(message_object.uid, CustomMessageReaction.LOVE)
        #received = message_object.text + 'Vince'
        #message_object.text = received
        #self.send(message_object, thread_id=thread_id, thread_type=thread_type)
        msg = message_object.text.split()
        message = str(message_object.text.lower()).split()
        p_message = message[0]
        
        if p_message == '.start' and len(msg) == 3:
          author = thread_id
          
          try:
            un = msg[1]
            pw = msg[2]
  
            users[author] = { 
              'username_id': un, 
              'password': pw
            }
            user = self.fetchUserInfo(author_id)[author_id]
            name = user.name.split()
            message_object.text = f'Thank you, {name[0]}! Your credentials have been received. Please wait for a moment.'
            self.send(message_object, thread_id=thread_id, thread_type=thread_type)
  
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
                r = s.post('http://wmsu.edu.ph/mywmsu/config_connect.php', headers=headers, data=users[author], verify=False, timeout=10)
              except requests.exceptions.Timeout:
                message_object.text = 'The site might be down. Please try again later.'
                self.send(message_object, thread_id=thread_id, thread_type=thread_type)
                return
  
              data = json.loads(r.content)
  
              if (data["token"] is not None):
                print('Login successful')
                sessionId = r.cookies.get("PHPSESSID")
                users[author] = {'cookie': sessionId}
  
                message_object.text = 'Login success! Please wait...'
                self.send(message_object, thread_id=thread_id, thread_type=thread_type)
  
              else:
                print('Login failed')
                message_object.text = 'Invalid Credentials'
                self.send(message_object, thread_id=thread_id, thread_type=thread_type)
  
            with requests.Session() as req:
              cookies = {}
  
              cookies[author] = {
                'PHPSESSID': users[author]['cookie']
              }
  
              print('Login successful')
              try:
                r2 = req.get("http://wmsu.edu.ph/mywmsu/grade/grades.php", cookies=cookies[author], headers=headers, verify=False, timeout=10)
              except requests.exceptions.Timeout:
                message_object.text = 'The site might be down. Please try again later.'
                self.send(message_object, thread_id=thread_id, thread_type=thread_type)
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
                message_object.text = all
  
                self.send(message_object, thread_id, thread_type)
                all = ''
                all += "\n" + section.find('b').text
                for row in section.find_all('tr')[1:]:
                  cols = row.find_all('td')
                  all += "\n" + '{:<15}{:<{desc_len}}{:<10}'.format(
                      cols[0].text, cols[1].text, cols[2].text, desc_len=longest_desc)
  
              message_object.text = all
              self.send(message_object, thread_id=thread_id, thread_type=thread_type)
              all = ''
              print("Done")
  
          except Exception as e:
            print(e)
  
          del users[author]
  
        elif p_message == '.how':
          message_object.text = "How to use this bot? Send '.start your_username your_password' to login and get your grades."
          self.send(message_object, thread_id=thread_id, thread_type=thread_type)
        elif p_message == '.info':
          message_object.text = 'This bot was made by Vince, with the help of Jethro. We are from CS2B (2023-2024).'
          self.send(message_object, thread_id=thread_id, thread_type=thread_type)
        else:
          message_object.text = 'Type .how if you need help. Thank you.'
          self.send(message_object, thread_id=thread_id, thread_type=thread_type)
      except:
        self.reactToMessage(message_object.uid, CustomMessageReaction.SAD)
        message_object.text = 'An error occurred. Please try again later.'
        self.send(message_object, thread_id=thread_id, thread_type=thread_type)

client = FBBot(os.environ['email'], os.environ['password'])
client.listen()
