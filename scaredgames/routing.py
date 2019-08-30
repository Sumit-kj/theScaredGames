from channels.routing import ProtocolTypeRouter, URLRouter
from channels.sessions import SessionMiddlewareStack

import main.routing


application = ProtocolTypeRouter({
    'websocket': SessionMiddlewareStack(
        URLRouter(
            main.routing.websocket_urlpatterns
        )
    )
})
