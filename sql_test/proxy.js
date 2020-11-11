// материал для изучения JS proxy

function negativeArray(array) {
  return new Proxy(array, {
    get: function (target, propKey) {
      if (
        Number(propKey) != NaN &&
        Number.isInteger(Number(propKey)) &&
        Number(propKey) < 0
      ) {
        propKey = String(target.length + Number(propKey));
      }
      return target[propKey];
    },
  });
}

let arr = ["a", "b", "c"];
let arrProxy = negativeArray(arr);
console.log(arrProxy[0]);
console.log(arrProxy[-1]);

let ageValidate = {
  set(item, property, value) {
    if (property === "age") {
      if (!Number.isInteger(value) || value < 0 || value > 150) {
        throw new TypeError("age should be an integer between 0 and 150");
      }
    }
    item[property] = value;
  },
};

const location2postcode = {
  "JavaScript Street": 232200,
  "Python Street": 234422,
  "Golang Street": 231142,
};
const postcode2location = {
  232200: "JavaScript Street",
  234422: "Python Street",
  231142: "Golang Street",
};

let person = {
  name: "Jon",
};
person.postcode = 232200;

let postcodeValidate = {
  set(item, property, value) {
    if (property === "location") {
      item.postcode = location2postcode[value];
    }
    if (property === "postcode") {
      item.location = postcode2location[value];
    }
  },
};

let personProxy = new Proxy(person, postcodeValidate);
console.log(personProxy.location);
personProxy.postcode = 232200;
console.log(personProxy.location);
console.log("==========================");

function setPrivateField(obj, prefix = "_") {
  return new Proxy(obj, {
    has: (obj, prop) => {
      if (typeof prop === "string" && prop.startsWith(prefix)) {
        return false;
      }
      return prop in obj;
    },
    ownKeys: (obj) => {
      return Reflect.ownKeys(obj).filter(
        (prop) => typeof prop !== "string" || !prop.startsWith(prefix)
      );
    },
    get: (obj, prop) => {
      if (typeof prop === "string" && prop.startsWith(prefix)) {
        return undefined;
      }
      return obj[prop];
    },
  });
}

let obj = { a: 1, _value: 22 };
let objProxy = setPrivateField(obj);
console.log(objProxy._value);
for (let key in objProxy) {
  console.log(key);
}
