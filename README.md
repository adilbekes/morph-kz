# Morph KZ

Библиотека для склонения и преобразования слов казахского языка. 

Ниже представлена оригинальная документация к phpMorphy, с поправкой на javascript-синтаксис и реализованные возможности.

## Возможности
Библиотека позволяет решать следующие задачи:
1. Множественное числа (изменение форм слов путём прибавления окончаний множественных чисел);
2. Притяжательные окончания (изменение форм слов для указывания принадлежности предмета);
3. Личные окончания (изменение форм слов выступающие в роли сказуемого);
4. Склонение (изменение форм слов падежам);

## Установка

### Для NodeJS
Используйте npm:
```
npm install morph-kz
```

Или вручную. Ссылка: [morph.min.js](https://raw.github.com/adilbekes/morph-js/src/index.js)

## Подключение

В браузере:

```html
<script src="/path/to/morph-kz/src/index.js"></script>
```

В NodeJS:

```JavaScript
var morph = require('morhp-kz');
```

## Cписок параметров и их возможных значений
 
Местоимение (side):
- 1 - первое лицо
- 2 - второе лицо
- 3 - третье лицо

Падежи (declension):
- nominative (1)
- genitive (2)
- dative_directional, dative, directional (3)
- accusative (4)
- locative (5)
- ablative (6)
- instrumental (7)

## Использование
Для использования множественных чисел
* @param {string} str The noun/name/string
```JavaScript
// вызываем функцию, указав слово:
pluralize('алма'); // вернет слово: алмалар
```

Для использования притяжательных окончаний
* @param {string} str The noun/name/string
* @param {number} side The side: my/our - 1, your/yours - 2, others - 3
* @param {boolean} formal The number: formal - true, unformal - false (when side is 1 or 2)
```JavaScript
// when side is 1
belong('алма'); // вернет слово (мое яблоко): алмам
belong('алма', 1); // вернет слово (мое яблоко): алмам
belong('алма', 1, false); // вернет слово (мое яблоко): алмам
belong('алма', 1, true); // вернет слово (наше яблоко): алмамыз

// when side is 2
belong('алма', 2); // вернет слово (твое яблоко): алмаң
belong('алма', 2, false); // вернет слово (твое яблоко): алмаң
belong('алма', 2, true); // вернет слово (ваше яблоко): алмаңыз

// when side is 3
belong('алма', 3); // вернет слово (его/её/их яблоко): алмасы
```

Для использования личных окончаний
* @param {string} str The noun/name/string
* @param {number} side The side: my/our - 1, your/yours - 2, others - 3
* @param {boolean} formal The number: formal - true, unformal - false (only when side is 2)
* @param {number} number The number: singular - 1, plural - 2

```JavaScript
// when side is 1 and singular
personalize('алма'); // вернет слово (я яблоко): алмамын
personalize('алма', 1); // вернет слово (я яблоко): алмамын
personalize('алма', 1, 1); // вернет слово (я яблоко): алмамын

// when side is 1 and plural
personalize('алма', 1, 2); // вернет слово (я яблоко): алмамыз

// when side is 2 and singular
personalize('алма', 2); // вернет слово (ты яблоко): алмасың
personalize('алма', 2, 1); // вернет слово (ты яблоко): алмасың
personalize('алма', 2, 1, false); // вернет слово (ты яблоко): алмасың
personalize('алма', 2, 1, true); // вернет слово (вы яблоко): алмасыз

// when side is 2 and plural
personalize('алма', 2, 2); // вернет слово (вы яблоко): алмасыңдар
personalize('алма', 2, 2, false); // вернет слово (вы яблоко): алмасыңдар
personalize('алма', 2, 2, true); // вернет слово (вы яблоко): алмасыздар

// when side is 3
personalize('алма', 3); // вернет слово (он/она/они яблоко): алма
```

Для склонения по падежам
* @param {string} str The noun/name/string
* @param {string|number} declension The declension: nominative - 1, genitive - 2, dative_directional, dative, directional - 3, accusative - 4, locative - 5, ablative - 6, instrumental - 7
```JavaScript
// Normative case
decline('алма'); // вернет слово: алма
decline('алма', 1); // вернет слово: алма
decline('алма', 'nominative'); // вернет слово: алма

// Genitive case
decline('алма', 2); // вернет слово: алманың
decline('алма', 'genitive'); // вернет слово: алманың

// Dative-Directional case
decline('алма', 3); // вернет слово: алмаға
decline('алма', 'dative_directional'); // вернет слово: алмаға
decline('алма', 'dative'); // вернет слово: алмаға
decline('алма', 'directional'); // вернет слово: алмаға

// Accusative case
decline('алма', 4); // вернет слово: алманы
decline('алма', 'accusative'); // вернет слово: алманы

// Locative case
decline('алма', 5); // вернет слово: алмада
decline('алма', 'locative'); // вернет слово: алмада

// Ablative case
decline('алма', 6); // вернет слово: алмадан
decline('алма', 'ablative'); // вернет слово: алмадан

// Instrumental case
decline('алма', 7); // вернет слово: алмамен
decline('алма', 'instrumental'); // вернет слово: алмамен
```

