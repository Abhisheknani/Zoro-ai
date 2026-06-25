import time
import logging

logger = logging.getLogger('request_log')

class RequestLogMiddleware:
    
    def __init__(self,get_response):
        self.get_response = get_response
    

    def __call__(self, request):
            start = time.time()

            response = self.get_response(request)
            duration = round((time.time() - start)* 1000, 2)
            user = request.user if hasattr(request, 'user') and request.user.is_authenticated else 'anonymous'
            logger.info(f"{request.method} {request.path} {response.status_code} {duration}ms user={user}")
            return response
