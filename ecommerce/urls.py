# from django.views.generics import TemplateView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/',include('users.urls') ),
    path('api/products/', include('products.urls')),
]
urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "E-store Admin Panel"
admin.site.site_title = "E-store"
admin.site.index_title = "Admin Panel"