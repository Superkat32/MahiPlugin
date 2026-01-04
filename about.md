# Mahi Plugin
## BlockBench plugin for the Mahi Minecraft Java library.

Export your models, yay!

# Actual info
This is a test plugin for a test format of a test entity model & animation library I'm testing.  

The idea is that it expands Mojang's keyframe animation system instead of adding my own, massively taking advantage of the fact that usage of the library is mostly auto-generated from this plugin. 
My goals are to add custom easing types and molang support, but there's no guarantee that'll fully happen.

For the most part, I'm simply working on this for the fun of it. There's no guarantee that the mod component or this plugin component of this idea are publicly released. 

## Setting up a new plugin
### For future self probably:

- ```cd src```
- ```npm i --save-dev blockbench-types```
- ```npm install webpack-cli --save-dev```
- ```npm install --save-dev typescript ts-loader```