drop view v_cloudinary;
create view v_cloudinary as
select cloudObject ->> '$.public_id'
     , cloudObject -> '$.version'
     , concat(cloudObject ->> '$.original_filename', '.', cloudObject ->> '$.format') fileName
     , cloudObject ->> '$.tags[0]'                                                    imgDir
     , cloudObject ->> '$.secure_url'                                                 secure_url
     , cloudObject ->> '$.url'                                                        url
from cloudinary;

# *******************************************
update goods_pictures pict
    inner join cloudinary cl on cl.fname_gen = pict.pict_number
        and cl.imgDir_gen = pict.pict_dir
set pict.URL=cl.secure_url_gen
where pict.URL is null;
# *******************************************

alter table cloudinary add column fname_gen varchar(255) as (
    cloudObject ->> '$.original_filename'
    )    ;

alter table goods_pictures add column pict_number varchar(50) as (
    left(pict_fname,length(pict_fname)-4)
    )    stored ;


select *
from cloudinary
where concat(cloudObject->> '$.original_filename', '.',
             cloudObject->> '$.format') ='2636.jpg';

set @fn = '751';
select * from cloudinary where fname_gen = @fn;
select * from goods_pictures where pict_number =@fn;
select * from cloudinary order by id desc limit 1;

SELECT LEFT('foobarbar,jpg', length('foobarbar,jpg')-4);

# Удалить дубли в картинках
delete p1
from goods_pictures p1
         inner join goods_pictures p2
                    on p1.pict_fname = p2.pict_fname
                        and p1.pict_dir = p2.pict_dir
                        and p1.id > p2.id
where p1.URL is null
;

select pict_fname,pict_dir, count(*)
from goods_pictures
where URL is null
group by pict_fname,pict_dir
having count(id) >1
order by pict_fname,pict_dir;

select count(*)
from goods_pictures
where URL is not null;


