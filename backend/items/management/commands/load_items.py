import json

from pathlib import Path

from django.core.management.base import BaseCommand

from items.models import Item


class Command(BaseCommand):
    help = "Load items from JSON file"

    def handle(self, *args, **kwargs):
        base_dir = Path(__file__).resolve().parents[4]

        json_path = (
            base_dir
            / "frontend"
            / "src"
            / "data"
            / "items.json"
        )

        with open(
            json_path,
            "r",
            encoding="utf-8",
        ) as file:
            items = json.load(file)

        created_count = 0

        for item in items:
            _, created = Item.objects.get_or_create(
                key=item["key"],
                value=item["value"],
            )

            if created:
                created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully loaded {created_count} items"
            )
        )