from rest_framework import serializers
from products.models import Product, Review, Order, OrderItem, ShippingAddress
from users.serializers import UserSerializer

class ProductSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = "__all__"
        
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    sales_percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = "__all__"

    def get_orders(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shipping_address(self, obj):
        # try:
        #     address = ShippingAddressSerializer(obj.shipping_address, many=False)
        # except:
        #     address = False
        # return address
        try:
            address = obj.shipping_address
            serializer = ShippingAddressSerializer(address, many=False)
            return serializer.data
        except:
            address = ''
        return address
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    
    def sales_percentage(self, obj):
        total_sales = obj.objects.filter(isPaid=True).count()
        print(total_sales)

