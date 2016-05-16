import os, os.path
import random
import string
import cherrypy
#import pymysql
import subprocess
import sys
import json
from jinja2 import Environment, FileSystemLoader
import sqlite3

# declare global variables
sess = cherrypy.session
env = Environment(loader=FileSystemLoader('./hotornot'))
#conn = pymysql.connect(host='titan.csse.rose-hulman.edu', port=3306, user='hullzr', passwd='Ballin22', db='Hulleva Amayzing ProjectDB')
class ServeSite(object):
        @cherrypy.expose
        def index(self):
                print(os.path.abspath(os.getcwd()))
                tmpl = env.get_template('index.html')
                return tmpl.render()

        @cherrypy.expose
        def profile(self):
                tmpl = env.get_template('profile.html')
                return tmpl.render()
        @cherrypy.expose
        def privacy(self):
                tmpl = env.get_template('privacy.html')
                return tmpl.render()
        @cherrypy.expose
        def home(self):
            tmpl = env.get_template('home.html')
            return tmpl.render()
        @cherrypy.expose
        def rate(self):
            tmpl = env.get_template('rate.html')
            conn = sqlite3.connect('hotornot.db')
            cursor = conn.cursor()

            return tmpl.render()

        @cherrypy.expose
        def sendPictures(self, email, pics):
            pictures = ["", "", "", ""]
            i = 0
            for s in pics.split("|"):
                pictures[i] = s
                i = i + 1
            print("email: " + email);
            response = "response"
            try:
                conn = sqlite3.connect('hotornot.db')
                cursor = conn.cursor()
                sql = "REPLACE INTO 'User' ('Email', 'Picture1', 'Picture2', 'Picture3') VALUES (?, ?, ?, ?)"
                response = cursor.execute(sql, (email, pictures[0], pictures[1], pictures[2]))
                print("sql statement executed")
                conn.commit()
            finally:
                return response

        @cherrpy.expose
        def setEmail(self, email):
            sess['email'] = email
            
        @cherrypy.expose
        def getRandomUser(self):
            result = {}

            conn = sqlite3.connect('hotornot.db')
            cursor = conn.cursor()
            sql = "SELECT Email, Picture1, Picture2, Picture3 FROM User WHERE Email != sess['email']  ORDER BY RANDOM() LIMIT 1"
            temp = cursor.execute(sql)
            for row in temp:
                result['Email'] = row[0]
                result['Picture1'] = row[1]
                result['Picture2'] = row[2]
                result['Picture3'] = row[3]
            return json.dumbs(result)

        @cherrypy.expose
        def getProfile(self, email):
            result = {}
        

            conn = sqlite3.connect('hotornot.db')
            cursor = conn.cursor()
            sql = "SELECT Picture1, Picture2, Picture3 FROM User WHERE Email = ?"
            temp = cursor.execute(sql, (email,))
            for row in temp:
                result['Picture1'] = row[0]
                result['Picture2'] = row[1]
                result['Picture3'] = row[2]            

            return json.dumps(result)

        @cherrypy.expose
        def getRatings(self, email):
            result = {};
                
            conn = sqlite3.connect('hotornot.db')
            cursor = conn.cursor()
            sql = "SELECT rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8, rank9,rank10 FROM User WHERE email = ?"
            temp = cursor.execute(sql, (email,))
            for row in temp:
                for i in range(1,11):
                    rank = str(i)
                    result[rank] = row[i-1]
                    print(rank + ": " + str(row[i-1]))
            return json.dumps(result)
CP_CONF = {
        '/resources': {
            'tools.staticdir.on': True,
            'tools.session.on': True,
            'tools.staticdir.dir': os.path.abspath('./hotornot/resources')
            }
        }

if __name__ == '__main__':
    cherrypy.config.update({'server.socket_port': 8080})
    cherrypy.server.socket_host = '0.0.0.0'
    cherrypy.quickstart(ServeSite(), '/', CP_CONF)

