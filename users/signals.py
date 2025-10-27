from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.conf import settings

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    frontend_url = settings.CORS_ALLOWED_ORIGINS[0].rstrip('/')
    reset_url = f"{frontend_url}/password-reset-confirm/{reset_password_token.key}"
    
    send_mail(
        subject="Passwort zurücksetzen - HR Dashboard",
        message=f"Hallo {reset_password_token.user.username},\n\n"
                f"Klicke auf den Link, um dein Passwort zurückzusetzen:\n{reset_url}\n\n"
                f"Der Link ist 24 Stunden gültig.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[reset_password_token.user.email],
        fail_silently=False,
    )