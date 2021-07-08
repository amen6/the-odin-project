# The-Odin-Project 
This is the final **Html** and **Css** project, the goal is to build my own simple **12-column** grid-based framework, inspired by bootstrap and using it to clone any specific website that can be repeteadly used, it also should be fully responsive, all you have to do is use the class name you need. I also used a Css pre-processor which reduces repetition of CSS and therefore saves time, the pre-processor is **Sass**, and i used it to build this framework. To compile **Sass** to **Css**, i used [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass), which is an extension in [VS Code](https://code.visualstudio.com/).
This framework is supposed to be open-ended, it could be edited by adding, removing or changing something in it.

> The official website could updates some images, or something else so the view will be different a little
___

## How it works

### Setting Columns

- `col-[1 → 12]-in-12`:

    This **class** allows you to use columns and create a responsive layout. No need to specify anything else, you should add it to every child and specify the amount of columns you want it to takes *-how many column to span-*, **[1 → 12]** columns.

    - #### Code snippet

    First, i made a made a map having numbers from 1 to 12
    `$widthColumns: (
        1:1,
        2:2,
        3:3,
        4:4,
        5:5,
        6:6,
        7:7,
        8:8,
        9:9,
        10:10,
        11:11,
        12:12
    );`

    Secondly, i used `@each` rule to create classes, the syntax looks
    like
    `@each $number, $value in $widthColumns {
        .col-#{$number}-in-12 {
            width: (100% * ($value/12));
        }
    }`

### Padding and Margin classes

- `[p/m][t/r/b/l/il/bl/-all]-[0→5]`:

  - `[p/m]`: define if it's *padding* or *margin*
  - `[t/r/b/l/il/bl/-all]`: *top, right, bottom, left, inline,block, -all*
  - `[0→5]`: specify the padding/margin amount

- #### Code snippet 

    Firstly, i created two maps, specifying the padding/margin amount, and all sides and their abbreviation 

    `$margin/padding: (
    0: 0rem,
    1: .4rem,
    2: .8rem,
    3: 1.6rem,
    4: 2.4rem,
    5: 4.8rem,
    "auto": auto
    );`

    `$sides: (
    "t": -top,
    "r": -right,
    "b": -bottom,
    "l": -left,
    "il": -inline,
    "bl": -block,
    "-all": ""
    );`

    Secondly, i used `@each` rule to create classes, the syntax looks
    like

    `@each $number, $value in $margin {
    @each $abbr, $direction in $sides {
        .m/p#{$abbr}-#{$number} {
            margin#{$direction}: $value;
        }
      }   
    }`

> The **/** stands for **or**  

___

## Screenshot

![web header](images/header.png)

## FullScreen Capture

[Desktop Pdf](pdf/desktop.pdf)

[Desktop Png](images/desktop.png)