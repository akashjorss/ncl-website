"""Render the social preview from the site's own typography and field motif."""
from PIL import Image, ImageDraw, ImageFont
import math
im = Image.new('RGB', (1200, 630), '#f7f6f2')
d = ImageDraw.Draw(im)
def serif(size): return ImageFont.truetype('assets/fonts/newsreader.ttf', size)
def sans(size): return ImageFont.truetype('assets/fonts/dm-sans.ttf', size)
d.text((62, 45), 'NCL', font=serif(43), fill='#202723')
d.text((160, 55), 'Neural Continuity Labs', font=sans(15), fill='#202723')
d.line((62, 108, 1138, 108), fill='#d7d9cf')
d.text((62, 169), 'Neural physics', font=serif(74), fill='#202723')
d.text((62, 247), 'for the real world.', font=serif(74), fill='#202723')
d.text((62, 439), 'Reconstruct. Model. Understand.', font=sans(19), fill='#60675f')
d.text((62, 549), 'neuralcontinuitylabs.com', font=sans(14), fill='#60675f')
d.rectangle((710, 159, 1138, 517), fill='#030d18')
for j in range(40):
    points = []
    for x in range(710, 1139):
        k = (x-710)/428
        y = 165+j*9+30*math.sin(k*5.7+j*.015)+16*math.sin(k*9.2)
        if 159 < y < 518: points.append((x, y))
    if len(points) > 1: d.line(points, fill='#2b626b', width=1)
for x, y in [(.14,.32), (.30,.68), (.43,.22), (.61,.55), (.78,.29), (.88,.75)]:
    x = 710+x*428; y = 159+y*358
    d.ellipse((x-5,y-5,x+5,y+5), outline='#467b83', width=1)
    d.ellipse((x-1.5,y-1.5,x+1.5,y+1.5), fill='#c2e7e5')
im.save('assets/og.png', optimize=True)
