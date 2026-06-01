from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from pages.models import Blog
from blogs.serializers import BlogSerializer


class BlogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Blog posts.
    Provides list and retrieve endpoints.
    Supports searching by title/content.
    """
    queryset = Blog.objects.filter(is_published=True).order_by('-published_date')
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'excerpt', 'content', 'author']
    ordering_fields = ['published_date', 'title']
    
    def get_queryset(self):
        """Return only published blogs"""
        return Blog.objects.filter(is_published=True).order_by('-published_date')
