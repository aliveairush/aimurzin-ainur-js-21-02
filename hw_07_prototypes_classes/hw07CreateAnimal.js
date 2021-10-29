/** Part 1
 Реализовать объект animal, с полем клички, методом eat, выводящим сообщение "/кличка/ ест"
 и методом say, выводящим фразу, "неизвестное животное молчит"  */

'use strict'
const animal = {
    nickname: "Лимп",
    eat() {
        console.log(`${this.nickname} ест`)
    },

    say() {
        console.log("неизвестное животное молчит")
    },

    /** Разработать метод rename, для смены клички животного.
     * Новая кличка должна содержать только кирилические символы, пробелы или символ "-".
     * */
    rename(newNickname) {
        const regexp = /^([а-яА-Я]*_*\s*)*$/g;
        if (regexp.test(newNickname)) {
            this.nickname = newNickname;
        }
    }
};

/** Part 2
 путём прототипного наследования
 создать объекты кота, собаки и попугая. Переопределить в них метод say, в зависимости от типа животного.
 Для кота добавить новый метод hunt, выводящий сообщение "/кличка/ охотится"
 */
const cat = {
    __proto__: animal,

    say() {
        console.log("Meow")
    },

    hunt() {
        console.log(`${this.nickname} охотится`)
    }
};

const dog = {
    __proto__: animal,

    say() {
        console.log("bow wow")
    }
};

const parrot = {
    __proto__: animal,

    say() {
        console.log("Whats up")
    }
};

/**
 Part 3
 Все перечисленные методы и свойства должны быть защищены от удаления и перезаписи.
 Методы должны быть неперечисляемыми.
 */
const attrConfig = {
    enumerable: true,
    writable: true, // ? По условию написано что свойтсва должны быть защищены от перезаписи, но тогда нельзя будет работать rename
    configurable: false
};

const fnConfig = {
    enumerable: false,
    writable: true,  // ? По условию написано что свойтсва должны быть защищены от перезаписи, но тогда нельзя будет перезаписать методы в дочерних объектах
    configurable: false
}


Object.defineProperties(animal, {
    nickname: attrConfig,
    say: fnConfig,
    eat: fnConfig,
    rename: fnConfig
});


Object.defineProperties(cat, {
    nickname: attrConfig,
    say: fnConfig,
    eat: fnConfig,
    hunt: fnConfig,
    rename: fnConfig
});

Object.defineProperties(dog, {
    nickname: attrConfig,
    say: fnConfig,
    eat: fnConfig,
    rename: fnConfig
});

Object.defineProperties(parrot, {
    nickname: attrConfig,
    say: fnConfig,
    eat: fnConfig,
    rename: fnConfig
});

/** PART 4
 Выполнить то же самое использую функции конструкторы
 */

function Animal2(nickname) {
    this.nickname = nickname;

    this.eat = function () {
        console.log(`${this.nickname} ест`);
    }

    this.say = function () {
        console.log("неизвестное животное молчит");
    }

    this.rename = function (newNickname) {
        const regexp = /^([а-яА-Я]*_*\s*)*$/g;
        if (regexp.test(newNickname)) {
            this.nickname = newNickname;
        }
    }

    Object.defineProperties(this, {
        nickname: attrConfig,
        eat: fnConfig,
        say: fnConfig,
        rename: fnConfig
    });
}

function Cat2(nickname) {
    Animal2.call(this, nickname)

    this.say = function () {
        console.log(`Meow`)
    };

    this.hunt = function () {
        console.log(`${this.nickname} охотится`);
    }

    Object.defineProperty(this, 'hunt', fnConfig);
}


function Dog2(nickname) {
    Animal.call(this, nickname);

    this.say = function () {
        console.log("bow wow");
    }
}


function Parrot2(nickname) {
    Animal.call(this, nickname);

    this.say = function () {
        console.log("Whats up");
    }
}

/**
 Выполнить то же самое, используя классы.
 */

'use strict'

class Animal3 {
    _nickname;

    constructor(nickname) {
        this._nickname = nickname
    }

    eat() {
        console.log(`${this._nickname} ест`);
    }

    say() {
        console.log("неизвестное животное молчит");
    }

    get name() {
        return this._nickname;
    }

    /** Rename */
    set name(newNickname) {
        const regexp = /^([а-яА-Я]*_*\s*)*$/g;
        if (regexp.test(newNickname)) {
            this._nickname = newNickname;
        }
    }


}

class Cat3 extends Animal3 {
    constructor(nickname) {
        super(nickname);
    }

    say() {
        console.log(`Meow`)
    };

    hunt() {
        // console.log(this)
        console.log(`${this._nickname} охотится`);
    }
}


class Dog3 extends Animal3 {
    constructor(nickname) {
        super(nickname);
    }

    say() {
        console.log(`bow wow`)
    };
}

class Parrot3 extends Animal3 {
    constructor(nickname) {
        super(nickname);
    }

    say() {
        console.log(`Whats up`)
    };
}