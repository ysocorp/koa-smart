# Parameters validation

Koa SMART allows you to check the parameters passed to your route in an instinctive and efficient manner.
Indeed, a simple piece of code such as the following:

```sh
import { Route, Types } from 'koa-smart'

@Route.Get({
    queryType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string(),
    }),
  })
  async myRoute(ctx) {
    const myGetParams = this.queryParam(ctx)
    //work with the data...
  }
})
```

```sh
import { Route, Types } from 'koa-smart'

@Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string(),
    }),
  })
  async myRoute(ctx) {
    const myPostParams = this.body(ctx)
    //work with the data...
  }
})
```

is enough to tell koa-smart that you are expecting to receive an object containing a parameter email and a parameter name, both of type string. Furthermore, you can see that email is required, whereas password isn't.

The type definition format is always of the form `Types.typeName()[.typeParam()]*`, as such, you can define a variety of different structures, as described below.

## TypeAny

`Types.any()`

Any represents any possible type of value, It is the most basic type used in Koa-smart.
It should be noted that every other types descend from `Any`, and as such, any method applicable to any is, by extension, applicable to the other types as well.

### required([enabled])

Denotes whether the parameter is required or not. As such, absence of said parameter will generate an error.

If used without argument, defaults to `true`.

### allowNull([enabled])

Denotes whether `null` is considered as a valid value for that parameter.

If used without argument, defaults to `true`.

### error

If an error occured during the validation, returns it. otherwise returns null.

### test(param)

Manually runs a validation on the specified value.

If the validation occured without errors, the possibly transformed value can be retrieved in through `̀type.value`. Otherwise, the error can be found in `type.error`

## TypeArray

`Types.array()`

Array represents a javascript array. It will, by default, only accept an array or a string, which will converted into an array of characters.

### single([enabled])

If enabled, Array will also accept single values such as numbers or objects, and cast them into a size 1 array containing the passed value.

If used without argument, defaults to `true`.

```sh
const schema = Types.array().single();
schema.test(42);
schema.value // [42];
```

### splitBy(splitter)

Defines that a string parameter should be split into an array of strings, according to the given splitter.

```sh
const schema = Types.array().splitBy(',');
schema.test("hello,world,how,are,you");
schema.value // ["hello", "world", "how", "are", "you"];
```

### max(max)

The maximum amount of items the array is allowed to have.

### min(min)

The minimum amount of items the array is allowed to have.

### length(length)

The exact amount of items the array is allowed to have.

### type(itemType)

Describes the type of the items within the array.

```sh
Types.array().types(Types.number().min(10))
```

will only validate an array composed stricly of numbers greater than 10.

## TypeBinary

`Types.binary()`

Represents a `Buffer` type. By default, this type will accept strings and arrays, and will convert them into Buffer objects.

### encoding(name)

Sets the string encoding format that should be used to read the buffer.

Only works when given a string value.

### max(max)

Defines The maximum size the buffer is allowed to have.

### min(min)

Defines The minimum size the buffer is allowed to have.

### length(length)

Defines The exact size the buffer is allowed to have.

## TypeBoolean

`Types.boolean()`

### truthy(value)
Allows for additional values to be considered valid booleans by converting them to true during validation.
Accepts a value or an array of values.

### falsy(value)

Allows for additional values to be considered valid booleans by converting them to false during validation.
Accepts a value or an array of values.

### insensitive([enabled])

Allows the values provided to truthy and falsy as well as well as "true" and "false" to be matched in a case insensitive manner.

Enabled by default.

## TypeDate

`Types.date()`

Represents a native javascript date. accepts ISO formated strings by default.

### min(min)

Defines the oldest allowed date.

### max(max)

Defines the latest allowed date.

### between(min, max)

Defines a range of allowed dates.
Equivalent to the following:

```sh
const schema = Types.date().min(dateFrom).max(dateTo);
```

### startOf(period)

If set, the date will be set to the start of the given period.

`year`, `month`, `quarter`, `week`, `isoWeek`, `day`, `date`, `hour`, `minute`, `second` are valid values.

```sh
const schema = Types.date().startOf('month');
schema.test('5-21-2018');
schema.value // new Date('5-1-2018');
```

### endOf(period)

If set, the date will be set to the end of the given period.

