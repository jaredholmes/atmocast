from rest_framework import serializers

from .models import Cart, LocationList

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('__all__')

class LocationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationList
        fields = ('__all__')
