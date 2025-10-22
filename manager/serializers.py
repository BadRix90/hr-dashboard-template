from rest_framework import serializers

class TeamMemberSerializer(serializers.Serializer):
    name = serializers.CharField()
    hours_worked = serializers.IntegerField()
    overtime_hours = serializers.IntegerField()
    vacation_days = serializers.IntegerField()
    status = serializers.CharField()

class OvertimeEntrySerializer(serializers.Serializer):
    employee = serializers.CharField()
    date = serializers.DateField()
    hours = serializers.FloatField()
    reason = serializers.CharField()