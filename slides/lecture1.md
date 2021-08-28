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


## Canvas HTML element {.data-auto-animate}

``` {.html}
<canvas id="mycanvas" width="150" height="150"></canvas>
```

* The `<canvas>` element has two attributes, width and height.
* Both are optional and can be set using DOM properties.
* Default values are 300 pixels wide and 150 pixels high.
* The `id` attribute is a global HTML attribute.


## Canvas HTML element {.data-auto-animate}

* The element can be sized by CSS, but during rendering is scaled to fit its layout size.
* If the CSS sizing doesn't respect the ratio of the initial canvas, it will appear distorted.


## Canvas HTML element {.data-auto-animate}

``` {.html}
<canvas id="mycanvas" width="150" height="150">
  display this text if the browser does not support HTML5 canvas
</canvas>
```

* Fallback content is placed between the open and closing tags.
* The closing tag is *required*, else all subsequent content is ignored.


## HTML

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


## CSS

``` {.css }
#canvas{
    position: absolute;
    background: black;
    top: 0;
    left: 0;
}
```

## JavaScript

``` {.js }
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
```

---

Access the Canvas API via the `ctx` object.

You can see the context object in the console.

``` {.js }
console.log(ctx);
```

#
### Animation

## {.data-auto-animate}
#### `requestAnimationFrame()` 

This method tells the browser that you wish to perform an animation and requests that the browser calls a callback function to update an animation before the next repaint. 


## {.data-auto-animate}
#### `requestAnimationFrame()` 

The callback function is passed a *timestamp*.

The timestamp is the number of milliseconds since the page was loaded.


## H2 header

### H3 header

#### H4 header
