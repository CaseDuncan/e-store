from django.urls import path
from products import views

urlpatterns = [
    path("listings/", views.getProducts, name="products"),
    path("create/", views.create_product, name="products-add"),
    path("listings/best_selling/", views.getBestSellingProducts, name="best_selling"),
    path("listings/<str:pk>/", views.product_details, name="product"),
    path("listings/<str:pk>/reviews/", views.create_product_review, name="reviews"),
    path("orders/create/", views.createOrder, name="new_order"),
    path("orders/all/", views.fetchOrders, name="orders"),
    path("orders/details/<str:pk>/", views.fetch_order_details, name="order_details"),
    path("orders/today/", views.todays_sales, name="sales-today"),
    path("dashboard/summary/", views.dashboard_content, name="dashboard"),
    path("dashboard/sales/analysis", views.sales_analysis, name="sales_analysis"),
]
