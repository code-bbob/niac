from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0018_add_lookup_token"),
    ]

    operations = [
        migrations.AlterField(
            model_name="eventbooking",
            name="lookup_token",
            field=models.UUIDField(
                default=uuid.uuid4,
                editable=False,
                unique=True,
                help_text="Unique token for returning to this booking",
            ),
        ),
    ]
