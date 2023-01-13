from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    image= models.ImageField()
    price = models.PositiveIntegerField()
    description = models.TextField()
    instock = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True)
    numReviews = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def has_inventory(self):
        self.instock > 0

    def __str__(self):
        return self.name

    class Meta:
        ordering =['-created_at']

class ProductImage(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.image.url

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    rating = models.PositiveIntegerField(default=0)
    comment = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    payment_method = models.CharField(max_length=100)
    tax_price = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()
    shipping_price = models.PositiveIntegerField()
    isPaid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField(auto_now_add=True,null=True, blank=True)
    shipping_address =models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user.username

    def sales_percentage(self):
        total_sales = self.objects.filter(isPaid=True).count()
        print(total_sales)

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    product_category = models.CharField(max_length=100, null=True, blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    image= models.ImageField()
    quantity = models.PositiveIntegerField(default=0)
    price = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class ShippingAddress(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.CharField(max_length=100)
    county = models.CharField(max_length=100)
    street = models.CharField(max_length=100, default='Nairobi')

    def __str__(self):
        return self.address