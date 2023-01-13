from products.models import Product, Order, OrderItem, ShippingAddress, Review
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from users.serializers import UserSerializerWithToken, UserSerializer
from products.serializers import ProductSerializer, OrderSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import status
from django.db.models import Sum
from datetime import datetime
import pytz

# Create your views here.
@api_view(["GET", "POST"])
def getProducts(request):
    # if request.method == "GET":
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# elif request.method == "POST":
#     user = request.user
#     data = request.data
#     product = Product.objects.create(
#     user=user,
#     name=data['name'],
#     price=data["price"],
#     instock=data["instock"],
#     category=data["category"],
#     description=data["description"],
#     image=data["image"].url,
#    )
# serializer = ProductSerializer(product, many=False)
# return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def create_product(request):
    user = request.user
    data = request.data
    product = Product.objects.create(
        user=user,
        name=data["name"],
        price=data["price"],
        instock=data["instock"],
        category=data["category"],
        description=data["description"],
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
def product_details(request, pk):
    product = Product.objects.get(id=pk)
    if request.method == "GET":
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ProductSerializer(product, many=False)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == "DELETE":
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def getBestSellingProducts(request):
    products = Product.objects.filter(rating__gte=3)[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createOrder(request):
    user = request.user
    data = request.data
    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"message": "could not place order! check details and try again"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    else:
        # create Order
        order = Order.objects.create(
            user=user,
            payment_method=data["payment_method"],
            tax_price=data["tax_price"],
            total_price=data["total_price"],
            shipping_price=data["shipping_price"],
            shipping_address=data["address"],
        )

        # create ShippingAddress
        shipping_address = ShippingAddress.objects.create(
            order=order,
            county=data["county"],
            address=data["address"],
            street=data["street"],
        )

        # create OrderItems
        for i in orderItems:
            product = Product.objects.get(id=i["id"])

            item = OrderItem.objects.create(
                name=product.name,
                product=product,
                order=order,
                product_category=product.category,
                price=i["price"],
                image=product.image.url,
                quantity=i["quantity"],
            )
            # update  quantity instock if a customer places an order
            if product.instock >= item.quantity:
                product.instock -= item.quantity
                product.save()
            else:
                Response("You cannot order more items than instock")

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def fetchOrders(request):
    user = request.user
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def fetch_order_details(request, pk):
    user = request.user
    order = Order.objects.get(id=pk)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


# sales made today
@api_view(["GET"])
def todays_sales(request):
    date = datetime.today()
    timezone_aware_date = pytz.utc.localize(date)
    print("time:", timezone_aware_date)
    orders = Order.objects.filter(date__lte=date)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


# content for dashboard home
@api_view(["GET"])
@permission_classes([IsAdminUser])
def dashboard_content(request):
    sales = Order.objects.filter(isPaid=True).aggregate(total_sales=Sum("total_price"))
    users = User.objects.filter(is_staff=True)
    customers = User.objects.filter(is_staff=False)
    orders = Order.objects.filter(isPaid=True)
    return Response(
        {
            "sales": sales,
            "customers": customers.count(),
            "users": users.count(),
            "orders": orders.count(),
        }
    )


@api_view(["GET"])
@permission_classes([IsAdminUser])
def sales_analysis(request):
    phones = OrderItem.objects.filter(product__category="Phones").aggregate(
        total_sales_phones=Sum("price")
    )
    electronics = OrderItem.objects.filter(product__category="Electronics").aggregate(
        total_sales_electronics=Sum("price")
    )
    # watches = Order.objects.filter(category="electronics").aggregate(total_sales_watches=Sum("total_price"))
    # clothing =Order.objects.filter(category="clothing").aggregate(total_sales_clothing=Sum("total_price"))
    # shoes = Order.objects.filter(category="shoes").aggregate(total_sales_shoes=Sum("total_price"))
    # jewellery =Order.objects.filter(category="jewellery").aggregate(total_sales_jewellery=Sum("total_price"))
    return Response(
        {
            "phones": phones,
            "electronics": electronics,
            # 'watches':watches,
            # 'clothing':clothing,
            # 'shoes':shoes,
            # 'jewellery': jewellery
        }
    )


# product rating
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_product_rating(request, pk):
    user = request.user
    data = request.data
    product = Product.objects.get(id=pk)

    # check if user already reviewed the product
    existing_review = product.review_set.filter(user=user).exists()
    if existing_review:
        message = {"error": "product already reviewed"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    # check if rating provided is greater than zero
    elif data["rating"] == 0:
        message = {"error": "product review should be between 1-5"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.username,
            rating=data["rating"],
            comment=data["comment"],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total_reviews = 0
        for product_review in reviews:
            total_reviews += product_review.rating

        product.rating = total_reviews / len(reviews)
        product.save()
        return Response("review added!", status=status.HTTP_201_CREATED)
