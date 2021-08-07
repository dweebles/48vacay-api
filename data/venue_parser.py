import pandas as pd

venues_csv = pd.DataFrame(pd.read_csv('Amsterdam.csv', usecols=['name', 'rating','latitude', 'longitude', 'state', 'categories', 'address', 'opening_hours_note', 'phone', 'email', 'description_text', 'official_link', 'media_landscape', 'media_portrait'], error_bad_lines=False))
venues_csv.to_json("amsterdam.json", orient="records", date_format="epoch", double_precision=10, force_ascii=True, date_unit="ms", default_handler= None)

print(venues_csv)