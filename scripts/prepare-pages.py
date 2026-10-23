"""Apply the GitHub Pages origin supplied by configure-pages to static metadata."""
from html import escape
from pathlib import Path
from urllib.parse import urlsplit
import os
import re

site_url = os.environ.get("SITE_URL", "").strip()
url = urlsplit(site_url)
if url.scheme != "https" or not url.netloc or url.username or url.password or url.query or url.fragment:
    raise SystemExit("SITE_URL must be the HTTPS base URL returned by configure-pages")
site_url = escape(site_url.rstrip("/") + "/", quote=True)
target = Path(__file__).resolve().parents[1] / "dist" / "index.html"
source = target.read_text(encoding="utf-8")
source = re.sub(r'<meta\s+property="og:url"\s+content="[^"]*"\s*/?>', "", source)
source = re.sub(r'<link\s+rel="canonical"\s+href="[^"]*"\s*/?>', "", source)
source = source.replace("</head>", f'<meta property="og:url" content="{site_url}">\n<link rel="canonical" href="{site_url}">\n</head>', 1)
target.write_text(source, encoding="utf-8")
print("GitHub Pages metadata configured")
