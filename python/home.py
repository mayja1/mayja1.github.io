import os, os.path
import random
import string
import cherrypy
import pymysql
import subprocess
import sys
import json
from jinja2 import Environment, FileSystemLoader

# declare global variables
env = Environment(loader=FileSystemLoader('./hotornot'))


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
            return tmpl.render()

        @cherrypy.expose
        def sendPictures(self, email, pics):
            for s in pics.split("|") :
                print("pics: " + s);
            
            print("email: " + email);
            ''' TODO Send pics and email to database'''
            return "response"

        @cherrypy.expose
        def getProfile(self, email):
            print("")
            print("email: " + email)
            print("")
            data = {
            "pic1": "https://scontent.xx.fbcdn.net/v/t1.0-0/s130x130/1003353_10200920905322837_1184241546_n.jpg?oh=1a5fee3858e3ca36c85def0c977ad32f&oe=57AF1A32",
            "pic2": "https://scontent.xx.fbcdn.net/v/t1.0-0/p130x130/995067_10200443612350811_956792499_n.jpg?oh=3064376713a96370b56355b982da005a&oe=57E0243C",
            "pic3": "",
            }
            return json.dumps(data);

        @cherrypy.expose
        def getRatings(self, email):
            print("")
            print("email: " + email)
            print("")
            data = {
            "10": 10,
            "9": 9,
            "8": 8,
            "7": 10,
            "6": 9,
            "5": 8,
            "4": 10,
            "3": 9,
            "2": 8,
            "1": 1
            }
            return json.dumps(data);

CP_CONF = {
        '/resources': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': os.path.abspath('./hotornot/resources')
            }
        }

if __name__ == '__main__':
    cherrypy.config.update({'server.socket_port': 8080})
    cherrypy.server.socket_host = '0.0.0.0'
    cherrypy.quickstart(ServeSite(), '/', CP_CONF)

