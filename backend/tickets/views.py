from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Avg
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from .services.llm_service import classify_ticket




class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = ["category", "priority", "status"]
    search_fields = ["title", "description"]
    ordering = ["-created_at"]


class TicketUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class TicketStatsView(APIView):

    def get(self, request):
        tickets = Ticket.objects.all()

        total_tickets = tickets.count()
        open_tickets = tickets.filter(status="open").count()

        first_ticket = tickets.order_by("created_at").first()

        if first_ticket:
            days = (now() - first_ticket.created_at).days + 1
            avg_per_day = total_tickets / days
        else:
            avg_per_day = 0

        priority_data = (
            tickets.values("priority")
            .annotate(count=Count("id"))
        )

        priority_breakdown = {item["priority"]: item["count"] for item in priority_data}

        category_data = (
            tickets.values("category")
            .annotate(count=Count("id"))
        )

        category_breakdown = {item["category"]: item["count"] for item in category_data}

        return Response({
            "total_tickets": total_tickets,
            "open_tickets": open_tickets,
            "avg_tickets_per_day": round(avg_per_day, 2),
            "priority_breakdown": priority_breakdown,
            "category_breakdown": category_breakdown,
        })


class TicketClassifyView(APIView):

    def post(self, request):
        description = request.data.get("description")

        if not description:
            return Response(
                {"error": "Description is required"},
                status=400
            )

        result = classify_ticket(description)

        return Response({
            "suggested_category": result["category"],
            "suggested_priority": result["priority"],
        })
       
