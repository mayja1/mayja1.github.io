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
conn = pymysql.connect(host='titan.csse.rose-hulman.edu', port=3306, user='hullzr', passwd='Ballin22', db='Hulleva Amayzing ProjectDB')


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
                print("pics: " + s)
            print("email: " + email);
            ''' TODO Send pics and email to database'''
            try:
                with conn.cursor() as cursor:
                    sql = "INSERT INTO 'Users' ('Email', 'Picture1', 'Picture2', 'Picture3') VALUES (%s, %s, %s, %s)"
                    cursor.execute(sql, (email, pics[0], pics[1], pics[2]))
                conn.commit()
            finally:
                return "response"

        @cherrypy.expose
        def getProfile(self, email):
            try:
                with conn.cursor as cursor:
                    sql = "SELECT 'Picture1', 'Picture2', 'Picture3' FROM 'Users' WHERE 'Email' = %s"
                    cursor.execute(sql, (email))
                    result = cursor.fetchone()
                    print(result)
                    return json.dumps(result)
            finally:
                return ""

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

            try:
                with conn.cursor as cursor:
                    sql = "SELECT 'Ranking1', 'Ranking2', 'Ranking3', 'Ranking4', 'Ranking5', 'Ranking6', 'Ranking7', 'Ranking8', 'Ranking9','Ranking10' FROM 'Users' WHERE 'email' = %s"
                    cursor.execute(sql, (email))
                    result = cursor.fetchone()
                    ###########################################
                    # NOTE: WE WILL HAVE TO CONNECTION.CLOSE()#
                    #           AT SOME POINT                 #
                    ###########################################
                    print(result)
                    return json.dumps(result)
            finally:
                return ""
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