The accepted values are the same as [startOf](###startof-period-)

### formatIn(format)

Defines the input format for the date.

This function uses momentjs as its underlying library, and as such, uses the [same formatting](https://momentjs.com/docs/#/displaying/format/)

```sh
const schema = Types.date().formatIn('DD/MM/YYYY');
schema.test('26/05/2018');
schema.value // new Date('5-26-2018');
```

### formatOut(format)

Defines an output format for the date. if this parameter is used, date will return a string instead of a Date object.

The formatting is the same as [formatIn](#formatin-format-)'s

```sh
const schema = Types.date().formatOut('DD/MM/YYYY');
schema.test('5-26-2018');
schema.value // '26/05/2018';
```

### iso()

Defines the input format as the ISO_8601 format.

## enum

Enum is used to validate a value against a predetermined set.

### number([enabled])

Defines that the expected value is a number, and should be checked against a set of numeric values.

If used without argument, defaults to `true`.

### oneOf(obj1 [, obj2, ..., objN])

Defines the set of values to be checked against the parameter.

```sh
const schema = Types.enum().oneOf('yes', 'no');
schema.test('yes');
schema.value // 'yes';
```

### insensitive([enabled])

Defines that the parameter must be checked against the value set in a case insensitive manner. Only works with strings.

If used without argument, defaults to `true`.

## TypeNumber

`Types.number()`

Represents a javascript number. Accepts numbers and strings by default. Strings will be converted into numbers.

### min(min)

Defines the minimum value the parameter is allowed to have.

### max(max)

Defines the maximum value the parameter is allowed to have.

### between(min, max)

Defines a range of value the parameter is allowed to have.

Equivalent to the following:

```sh
const schema = Types.number().min(4).max(8);
```

### integer([enabled])
Defines that the parameter should be an integer. If this option is enabled, any float number received will be truncated.

### multiple(base)
Defines that the parameter should be a multiple of base.

```sh
const schema = Types.number().multiple(2);
schema.test(4);
schema.value // 4;
schema.test(3);
schema._hasError // true
```

### positive([enabled])

Defines that the parameter should be a positive number.

### negative([enabled])

Defines that the parameter should be a negative number.

### port([enabled])

Defines that the parameter should be a valid port number, which is equivalent to:

```sh
const schema = Types.number().between(0, 65535);
```

### precision(limit, type)

Defines the precision of the parameter, as well as the function that should be used to modify it.
The accepted values for type are: `trunc`, `floor`, `ceil` and `round`.

If no value is provided, will default to `trunc`.

## TypeObject

`Types.object()`

Represents a javascript object.

### keys(keyTypes)

defines the keys allowed within the object. This function takes an object where the object's keys represent the fields allowed within the parameter, and the object's values represent the types of the parameters' fields.

```sh
const schema = Types.object().keys({
  field1: Types.string().min(4),
  field2: Types.boolean().truthy('Y'),
  field3: Types.array().types(Types.number().max(20)).required()
});

schema.test({
  field1: "hello",
  field2: true,
  field3: [4, 6]
})

schema._hasError // false, the object passes the given schema

schema.test({
  field1: "hello",
  field3: [4, 6]
})

schema._hasError // false, the object passes the given schema, and field2 is optional

schema.test({
  field1: "hello",
  field2: true,
})

schema._hasError // true, field3 is required

schema.test({
  field1: "hi",
  field2: true,
  field3: [4, 6]
})

schema._hasError // true, field1 should be a string with at least 4 characters.
```

### errors

Unlike most other types, Object possesses an additional "errors" field, which allows the user to retrieve the error that happened on each field and subfield of the object.

```sh
const schema = Types.object().keys({
  field1: Types.string().min(4),
  field2: Types.boolean().truthy('Y'),
  field3: Types.array().types(Types.number().max(20)).required()
});

schema.test({
  field1: "hello",
  field2: true,
})

schema.errors // {field3: "Is required"}
```

In the case object contains other objects who themselves contain erroenous fields, errors will be set as follow:

```sh
const schema = Types.object().keys({
  field: Types.object().keys({
    subfield1: Types.string(),
    subfield2: Types.number()
  })
});

schema.test({
  field: {
    subfield1: "hello",
    subfield2: "not a number"
  }
})

schema.errors // {'field.subfield2': "Expect type number"}
```

## TypeOneOf

`Types.oneOf()`

Represents a selection of types.

### types(typesArray)

Defines the types allowed by the oneOf.

```sh
const schema = Types.oneOf().types([Types.number(), Types.string()])

schema.test(4)
schema._hasError // false

schema.test("hello")
schema._hasError // false

schema.test(new Date())
schema._hasError // true
```

## TypeString

`Types.string()`

Represents a javascript string.

### trim([enabled])

Defines whether the given string should be [trimmed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim).

### min(min)

Defines the minimum length the string is allowed to have.

### max(max)

Defines the maximum length the string is allowed to have.

### length(len)

Defines the minimum value the parameter is allowed to have.

### between(min, max)

Defines the range in which the string's length must be.

### regex(regex)

Defines the the regular expression the string must match in order to be validated

### uppercase([enabled])

If enabled, the string's alphabetic characters will be converted entirely into uppercase.

### lowercase([enabled])

If enabled, the string's alphabetic characters will be converted entirely into lowercase.

### truncate([enabled])

if truncate is enabled, and either `max` or `length` have been defined, then instead of rejecting a string with a longer size than allowed maximum, the string in question will be truncated to fit the right size.

```sh
const schema = Types.string().max(5).truncate()

schema.test("hello world")
schema.value // 'hello'
```

### replace(pattern, replaceWith)

If set, the occurence defined by `pattern` in the string will be replaced with the `replaceWith` parameter

## Creating your own type

it is possible to create your own type with koa-smart.

In order to do it, you'll have to extend the [any](#typeany) type presented above, as well as implement the `_testType`, `_transform` and `_test` methods.

```sh
import { TypeAny, Types } from 'koa-smart';

class TypeTest extends TypeAny {

  _testType() { // test that you are given a correctly typed value here.
    if (typeof this._value !== "string") {
      this._setError(this._errorCodes.INVALID_TYPE) // you can use a predefined error code, or a custom string
    }
  }

  _transform() { // this is where you perform any needed transformation on your type, such as trimming a string
    this._value = `hello, ${this._value}`;
  }

  _test() {// this is where you test most of the conditions you have set up
    if (true) { // any condition here...
      this._setError(this._errorCodes.INVALID_VALUE);
    }

  }

  Type.yourType = () => new TypeTest() // this allows you to add your type to the `Types` object.
}
```
