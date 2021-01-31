# Tile Mosaic Generator

This is an app created by Martin Omacht as a project for VIN course at Brno University of Technology in 2021.

The app is hosted on GitHub Pages [here](https://enkeymc.github.io/TileMosaicGenerator/) and should be supported by all modern browsers although it is not optimized form mobile experience.

It is made for generating mosaic patterns from tiles based on given function with parameters. Right now only linear, geometric and fibonacci functions are available, but I plan to add more in the future. I also plan to add more ways to traverse the tile matrix (right now it is always from left to right and top  to bottom).

Tile Mosaic Generator comes with built-in tile editor which allows you to create tiles in SVG format. The generated mosaic is also exported in SVG format to avoid resolution limitation.

The SVG elements in tiles can be colored using customizable color palette which allows you to quickly change color of all tiles using the same color.

Apart from exporting the mosaic in SVG, the app allows you to export and import the project which saves/loads the tile set, generator settings and color palette. The project file also contains version number to allow backwards compatibility. The project is also saved upon page unload to local storage so you don't loose progress when you refresh the page.

This is more of a foundation that can be built upon as I have tried to make it as extensible as possible. There are lots of features currently missing, but I plan on adding them in the future.

## Generator 

The Generator page is used for generating the mosaic from tile set. On the left side is panel with settings. 

- **Export mosaic** button exports the currently generated mosaic to SVG file. 
- **Rows** and **Columns** fields set the dimensions of the generated mosaic.
- **Tile selector** field allows you to select a function which selects a tile based on position, index or internal state. Under this field is a short description of the selected function (usually the formula) and underneath that are properties of the function that you can edit. The result of the function is always rounded and transformed using module operator to not overflow the tile set length.

On the right side is a panel where you can select a background color and reorder tile set.

## Tiles 

On the Tiles page you can manage your tile set. Clicking the empty tile with a plus sign opens tile editor where you can create a new tile. **Reorder** opens page where you can reorder your tile set using drag and drop (this is on a separate page, because I could not find a good grid drag and drop library).

Hovering on a tile shows action bar where you can duplicate, rotate, delete or edit the tile.

## Tile editor

This page opens when you create a new tile or edit an existing one. On the left side of the editor is a panel showing all elements in the tile. You can reorder these tiles using drag & drop to control the rendering order of the elements. Clicking the icon with trashcan deletes the element and by clicking anywhere else on the item selects it.

In the middle is the tile canvas which can be manipulated based on the selected tool from the toolbar above. Selected elements are rendered with blue color. There is also a grid which helps with alignment of the elements. On the right side is a properties editor for the selected element. Each type of element has a different set of properties you can edit.

In the future I am planning on adding support for editing existing elements by dragging and dropping each point defining a shape and also adding more shapes to create (mainly SVG path element). I also want to add Undo/Redo functionality.

## Color palette

Instead of choosing a concrete color for every element of every tile, you choose a color from a color palette. This color palette is customizable. You can add a new color, change or delete an existing one. You cannot delete the default color #000, but you can edit it. **Be careful when deleting a color!** All elements using this color will not be visible, and you have to choose a new color for every single one. 

This color palette system allows you to quickly choose already used color and tweak any color at later time.
