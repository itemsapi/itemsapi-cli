[![ItemsAPI](http://res.cloudinary.com/abcdefgh123456/image/upload/c_scale,w_150/v1479983228/t2BmYaxc_k705u7.jpg)](https://www.itemsapi.com/)

# ItemsAPI CLI

## Installation

```sh
$ npm install -g itemsapi-cli
```

## Commands

### Generator

Generating new ItemsAPI starter application 

```bash
$ itemsapi generate my-app 
```

### Project (collection + mapping)

Create project using JSON filename
```bash
$ itemsapi projects create --api=http://localhost:5000/api/v1 --filename=movies.json
```

Create project using JSON url
```bash
$ itemsapi projects create --api=http://localhost:5000/api/v1 --url=https://raw.githubusercontent.com/itemsapi/itemsapi-example-data/master/items/movies-processed.json
```

### Collections

Print all
```bash
$ itemsapi collections list --api=http://localhost:5000/api/v1
```

### Items

Importing data
```bash
$ itemsapi items import --collection zouespow --filename data.json --api=http://localhost:5000/api/v1
```

### Help

General help
```bash
$ itemsapi --help
```

Sub-command help
```bash
$ itemsapi items --help
```

Specific command help
```bash
$ itemsapi items import --help
```
