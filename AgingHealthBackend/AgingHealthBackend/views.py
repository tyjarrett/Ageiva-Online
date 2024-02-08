from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

class RootView(APIView):
  def get(self, request):
    return Response(HTTP_200_OK)