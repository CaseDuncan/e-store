from django.contrib import admin
from products.models import Product, Review, Order, OrderItem, ShippingAddress

# Register your models here.
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "price",
        "category",
        "instock",
        "rating",
        "numReviews",
        "image",
    ]


class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "total_price",
        "tax_price",
        "shipping_price",
        "payment_method",
        "isPaid",
        "paid_at",
        'isDelivered',
        'delivered_at',
        'created_at',
    ]


admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
