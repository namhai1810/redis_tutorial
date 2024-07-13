# REDIS TUTORIAL
> Use nnh1810k2003@gmail.com in rbook.com to see basic command and idea about redis
### 1. Design redis
![image](https://github.com/user-attachments/assets/677715a6-2b97-48bf-811d-9e7b60ebe5b8)
##### What we need to concern to create redis:
- Type of data storing
- concerned about what we will store in redis: (should be static pages). If we store dashboard in redis, each user have a single dashboard,
 and they want to reload to get new newfeeds, as a result, you have to store for each user each key and value,
 which can lead to overwhemling data. We should convern about a static data such as contact info, sign in and sign out.
- key naming is essential, because it is unique and can be updated and people who looking for is easy. Tip: use ':' to seperate part of key, '#' for unique ID
For example: pagecached#privacy, pagecached#auth/sigin (saved base router)
