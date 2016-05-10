import os, os.path
import random
import string
import cherrypy
import pymysql
import subprocess
import tinys3
import boto
import boto.s3
import sys
from boto.s3.key import Key
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

