import sys
from time import sleep
import json


def test(inWord):
    # the sleep simulates the delay
    sleep(2)
    # a Python object (dict):
    x =[{"name": "Bahrain", "trends": 
    [{"name":"#StrangerThings", "tweet_volume": 389738}]},
{"name": "Norway", "trends": [{"name": "Peru", "tweet_volume": 567337},
 {"name": "Everton", "tweet_volume": 122553},
  {"name": "Copa America", "tweet_volume": 591395},
   {"name": "Cameron Boyce", "tweet_volume": 3895265},
    {"name": "Pogba", "tweet_volume": 35110}, 
    {"name": "viktorhovland", "tweet_volume": 55416},
     {"name": "Mulan", "tweet_volume": 830646},
      {"name": "messi", "tweet_volume": 521055},
       {"name": "BBNaija", "tweet_volume": 80225},
        {"name": "Argentina", "tweet_volume": 244468},
         {"name": "star wars", "tweet_volume": 16834}, ]}]
    # convert into JSON:
    y = json.dumps({"trends":x})
    # the result is a JSON string:
    # you have to print what you want to return

    print(y)
    # this line sends the data to the nodejs stdout.on function
    sys.stdout.flush()


# if you want to pass another parameter, use argv[2] after adding it ofcourse in the spawn funcition in node.js file
test(sys.argv[1])


