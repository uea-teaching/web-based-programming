---
title: Drawing Graphics
subtitle: Accessing the canvas API
section-titles: false
---

# Dr. David Greenwood

david.greenwood@uea.ac.uk

SCI 2.16a

# Canvas

The Canvas *API* provides a means for drawing graphics using JavaScript and the HTML `<canvas>` element.

::: notes
The canvas element is arguably the single most powerful HTML5 element, 
although its real power lies in the Canvas context, 
which you obtain from the canvas element itself.
:::

## Documentation

* [W3Schools](https://www.w3schools.com/tags/ref_canvas.asp)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
* [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

::: notes
It is best to refer to canonical documentation for the Canvas API.
Here are some links to recommended documentation.
:::


## Canvas HTML element {data-auto-animate="true"}


`<canvas id="mycanvas" width="150" height="150"></canvas>`

* The `<canvas>` element has two attributes, width and height.
* Both are optional and can be set using DOM properties.
* Default values are 300 pixels wide and 150 pixels high.
* The `id` attribute is a global HTML attribute.


## Canvas HTML element {data-auto-animate="true"}

* The element can be sized by CSS, but during rendering is scaled to fit its layout size.
* If the CSS sizing doesn't respect the ratio of the initial canvas, it will appear distorted.


## Canvas HTML element {data-auto-animate="true"}

``` {.html}
<canvas id="mycanvas" width="150" height="150">
  display this text if the browser does not support HTML5 canvas
</canvas>
```

* Fallback content is placed between the open and closing tags.
* The closing tag is *required*, else all subsequent content is ignored.


## Canvas HTML element {data-auto-animate="true"}

``` {.html data-line-numbers="|9" } 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Canvas</title>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script src="script.js"></script>
</body>
</html>
```

::: notes
The HTML is simple and concise. 
The `<canvas>` element is the only element that is required beyond the standard boiler plate.
:::


## The rendering context  {data-auto-animate="true"}

The `<canvas>` element creates a fixed-size drawing surface that exposes a rendering *context*.


## The rendering context  {data-auto-animate="true"}

We will use the 2D rendering context.

::: notes
Other contexts provide different types of rendering; for example, WebGL uses a 3D context based on OpenGL.
:::


## The rendering context  {data-auto-animate="true"}

``` {.js }
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

## The rendering context  {data-auto-animate="true"}

Access the Canvas API via the `ctx` object.

You can inspect the context object in the console.

``` {.js }
console.log(ctx);
```


## Drawing {data-auto-animate="true"}

The rendering context has a coordinate system 
which, by default, places the *origin* at the 
top left corner of the canvas.

Each unit of length is 1 pixel.

::: notes
NB. This is by default. It is possible to transform the coordinate system.
:::


## Drawing {data-auto-animate="true"}

Canvas supports two primitive shapes: rectangles and paths.

There are three functions that draw rectangles on the canvas:

* `fillRect(x, y, width, height)` 
* `strokeRect(x, y, width, height)` 
* `clearRect(x, y, width, height)` 

::: notes
(x, y) are the coordinates of the top left corner of the rectangle.
Draws a filled rectangle.
Draws a rectangular outline.
Clears the specified rectangular area, making it fully transparent.
:::


## Drawing {data-auto-animate="true"}

A path is a list of points, connected by segments of lines that can be of different shapes, of different width and of different color.


## Drawing {data-auto-animate="true"}

It is possible to build any complex shape using a combination of the path tools.


## Drawing {data-auto-animate="true"}

::: columns

:::: column

![](assets/triangle.png)

::::

:::: column

``` {.js }
ctx.fillStyle = "red";
ctx.beginPath();
ctx.moveTo(75, 200);
ctx.lineTo(300, 375);
ctx.lineTo(300, 25);
ctx.fill();
```
::::

:::

## Drawing {data-auto-animate="true"}

To draw curved lines we use the arc functions.

* `arc(x, y, radius, startAngle, endAngle, counterclockwise)`
* `arcTo(x1, y1, x2, y2, radius)`

::: notes
Draws an arc which is centred at (x, y) position with radius r starting at 
startAngle and ending at endAngle 
going in the given direction 
indicated by counterclockwise (defaulting to clockwise).

Draws an arc with the given control points and radius, 
connected to the previous point by a straight line.
:::

## Drawing {data-auto-animate="true"}

`ctx.fillStyle = 'coral';`

#
### Animation

## {data-auto-animate="true"}
#### `requestAnimationFrame()` 

This method tells the browser that you wish to perform an animation and requests that the browser calls a callback function to update an animation before the next repaint. 


## {data-auto-animate="true"}
#### `requestAnimationFrame()` 

The callback function is passed a *timestamp*.

The timestamp is the number of milliseconds since the page was loaded.


## H2 header

### H3 header

#### H4 header
