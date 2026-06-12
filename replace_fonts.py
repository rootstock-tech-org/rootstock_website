import os, glob
for f in glob.glob('src/**/*.tsx', recursive=True):
    with open(f, 'r') as file:
        data = file.read()
    if 'font-inter' in data or 'font-outfit' in data:
        data = data.replace('font-inter', 'font-serif').replace('font-outfit', 'font-serif')
        with open(f, 'w') as file:
            file.write(data)
