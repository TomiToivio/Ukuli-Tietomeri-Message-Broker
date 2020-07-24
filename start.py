import sentry_sdk
sentry_sdk.init("https://f31c9903bb2f41be9d6131da5d7db0a8@o325237.ingest.sentry.io/1829931")

import rollbar
rollbar.init('6332cfdfea4a4b608bbb09002bc1c260')

import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    client.subscribe("$SYS/#")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("api.ukuli.fi", 1883, 60)

client.loop_forever()
