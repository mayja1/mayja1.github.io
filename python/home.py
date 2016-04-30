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
S3_ACCESS_KEY = 'AKIAI2L42BGVQS5V57QA'
S3_SECRET_KEY = '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'

config = {
        'user': 'Floptical',
        'passwd': 'Password1',
        'host': 'floptical-relational-database.cxrbiaxhps5f.us-west-2.rds.amazonaws.com',
        'db': 'flopticalDatabase'
}


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

'''
if __name__ == '__main__':
        conf = {
                'global': {
                'server.max_request_body_size': 0
                },
                '/': {
                        'tools.sessions.on' : True,
                        'tools.staticdir.root' : os.path.abspath(os.getcwd())
                },
                '/static': {
                        'tools.staticdir.on': True,
                        'tools.staticdir.dir': '/hotornot/resources'
                }
        }


cherrypy.server.socket_host = '0.0.0.0'
cherrypy.quickstart(ServeSite(), '/', conf)
'''
