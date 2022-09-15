#!/bin/python3

import bottle

@bottle.route('/')
def index():
    with open('index.html') as h:
        return h.read()

bottle.run(host='0.0.0.0')
