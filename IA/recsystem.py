import pandas as pd
from sklearn.neighbors import NearestNeighbors


rating_books = pd.read_csv(r"C:\Users\saida\OneDrive\Bureau\said\IA\data.csv", encoding='latin-1')

# Take 1 % data as sample  
rating_books_sample = rating_books.sample(frac=.07, random_state=1) 

print(rating_books_sample.head())

# Shape of the sample data
rating_books_sample.shape

rating_books_pivot = rating_books_sample.pivot_table(index='offre', columns='idclient', values='score').fillna(0)

# Show top-5 records
print(rating_books_pivot.head())



# Import NearestNeighbors

# Build NearestNeighbors Object
model_nn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=7, n_jobs=-1)

# Fit the NearestNeighbor
model_nn.fit(rating_books_pivot)


# Get top 10 nearest neighbors 
try:
    indices=model_nn.kneighbors(rating_books_pivot.loc[['developpeur python']], 10, return_distance=False)
except  KeyError:
    indices = 0

# Print the recommended books
print("Recommended Offers:")
print("==================")
print(rating_books_pivot)
for index, value in enumerate(rating_books_pivot.index[indices][0]):
    print((index+1),". ",value)