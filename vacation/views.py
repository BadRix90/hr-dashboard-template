from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.db.models import Sum
from users.permissions import IsAdminOrManager
from .models import VacationRequest
from .serializers import VacationRequestSerializer, VacationBalanceSerializer

User = get_user_model()

class VacationRequestViewSet(viewsets.ModelViewSet):
    queryset = VacationRequest.objects.all()
    serializer_class = VacationRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role in ['admin', 'manager']:
            return VacationRequest.objects.all()
        return VacationRequest.objects.filter(employee=user)
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(employee=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrManager])
    def approve(self, request, pk=None):
        vacation_request = self.get_object()
        vacation_request.status = 'approved'
        vacation_request.save()
        return Response(self.get_serializer(vacation_request).data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAdminOrManager])
    def reject(self, request, pk=None):
        vacation_request = self.get_object()
        vacation_request.status = 'rejected'
        vacation_request.rejection_reason = request.data.get('reason', '')
        vacation_request.save()
        return Response(self.get_serializer(vacation_request).data)

class VacationBalanceViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    def retrieve(self, request, pk=None):
        try:
            employee = User.objects.get(id=pk)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
        approved_sum = VacationRequest.objects.filter(
            employee=employee, 
            status='approved', 
            type='urlaub'
        ).aggregate(total=Sum('days'))['total'] or 0
        
        pending_sum = VacationRequest.objects.filter(
            employee=employee, 
            status='pending', 
            type='urlaub'
        ).aggregate(total=Sum('days'))['total'] or 0
        
        balance_data = {
            'employee_id': employee.id,
            'total_days': employee.vacation_days,
            'used_days': approved_sum,
            'remaining_days': employee.vacation_days - approved_sum,
            'pending_days': pending_sum
        }
        return Response(VacationBalanceSerializer(balance_data).data)