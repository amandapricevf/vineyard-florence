from pathlib import Path
from time import sleep
from urllib.error import HTTPError
from urllib.request import Request, urlopen

BASE = "https://www.vineyardflorence.church/s/"
FILES = [
    "Alone-Time-wGod-Prayer-Guide.pdf",
    "Circle-of-Accountability.pdf",
    "DMM-Prayers.pdf",
    "Fasting-and-Feasting.pdf",
    "John-Wesley-Covenant-Prayer-hm6b.pdf",
    "Kingdom-Prayer-DMM.pdf",
    "Learning-to-Hear-Gods-Voice.pdf",
    "Lectio-Divina-1.pdf",
    "Persecuted-Church-Prayer.pdf",
    "Personal-Prayer-Time-based-on-the-Disciples-Prayer.pdf",
    "Prayer-Hexagon.jpg",
    "Prayer-Wheel.pdf",
    "Prayer-Cycle-Movement-Prayer.pdf",
    "Prayer-of-Examen.pdf",
    "Praying-for-Disciple-Making-Movements.pdf",
    "The-Prayer-Triangle-1.pdf",
    "Vineyard-5-Step-Prayer-Model.pdf",
    "Workers-for-the-Harvest.pdf",
]

target = Path(__file__).resolve().parents[1] / "public" / "resources" / "discipleship"
target.mkdir(parents=True, exist_ok=True)
for name in FILES:
    output = target / name
    if output.exists():
        continue
    for attempt in range(5):
        try:
            with urlopen(Request(BASE + name, headers={"User-Agent": "Mozilla/5.0"}), timeout=30) as response:
                content = response.read()
            break
        except HTTPError as error:
            if error.code != 429 or attempt == 4:
                raise
            sleep(3 * (attempt + 1))
    magic = b"\xff\xd8" if name.endswith(".jpg") else b"%PDF"
    if not content.startswith(magic):
        raise RuntimeError(f"Unexpected file data for {name}")
    output.write_bytes(content)
    print(name, len(content))
    sleep(1)
