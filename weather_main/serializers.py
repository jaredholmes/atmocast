from rest_framework import serializers

from .models import LocationList

class LocationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationList
        fields = ('__all__')
