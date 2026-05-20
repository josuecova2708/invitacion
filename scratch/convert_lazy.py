import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

def replace_lazy_bg(match):
    style_content = match.group(1)
    url = match.group(2)
    style_after = match.group(3)
    new_style = f'style="{style_content}{style_after}"'
    return f'class="lazy-bg" data-bg="{url}" {new_style}'

html = re.sub(r'style="([^"]*)(?:background-image|background):\s*url\([\'"]?(https://minio-[^)\'"]+)[\'"]?\);?([^"]*)"', replace_lazy_bg, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
