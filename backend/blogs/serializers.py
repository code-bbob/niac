from rest_framework import serializers
from pages.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    """Serializer for Blog model"""
    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        return [{'id': author.id, 'name': author.full_name, 'slug': author.slug} for author in obj.author.all()]

    class Meta:
        model = Blog
        fields = [
            'id',
            'title',
            'slug',
            'author',
            'featured_image',
            'excerpt',
            'content',
            'category',
            'published_date',
            'updated_date',
            'is_published',
            'created_at',
        ]
        read_only_fields = ['slug', 'published_date', 'updated_date', 'created_at']
