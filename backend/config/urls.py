from django.contrib import admin
from django.urls import include, path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/",
        include("items.urls"),
    ),

    path(
        "auth/token/",
        TokenObtainPairView.as_view(),
    ),

    path(
        "auth/token/refresh/",
        TokenRefreshView.as_view(),
    ),
]