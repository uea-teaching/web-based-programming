---
title: Canvas 2D Graphics
subtitle: Web Based Programming - CMP4011A
author: Dr. David Greenwood
date: \today
---

# Contents

::: incremental

- The `canvas` element
- The rendering _context_
- Drawing shapes
- Sprites
- Animation with `requestAnimationFrame`
- Responding to events

:::

## Documentation

- [W3Schools](https://www.w3schools.com/tags/ref_canvas.asp)
- [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

::: notes
It is best to refer to canonical documentation for the Canvas API.
Here are some links to recommended documentation.
:::

## Further reading

Eloquent JavaScript has a chapter on the canvas element.

- [https://eloquentjavascript.net](https://eloquentjavascript.net)

#

::: r-fit-text
`<canvas>`
:::

::: notes
This is where it starts - the canvas DOM element.
:::

## Canvas element {data-auto-animate="true"}

A canvas is a single DOM element that contains a picture.

Unlike an SVG picture, the canvas does not preserve shapes such that they can be moved or resized.

The only way to move a shape is to _clear_ the canvas and _redraw_ it.

## Canvas element {data-auto-animate="true"}

```{.html}
<canvas width="150" height="150"></canvas>
```

- Two attributes: width and height.
- Both optional
- Can be set using DOM properties.
- Default values are 300 wide 150 high.

::: notes
Later, we will be able to access this particular canvas with getElementByID.
:::

## Canvas element {data-auto-animate="true"}

- A new canvas is transparent and shows as an empty space in the document.
- The element can be sized by CSS, but during rendering is scaled to fit its layout size.
- If the CSS sizing doesn't respect the ratio of the initial canvas, it will appear distorted.

::: notes
This behaviour is similar to an image.
:::

## Canvas element {data-auto-animate="true"}

```{.html}
<canvas width="150" height="150">
  display this text if the browser
  does not support HTML5 canvas
</canvas>
```

- Fallback content is placed between the open and closing tags.
- The closing tag is **required**...
  - ...else all subsequent content is ignored.

## Canvas element {data-auto-animate="true"}

```{.html data-line-numbers="|10" }
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
    <title>HTML Canvas</title>
</head>
<body>
    <canvas id="canvas"></canvas>
</body>
</html>
```

::: notes
Here is a simple HTML document with a canvas element.
The `<canvas>` element goes in the body of the document.
The `id` attribute is a global HTML attribute.
We did not set a width and height attribute.
:::

# Canvas API

The Canvas _API_ provides a means for drawing graphics using
JavaScript and the `<canvas>` DOM element.

::: notes
The canvas element is arguably the single most powerful HTML5 element,
although its real power lies in the Canvas context,
which you obtain from the canvas element itself.
:::

## Canvas API

We can use the canvas for:

::: incremental

- animation
- game graphics
- data visualization
- image manipulation
- real-time video

:::

## The rendering context {data-auto-animate="true"}

The `<canvas>` element creates a fixed-size drawing surface that exposes a rendering _context_.

::: notes
The notion of a context is quite common in programming. If you take a graphics course, you will likely encounter the openGL context, for example.
:::

## The rendering context {data-auto-animate="true"}

We will use the `2d` rendering context.

## The rendering context {data-auto-animate="true"}

There is also a 3D rendering context: **WebGL**

This has many powerful features, including access to the graphics hardware, and openGL like shaders.

We will not cover the 3D context in this lecture.

::: notes
Other contexts provide different types of rendering;
for example, WebGL uses a 3D context similar to OpenGL.
:::

## The rendering context {data-auto-animate="true"}

```{.js }
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

You create a context with the getContext method on the `<canvas>` DOM element.

## The rendering context {data-auto-animate="true"}

Access the Canvas API via the `ctx` object.

You should inspect the context object in the console.

```{.js }
console.log(ctx);
```

::: notes
I strongly encourage you to do this, you will see all the methods available.
:::

## The rendering context {data-auto-animate="true"}

```{.js }
console.log(ctx);
```

You will see current values for all the attributes, and if you expand the
`CanvasRenderingContext2D` field you will see the many methods available.

## Drawing {data-auto-animate="true"}

::: columns

::::: {.column width=40%}

![](assets/coordinates.png)

:::::

::::: column

The rendering context has a coordinate system
which, by default, places the _origin_ at the
top left corner of the canvas.

Each unit of length is 1 pixel.

:::::

:::

::: notes
NB. This is by default. It is possible to transform the coordinate system.
Width extends in the x, height extends in the y directions.
:::

## Drawing {data-auto-animate="true"}

Canvas supports two primitive shapes: rectangles and paths.

A shape can be _filled_, meaning its area is given a certain color or pattern,
or it can be _stroked_, which means a line is drawn along its edge.

## Drawing {data-auto-animate="true"}

There are three functions that draw rectangles on the canvas:

```{.js }
 fillRect(x, y, width, height)
 strokeRect(x, y, width, height)
 clearRect(x, y, width, height)
```

## Drawing {data-auto-animate="true"}

```{.js }
 fillRect(x, y, width, height)
 strokeRect(x, y, width, height)
 clearRect(x, y, width, height)
```

The parameters are the same for all three functions:

- `x, y` define the top left corner
- then we have width and height

::: notes
(x, y) are the coordinates of the top left corner of the rectangle.
Draws a filled rectangle.
Draws a rectangular outline.
Clears the specified rectangular area, making it fully transparent.
:::

## Drawing {data-auto-animate="true"}

The color of the fill, thickness of the stroke, and so on,
are not determined by an argument to the drawing method,
but by properties of the context object.

::: notes
IMPORTANT
:::

## Drawing {data-auto-animate="true"}

```{.js }
ctx.fillStyle = "red";
```

- `fillStyle` defines the fill appearance.
- Set to a string that specifies a color.
- Uses the same color notation as CSS.

## Drawing {data-auto-animate="true"}

```{.js }
ctx.strokeStyle = "blue";
ctx.lineWidth = 5;
```

- `strokeStyle` specifies the colour of a stroked line.
- Width is set by the `lineWidth` property.
- `lineWidth` may be any positive number.

## Drawing {data-auto-animate="true"}

::: columns
:::: column
![](assets/rectangle.png)
::::
:::: {.column width=55%}

```{.js }
const x = y = 75,
      w = h = 250;
ctx.fillStyle = "red";
ctx.strokeStyle = "blue";
ctx.fillRect(x, y, w, h);
ctx.strokeRect(x, y, w, h);
```

::::
:::

## Drawing {data-auto-animate="true"}

A path is a sequence of points, connected by segments of lines that can
be of different shapes, of different width and of different color.

## Drawing {data-auto-animate="true"}

It is possible to build any complex shape using a
combination of the path tools.

## Drawing {data-auto-animate="true"}

::: incremental

- Paths are not values that can be stored and passed around.
- You must make a sequence of method calls to describe its shape.

:::

## Drawing {data-auto-animate="true"}

::: incremental

- Each segment created with `lineTo` starts at the path’s current position.
- The current position is usually the end of the last segment.
- Or, it is the position passed to `moveTo`.

:::

## Drawing {data-auto-animate="true"}

When filling a path:

- Each shape is filled separately.
- A path can have multiple shapes.
- The path needs to be closed.

## Drawing {data-auto-animate="true"}

If the path is not already closed, a line is added from its end to its start.

The shape enclosed by the now completed path is filled.

## Drawing {data-auto-animate="true"}

::: columns
:::: column
![](assets/triangle.png)
::::
:::: {.column width=55%}

```{.js }
ctx.fillStyle = "red";
ctx.beginPath();
ctx.moveTo(75, 200);
ctx.lineTo(300, 375);
ctx.lineTo(300, 25);
ctx.fill();
```

::::
:::

::: notes
Our triangle example uses the implicit completion of the path.
:::

## Drawing {data-auto-animate="true"}

A path may also contain curved lines.

These are a bit more involved to draw.

## Drawing {data-auto-animate="true"}

We will skip these functions for now.

- `quadraticCurveTo()`
- `bezierCurveTo()`

But it is useful to know that they are available.

## Drawing {data-auto-animate="true"}

To draw circle segments we use the arc functions.

- `arc(x, y, radius, startAngle, endAngle, counterclockwise)`
- `arcTo(x1, y1, x2, y2, radius)`

::: notes
arc() ... Draws an arc which is centred at (x, y) position with radius r starting at
startAngle and ending at endAngle
going in the given direction
indicated by counterclockwise (defaulting to clockwise).

arcTo() ... Draws an arc with the given control points and radius,
connected to the previous point by a straight line.
:::

## Drawing {data-auto-animate="true"}

::: columns
:::: column
![](assets/circle.png)
::::
:::: {.column width=55%}

```{.js }
ctx.fillStyle = "red";
ctx.arc(200, 200, 150, 0,
  Math.PI * 2);
ctx.fill();
```

::::
:::

## Drawing {data-auto-animate="true"}

The canvas rendering context provides two methods to render _text_:

- `fillText(text, x, y [, maxWidth])`
- `strokeText(text, x, y [, maxWidth])`

::: notes
Fills a given text at the given (x,y) position.
Optionally with a maximum width to draw.

Strokes a given text at the given (x,y) position.
Optionally with a maximum width to draw.
:::

## Drawing {data-auto-animate="true"}

::: columns
:::: column
![](assets/text.png)
::::
:::: {.column width=55%}

```{.js }
const text = "Hello World!";
const x = 15, y = 200;
ctx.fillStyle = "red";
ctx.strokeStyle = "blue";
ctx.font = '72px serif';
ctx.fillText(text, x, y);
ctx.strokeText(text, x, y);
```

::::
:::

# Sprites

Bitmap graphics.

## Sprites {data-auto-animate="true"}

Images for computer graphics are usually in one of two categories:

- Vector graphics
- Bitmap graphics

So far we have been working with vector graphics.

## Sprites {data-auto-animate="true"}

Bitmap graphics don’t specify shapes but work with **pixel** data.

Pixel data defines values on a regular 2D grid.

## Sprites {data-auto-animate="true"}

The `drawImage()` method allows us to draw pixel data onto a canvas.

This pixel data can originate from an <img> element or from another canvas.

## Sprites {data-auto-animate="true"}

```{.js }
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = document.createElement("img");
img.src = "img.png";

img.addEventListener("load", () => {
  ctx.drawImage(img, 0, 0);
});
```

::: notes

This example creates a detached <img> element and loads an image file into it. But it cannot immediately start drawing from this picture because the browser may not have loaded it yet. To deal with this, we register a "load" event handler and do the drawing after the image has loaded.

:::

## Sprites {data-auto-animate="true"}

::: columns
:::: column
![](assets/sprites-slide.png){ width=80%}
::::
:::: column
Storing all the image frames in a single file is often preferred for compression efficiency.
::::
:::

# Events

Formally, an event is a message that is sent from the browser to a JavaScript function.

Examples of events are: mouse clicks, key presses, and window resizes.

## Events

Informally, we can describe events in our animation that require some sort of response, such as collision detection in a game.

## Keyboard Events {data-auto-animate="true"}

```{.js data-line-numbers="1-9|1|3-5|7-9"}
const KEYS = {};

document.addEventListener("keydown", (event) => {
    KEYS[event.code] = event.type === "keydown";
});

document.addEventListener("keyup", (event) => {
    KEYS[event.code] = event.type === "keydown";
});
```

::: notes
We store keys pressed in a global constant object.
Then, an event listener is attached to the document,
using an arrow function.
As keys are pressed, the corresponding element in the object is set to true.
:::

# Animation {background-image="assets/horse.gif"}

## Animation {data-auto-animate="true"}

`requestAnimationFrame()`

This method tells the browser that you wish to perform an animation
and requests that the browser calls a callback function to update
an animation before the next repaint.

## Animation {data-auto-animate="true"}

`requestAnimationFrame()`

The callback function is passed a _timestamp_.

The timestamp is the number of milliseconds since the page was loaded.

#

![](assets/invaders.gif){ width=80%}
