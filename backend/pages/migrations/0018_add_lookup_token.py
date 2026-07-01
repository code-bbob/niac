import uuid
from django.db import migrations, models


def gen_lookup_tokens(apps, schema_editor):
    EventBooking = apps.get_model("pages", "EventBooking")
    for booking in EventBooking.objects.all():
        booking.lookup_token = uuid.uuid4()
        booking.save(update_fields=["lookup_token"])


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0017_event_bank_account_name_event_bank_account_type_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="eventbooking",
            name="lookup_token",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, null=True, unique=False
            ),
        ),
        migrations.RunPython(gen_lookup_tokens, reverse_code=migrations.RunPython.noop),
    ]
