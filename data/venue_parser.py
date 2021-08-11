from glob import glob
import pandas as pd

csv_files = glob("csv/*.csv")

dfList_venues = [pd.DataFrame(pd.read_csv(file, usecols=['name', 'rating', 'latitude', 'longitude', 'state', 'categories', 'address', 'opening_hours_note',
                       'phone', 'email', 'description_text', 'official_link', 'media_landscape', 'media_portrait'], error_bad_lines=False)) for file in csv_files]

for (idx, df) in enumerate(dfList_venues):
    df.to_json("json/{}.json".format(idx), orient="records", date_format="epoch",
                      double_precision=10, force_ascii=True, date_unit="ms", default_handler=None)
    print(df)
