# 3D SUPER shapes

 The genesis of my interest in supershapes is Daniel Shiffman's wonderful Coding Train Challenge on Supershapes.  The supershape is a generalization of the superellipse, and was proposed by Johan Gielis.  The 3D version is an extension using spherical coordinates.  The supershape formula is really complex.  Luckily, you don't have to completely understand the formula to use it to create some really fun shapes, although watching Daniel Shiffman's Coding Challenge video is a great start.

[3d Supershapes challenge] https://thecodingtrain.com/challenges/26-3d-supershapes

[Wikipedia page on supershapes] https://en.wikipedia.org/wiki/Superformula

## Rendering 3D supershapes using the superformula

  These shapes were rendered in p5.js using a port of the code that Daniel Shiffman wrote in Processing in his Supershape Coding Challenge. This method applies a mesh to the vertices calculated from the superformula.  This is illustrated in the top left image, where the stroke is drawn.  In the other images, I have removed the stroke and varied the parameters to the supershape.  I have created a supershape generator with sliders and color options, so you can experiment with the parameters.

<img class="img" src="assets/supershape_stroke.jpg" alt="Supershape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">
<img class="img" src="assets/super7.jpg" alt="Supershape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">
    <img class="img" src="assets/super2.jpg" alt="Supershape" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">
<img class="img" src="assets/super4.jpg" alt="Supershape with stroke" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">

- [Live version] 
- [Supershape P5.js sketch] https://editor.p5js.org/kfahn/full/LvvD5bLu7
- [Link to Code] https://editor.p5js.org/kfahn/sketches/LvvD5bLu7

## Shaders

  You can also render fun SUPER shapes using a shader.  To do this in p5.js, you must load a frag file.  It utilizes the GPU, so the rendering is very fast.  You can make some crazy awesome shapes using a shader, which use ray-marching instead of rendering a mesh on vertices.  If you are not familar with ray-marching, here are some excellent resources.

 Inigo Quilez has done pioneering work on shaders and is the co-creator of shadertoy, which is another place you can write shaders. His website contains a wealth of information on shaders.

  - [Inigo Quilez website] https://iquilezles.org
  - [Inigo Quilez youtube channel] https://www.youtube.com/c/InigoQuilez

 Jamie Wong has a great article on Ray Marching and Signed Distance Functions.
 [- Ray Marching and Signed Distance Functions] http://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/

 Here are some wonderful tutorials by Daniel Shiffman: 
 - [Ray Casting 2d Coding Challenge] https://thecodingtrain.com/challenges/145-ray-casting-2d
 - [Rendering Raycasting Coding challenge] https://thecodingtrain.com/challenges/146-rendering-ray-casting

 Here is an awesome tutorial on ray marching by Martijn Steinrucken:
  - [Ray Marching for Dummies by The Art of Code] https://www.youtube.com/watch?v=PGtv-dBi2wE

 ### Rotation method 

  In his tutorial "How to turn your 2d fractal into 3d!", the very clever and creative Martijn Steinrucken created a 3D Koch shape by rotating the fractal on all three axis and then taking the boolean intersection. You can do something similar with a 2D signed distance functions (SDF), which essentially calculate the distance from the surface of the shape to the center of the screen. The image on the left shows a 3D hexagram, while the image on the right shows a 3D star.  (The 2D SDFs are from Inigo Quilez and are available on his website.)

  [How to turn your 2d fractal into 3d!] https://www.youtube.com/watch?v=__dSLc7-Cpo

<img class="img" src="assets/hexagram.jpg" alt="3D Hexagram" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">
<img class="img" src="assets/3d_star.jpg" alt="3D Star" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">

- [P5sketch -- Shader w/ Rotations] https://editor.p5js.org/kfahn/full/bveKzyp2D
- [Link to code] https://editor.p5js.org/kfahn/sketches/bveKzyp2D

### Mixing two different shapes

  In this method, we start with a 2D shape and mix by a percentage with a 3D shape.  Suppose you have always wondered, what would happen if you mixed a star with a circle?  Now you can find out (image on left).  What about mixing the Koch curve and a box?  Believe it or not, you can do that too (image on right).

<img class="img" src="assets/star_circle.jpg" alt="star_circle" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">
<img class="img" src="assets/koch_box.jpg" alt="Koch curve mixed with box" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">

- [Shader -- Mixing Two Shapes] https://editor.p5js.org/kfahn/full/ox3GdxXTJ
- [Link to code] https://editor.p5js.org/kfahn/sketches/ox3GdxXTJ

### Extrusions

   In this method, akin to using a playdough mold to form a shape, we extrude through a 2D shape to obtain a 3D shape.  The 2D SDF's are again from Inigo Quilez, who has spent a great deal of time optimizing them.  The extrusion function is also from Inigo Quilez.  The 2D SDF's have to be precise, or this method won't work.  Even with Inigo Quilez's SDF's, there is a little bit of aliasing on the extruded star (probably my fault).
   
   <img class="img" src="assets/extruded_hex.jpg" alt="Extruded hexagon" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">
   <img class="img" src="assets/extruded_star.jpg" alt="Extruded star" style=" display: block;
    margin-left: auto;
    margin-right: auto;" width="400" height="400">

- [Shader -- Extrusion] https://editor.p5js.org/kfahn/full/6W1gXtNUi
- [Link to code] https://editor.p5js.org/kfahn/sketches/6W1gXtNUi
