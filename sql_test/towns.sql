# города россии на local
select
#        json->'$[*].type' ,
#       json->'$[*].slug',
      json->'$[0]'
from t1
;


# {"slug": "moskovskaya", "type": "obl", "label": "Московская", "localities":
select json->'$[0]' from t1;
# {"slug": "leningradskaya", "type": "obl", "label": "Ленинградская", "localities": [{"slug": "sankt-peterburg", "type": "city", "label": "Санкт-Петербург", "districts"
select
       json->'$[1].slug'
       ,json->'$[1].type'
       ,json->'$[1].label'
from t1;

select
       json->'$[*].slug'
from t1;


# {"slug": "moskva", "type": "city", "label": "Москва", "districts": [{"slug": "akademicheskiy",
select json->'$[0].localities[0]' from t1;

# [{"slug": "akademicheskiy", "label": "Академический"}, {"slug": "alekseevskiy", "label": "Алексеевский"},
select json->'$[0].localities[0].districts' from t1;


