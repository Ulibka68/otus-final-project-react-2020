###### Финальный проект курса Otus React 2020


Прообраз заготовки:

https://next-auth.js.org/

https://github.com/nextauthjs/next-auth-example

github авторизация - получить token
https://github.com/settings/developers

При деплое не забудь обновить переменную в ENV Vercel:
NEXTAUTH_URL
Для деплоя необходимо зарегистрировать новое приложение в github

##### EMOTION
 Без дополнительных настроек в Next 10 версии доступен emotion 11 версии<br>
 Для emotion 10 версии нужна дополнительная конфигурация в Next
 
##### Cloudinary
Правильно настраивай доступ к Cloudinary    
https://nextjs.org/docs/basic-features/image-optimization#loader
 
Если вы хотите использовать облачного провайдера для оптимизации изображений **вместо** использования встроенной оптимизации изображений Next.js, 
вы можете настроить загрузчик и префикс пути. 
Это позволяет использовать относительные URL-адреса для Image src и автоматически 
генерировать правильный абсолютный URL-адрес для вашего провайдера.

Нельзя в конфигруации одновременно использовать  loader и domains - выбирай что то одно
Например рабочая конфигурация:
module.exports = {
  images: {
    domains: ["res.cloudinary.com", "assets.vercel.com"],
  },
};
 